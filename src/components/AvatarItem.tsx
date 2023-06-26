import React from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';

type AvatarProps = {
  imageURL: string;
  onSelect?: () => void;
  isSelected?: boolean;
};

export default function AvatarItem({
  imageURL,
  onSelect,
  isSelected = false,
}: AvatarProps) {
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={onSelect}
      testID="avatar-image">
      <Image
        source={{uri: imageURL}}
        height={150}
        width={150}
        style={isSelected ? styles.selectedImage : {}}
      />
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 150,
    maxWidth: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedImage: {
    borderColor: '#1d4ed8',
    borderWidth: 10,
  },
});
