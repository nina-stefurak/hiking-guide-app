module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      //'nativewind/babel', // NativeWind plugin
      'react-native-paper/babel' // React Native Paper plugin
    ]
  };
};
