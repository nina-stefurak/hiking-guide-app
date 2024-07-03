import * as React from 'react';
import { Avatar } from 'react-native-paper';

const UserPhoto = () => (
  <Avatar.Image 
  size={90} 
  source={require('../assets/avatar.png')} 
  style={{ backgroundColor: '#transparent' }}
  />
);
export default UserPhoto