#!/env/python
import re
import json
import os
import subprocess

# This script is intended to be run from the root of a React Native project directory.

### vvvv BEGIN CUSTOMIZE vvvv ###

# Specify the path to your JDK
java_home_path = 'C:\\Program Files\\Java\\jdk-20'

# Specify the path to bundletool.jar
bt = 'C:\\Users\\Andy\\AppData\\Local\\Android\\Sdk\\bundle-tools\\bundletool-all-1.15.4.jar'

keystore_file = "my-release-key"
store_password = "12345678"
key_alias = "my-key-alias"
key_password = "12345678"

distinguished_name = "CN=MyName, OU=MyOrgUnit, O=MyOrg, L=MyCity, ST=MyStateOrProvince, C=MyCountry"

### ^^^^ END CUSTOMIZE ^^^^ ###


### vvv NOT INTENDED TO BE CUSTOMIZED (but fix it if needed) vvv ###

new_distribution_url = 'https\\://services.gradle.org/distributions/gradle-8.1-bin.zip'

expected_java_version = "20.0.2"

jdk_path = "https://www.dropbox.com/scl/fi/hfwwy11wpskpzekh71ztg/jdk-20_windows-x64_bin.exe?rlkey=wkx4wfurf8l2valcqaawztvun"

signing_config_text = '''
    release {{
        storeFile file('{keystore_file}')
        storePassword '{store_password}'
        keyAlias '{key_alias}'
        keyPassword '{key_password}'
    }}
'''.format( 
    keystore_file=keystore_file, 
    store_password=store_password, 
    key_alias=key_alias, 
    key_password=key_password 
  )


app_tsx_path = 'App.tsx'  # Expected for new projects
app_js_path = 'App.js' # we create this if we remove App.tsx
package_json_path = 'package.json'
universal_json_path = 'android\\universal.json' # created to specify which apk to extract from apks file
gradle_properties_path = 'android\\gradle.properties'
build_gradle_path = 'android\\app\\build.gradle'
gradle_wrapper_properties_path = 'android\\gradle\\wrapper\\gradle-wrapper.properties'


dependencies_to_add = {
  "@react-native-masked-view/masked-view": "^0.2.9",
  "@react-navigation/drawer": "^6.6.3",
  "@react-navigation/native": "^6.1.7",
  "@react-navigation/native-stack": "^6.9.13",
  "@react-navigation/stack": "^6.3.17",
  "react": "18.2.0",
  "react-native": "0.72.4",
  "react-native-gesture-handler": "^2.12.1",
  "react-native-reanimated": "^3.5.0",
  "react-native-safe-area-context": "^4.7.2",
  "react-native-screens": "^3.25.0"
}

# Define the contents for universal.json
universal_json_contents = {
    "supportedAbis": ["armeabi-v7a", "arm64-v8a", "x86", "x86_64"],
    "supportedLocales": ["en", "fr", "de", "es", "it", "ja", "ko", "pt", "ru", "zh-rCN", "zh-rTW"],
    "screenDensity": 160,
    "sdkVersion": 21
}

release_section_text = """
    release {{
        signingConfig signingConfigs.release
        minifyEnabled enableProguardInReleaseBuilds
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }}
"""

# This is the Hello-Worldiest of Hello-World apps.
app_js_content = """
import React from 'react';
import {
  Text,
  View,
} from 'react-native';

const App = () => {
  return (
    <View ><Text>Hello World</Text></View>
  );
}

export default App;
"""

keystore_path = 'android/app/{keystore_file}.jks'.format(
  keystore_file=keystore_file
)

# Note - this is split into lines so we can split into command-line arguments later. One arg per line!
keystore_create_cmd = 'keytool \
  -genkeypair \
  -v \
  -storetype \
  PKCS12 \
  -keystore \
  {keystore_path} \
  -keyalg \
  RSA \
  -keysize \
  2048 \
  -validity \
  10000 \
  -alias \
  {key_alias} \
  -dname \
  {distinguished_name} \
  -storepass \
  {store_password} \
  -keypass \
  {key_password}'.format(
    keystore_path=keystore_path, 
    store_password=store_password,
    key_alias=key_alias, 
    key_password=key_password,
    distinguished_name=distinguished_name
)

build_apks_cmd = re.sub(r' +',' ',
  'java -jar "{bt}" \
    build-apks \
    --bundle=app\\build\\outputs\\bundle\\release\\app-release.aab \
    --output=app\\build\\outputs\\apk\\release\\app-release.apks \
    --mode=universal \
    --ks=..\\{keystore_path} \
    --ks-pass=pass:{store_password} \
    --ks-key-alias={key_alias} \
    --key-pass=pass:{key_password}'.format(
    bt=bt, 
    keystore_path=keystore_path, 
    store_password=store_password,
    key_alias=key_alias,
    key_password=key_password))

extract_apk_cmd = re.sub(r' +',' ',
  'java -jar "{bt}" \
  extract-apks \
    --apks=app\\build\\outputs\\apk\\release\\app-release.apks \
    --output-dir=app\\build\\outputs\\apk\\release\\ \
    --device-spec=..\\{universal_json_path}'.format(
    bt=bt, 
    universal_json_path=universal_json_path
 ))

post_config_steps = '''
1. npm install
2a. git init
2b. git add .
2c. git commit -m"initial version"

Once this is done, you can either/both:

[to run on simulator or connected device]

$ npx react-native run-android

[to build an APK]

$ cd android && .\\gradlew build && .\\gradlew bundleRelease
$ {build_apks_cmd}

$ {extract_apk_cmd}'''.format(
    extract_apk_cmd=extract_apk_cmd,
    build_apks_cmd=build_apks_cmd
 )

clean_repo_cmd = 'rnc clean --include "android,metro,npm,watchman,yarn"'

### ^^^ NOT INTENDED TO BE CUSTOMIZED ^^^ ###



def add_signing_config_to_build_gradle(file_path):
    try:
        with open(file_path, 'r') as build_gradle_file:
            build_gradle_content = build_gradle_file.read()

            # Check if the signingConfigs section already exists
            if 'signingConfigs {' in build_gradle_content:
                # If it exists, append the signing_config_text to it
                modified_content = re.sub(r'(signingConfigs \{[^\}]*\})', r'\1' + signing_config_text, build_gradle_content, flags=re.DOTALL)
            else:
                # If it doesn't exist, add the entire signingConfig section
                modified_content = re.sub(r'(buildTypes \{[^\}]*\})', r'signingConfigs {\n' + signing_config_text + r'\1', build_gradle_content, flags=re.DOTALL)

        # Write the modified content back to the file
        with open(file_path, 'w') as build_gradle_file:
            build_gradle_file.write(modified_content)

        print("INFO: Build.gradle file updated successfully.")
    except Exception as e:
        print(f"ERROR: {e}")





def add_keys_to_gradle_properties(properties_file_path):
    properties_to_add = [
        "MYAPP_RELEASE_STORE_FILE=my-release-key.jks",
        "MYAPP_RELEASE_KEY_ALIAS=my-key-alias",
        "MYAPP_RELEASE_STORE_PASSWORD=12345678",
        "MYAPP_RELEASE_KEY_PASSWORD=12345678"
    ]

    try:
        with open(properties_file_path, 'r') as properties_file:
            properties_content = properties_file.read()

            # Check if each property already exists in the file
            for prop in properties_to_add:
                if prop not in properties_content:
                    properties_content += f"{prop}\n"

        # Write the modified content back to the file
        with open(properties_file_path, 'w') as properties_file:
            properties_file.write(properties_content)

        print("INFO: gradle.properties file updated successfully.")
    except Exception as e:
        print(f"ERROR: {e}")





def update_build_gradle_release_section(gradle_properties_path):
    try:
        with open(gradle_properties_path, 'r') as gradle_properties_file:
            gradle_properties_content = gradle_properties_file.read()

            # Update the release section text
            gradle_properties_content = re.sub(
                r'(\s*release\s*\{[^\}]*\})',
                release_section_text,
                gradle_properties_content,
                flags=re.DOTALL
            )

        # Write the modified content back to the file
        with open(gradle_properties_path, 'w') as gradle_properties_file:
            gradle_properties_file.write(gradle_properties_content)

        print("INFO: gradle.properties file updated successfully.")
    except Exception as e:
        print(f"ERROR: {e}")





def change_gradle_wrapper_distribution_url(prop_path, new_distribution_url):
    try:
        with open(prop_path, 'r') as wrapper_properties_file:
            wrapper_properties_content = wrapper_properties_file.readlines()

        for i, line in enumerate(wrapper_properties_content):
            if line.startswith("distributionUrl="):
                wrapper_properties_content[i] = f"distributionUrl={new_distribution_url}\n"
                break

        with open(prop_path, 'w') as wrapper_properties_file:
            wrapper_properties_file.writelines(wrapper_properties_content)

        print("INFO: Gradle wrapper distributionUrl updated successfully.")
    except Exception as e:
        print(f"ERROR: {e}")





def add_gradle_java_home(gradle_properties_path, actual_java_home_path):
    try:
        with open(gradle_properties_path, 'r') as gradle_properties_file:
            gradle_properties_content = gradle_properties_file.readlines()

        java_home_line = f"org.gradle.java.home={actual_java_home_path}\n"
        java_home_exists = False

        for i, line in enumerate(gradle_properties_content):
            if line.startswith("org.gradle.java.home="):
                gradle_properties_content[i] = java_home_line
                java_home_exists = True
                break

        if not java_home_exists:
            gradle_properties_content.append(java_home_line)

        with open(gradle_properties_path, 'w') as gradle_properties_file:
            gradle_properties_file.writelines(gradle_properties_content)

        print("INFO: org.gradle.java.home added or updated in gradle.properties.")
    except Exception as e:
        print(f"ERROR: {e}")




def create_universal_json(universal_json_path, contents):
    try:
        if not os.path.exists(universal_json_path):
            with open(universal_json_path, 'w') as universal_json_file:
                json.dump(contents, universal_json_file, indent=4)

            print(f"INFO: {universal_json_path} file created with contents.")
        else:
            print(f"WARN: {universal_json_path} file already exists.")
    except Exception as e:
        print(f"ERROR: {e}")





def correct_version_of_java_installed(version_desired):
    try:
        # Run the "java -version" command and capture the output
        java_version_output = subprocess.check_output(["java", "-version"], stderr=subprocess.STDOUT, text=True)

        # Check if the output contains "java version" followed by "20" (exact match)
        match = re.search(r'"([\d.]+)"',java_version_output)
        if not match:
            return False
        installed_version = match.group()
        print("INFO: Detected version ",installed_version," of Java.")
        if version_desired in installed_version:
            return True
        else:
            return False
    except subprocess.CalledProcessError:
        # The "java" command returned a non-zero exit status, indicating Java is not installed or not recognized.
        return False


def remove_tsx_and_create_app_js():
    try:
        if os.path.exists(app_tsx_path):
            # Remove the existing App.tsx file if it exists
            os.remove(app_tsx_path)

            # Create a new App.js file with the specified contents
            with open(app_js_path, 'w') as app_js_file:
                app_js_file.write(app_js_content)

            print(f"INFO: {app_tsx_path} removed and {app_js_path} created.")
        else:
            print(f"WARN: {app_tsx_path} does not exist.")
            print(f"INFO: {app_js_path} not modified.")
    except Exception as e:
        print(f"ERROR: {e}")


def adjust_package_json(json_path):
    try:
        with open(json_path, 'r') as package_json_file:
            package_json_data = json.load(package_json_file)

            # Create a new dictionary for dependencies
            updated_dependencies = {}

            # Add the specified keys in the desired order
            for key in dependencies_to_add:
                if key in package_json_data.get("dependencies", {}):
                    updated_dependencies[key] = package_json_data["dependencies"][key]
                else:
                    updated_dependencies[key] = dependencies_to_add[key]

            # Merge the new dependencies with existing ones
            package_json_data["dependencies"] = updated_dependencies

        # Write the modified content back to the file
        with open(json_path, 'w') as package_json_file:
            json.dump(package_json_data, package_json_file, indent=2, sort_keys=True)

        print("INFO: package.json file adjusted successfully.")
    except Exception as e:
        print(f"WARN: {e}")

def generate_keystore():
    if os.path.exists(keystore_path):
      print("WARN: Keystore already exists. (Overwriting it)")
      os.remove(keystore_path)

    try:
      as_args = re.split(r'  +',keystore_create_cmd)
      subprocess.check_output(as_args, stderr=subprocess.STDOUT, text=True)
      print("INFO: Keystore generated successfully.")

      return True
    except subprocess.CalledProcessError:
      print("ERROR: Keystore generated failed.")
      return False




if not os.path.exists(package_json_path):
    print('FATAL: package.json does not exist. Run this from an initialized project directory.')
    print('FATAL: Exiting...')
    exit()

if not os.path.isdir(java_home_path):
    print('FATAL: Java home path does not exist. Please specify the correct path to your JDK.')
    print('FATAL: Exiting...')
    exit()


if not os.path.exists(bt):
    print('FATAL: bundletool.jar does not exist. Please specify the correct path to it.')
    print('FATAL: Exiting...')
    exit()

# Call the function to check if Java 20 is installed
if correct_version_of_java_installed(expected_java_version):
    print("INFO: Correct version of java installed.")
else:
    print('ERROR: Go download and install JDK {jv}, and make sure it is in your path.'.format(jv=expected_java_version))

    print('INFO: Download link: {jdk_path}'.format(jdk_path=jdk_path))

adjust_package_json(package_json_path)

remove_tsx_and_create_app_js()

add_gradle_java_home(gradle_properties_path, java_home_path)

add_keys_to_gradle_properties(gradle_properties_path)

create_universal_json(universal_json_path, universal_json_contents)

change_gradle_wrapper_distribution_url(gradle_wrapper_properties_path, new_distribution_url)

add_signing_config_to_build_gradle(build_gradle_path)

update_build_gradle_release_section(gradle_properties_path)

generate_keystore()

print("\nINFO: Be sure to:",post_config_steps)