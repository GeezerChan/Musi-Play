/*
README

npm install --save react-native-sound
//npm install --save react-native-blob-util

Make sure your assets directory has a "/audio" and that react-native.config.js has it too.

Note that files in this dir must be lower-case, 0-9, "_" ONLY

*/

import React from 'react';
import {Text, Button, SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Sound from 'react-native-sound';

//import ReactNativeBlobUtil from 'react-native-blob-util'
// const {fs} = ReactNativeBlobUtil;

// filePathIos = `${fs.dirs.MainBundleDir}/assets/audio/Advice.wav`;
// filePathAndroid = fs.asset('audio/Advice.wav');

// Enable playback in silence mode
Sound.setCategory('Playback');

const someAudio1 = require('./assets/maplestory_level_up.mp3')
// const someAudio2 = require('./assets/audio/advice.wav')
// const someAudio3 = require('./assets/audio/allowme.wav')
// const someAudio4 = require('./assets/audio/broc.wav')
// const someAudio5 = require('./assets/audio/brunnengveryshort.wav')
// const someAudio7 = require('./assets/audio/couldwrk.wav')
// const someAudio8 = require('./assets/audio/dontwhizon.wav')

const sound1 = new Sound(someAudio1, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});
// loaded successfully
if (sound1) {
  console.log(
    'sound1 duration in seconds: ' +
      sound1.getDuration() +
      'number of channels: ' +
      sound1.getNumberOfChannels(),
  );
} else {
  console.log('sound1 is null');
}
// const sound2 = new Sound(someAudio2);
// const sound3 = new Sound(someAudio3);
// const sound4 = new Sound(someAudio4);
// const sound5 = new Sound(someAudio5);
// const sound7 = new Sound(someAudio7);
// const sound8 = new Sound(someAudio8);

const App = () => {
  const play1 = () => {
    console.log('playing sound 1');
    sound1.play();
    console.log('played sound 1');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>Hello World</Text>
        <Button title="Sound 1" onPress={play1} />
        {/* <Button title="Sound 2" onPress={() => sound2.play()} />
        <Button title="Sound 3" onPress={() => sound3.play()} />
        <Button title="Sound 4" onPress={() => sound4.play()} />
        <Button title="Sound 5" onPress={() => sound5.play()} />
        <Button title="Sound 7" onPress={() => sound7.play()} />
        <Button title="Sound 8" onPress={() => sound8.play()} /> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
