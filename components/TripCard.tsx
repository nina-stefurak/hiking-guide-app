import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const CardComponent = () => (
  <Card>
    <Card.Content>
      <Text variant="titleLarge">Tytuł</Text>
      <Text variant="bodyMedium">Opis</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    {/* <Card.Actions>
      <Button>Edit</Button>
      <Button>Delete</Button>
    </Card.Actions> */}
  </Card>
);

export default CardComponent;