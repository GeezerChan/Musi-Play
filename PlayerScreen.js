// // screens/PlayerScreen.js

// import React, { useEffect } from 'react';
// import TrackPlayer from 'react-native-track-player';

// const PlayerScreen = ({ route }) => {
//   const { track } = route.params;
//   const playbackState = usePlaybackState();
//   const [isPlaying, setIsPlaying] = useState(false);


//   useEffect(() => {
//     const startPlayer = async () => {
//       await TrackPlayer.setupPlayer({});
//       await TrackPlayer.add({
//         id: track.id,
//         url: track.preview_url,
//         title: track.name,
//         artist: track.artists[0].name,
//         artwork: track.album.images[0].url,
//       });
//       await TrackPlayer.play();
//     };

//     startPlayer();

//     return () => TrackPlayer.destroy();
//   }, [track]);

//   const togglePlayback = async () => {
//     if (playbackState === TrackPlayer.STATE_PLAYING) {
//       await TrackPlayer.pause();
//     } else {
//       await TrackPlayer.play();
//     }
//   };

//   const renderPlayPauseButton = () => {
//     if (playbackState === TrackPlayer.STATE_PLAYING) {
//       return (
//         <TouchableOpacity onPress={togglePlayback}>
//           <Text>Pause</Text>
//         </TouchableOpacity>
//       );
//     } else if (playbackState === TrackPlayer.STATE_PAUSED) {
//       return (
//         <TouchableOpacity onPress={togglePlayback}>
//           <Text>Play</Text>
//         </TouchableOpacity>
//       );
//     } else {
//       return null;
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Image style={{ width: 200, height: 200 }} source={{ uri: track.album.images[0].url }} />
//       <Text>{track.name}</Text>
//       <Text>{track.artists[0].name}</Text>
//       {renderPlayPauseButton()}
//     </View>
//   );
// };


// export default PlayerScreen;
// screens/PlayerScreen.js

import React from 'react';
import { View, Text, Image } from 'react-native';

const PlayerScreen = ({ route }) => {
  const { track } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image style={{ width: 200, height: 200 }} source={{ uri: track.album.images[0].url }} />
      <Text>{track.name}</Text>
      <Text>{track.artists[0].name}</Text>
      <Text>Album: {track.album.name}</Text>
      <Text>Release Date: {track.album.release_date}</Text>
      <Text>Popularity: {track.popularity}</Text>
      {/* Add more information as needed */}
    </View>
  );
};

export default PlayerScreen;
