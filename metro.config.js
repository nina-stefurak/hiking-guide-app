const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
module.exports = config;

config.resolver.sourceExts.push("cjs");

module.exports = withNativeWind(config, { input: "./global.css" });
