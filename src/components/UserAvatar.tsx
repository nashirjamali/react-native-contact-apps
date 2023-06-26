import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Typography from './Typography';

type UserAvatarProps = {
  photo: string;
  firstName: string;
  lastName: string;
  size?: number;
};

export default function UserAvatar({
  photo,
  firstName,
  lastName,
  size,
}: UserAvatarProps) {
  const [notFound, setNotFound] = useState(true);
  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();

  useEffect(() => {
    async function fetchImageURL() {
      const response = await fetch(photo);
      if (response.status === 200) {
        setNotFound(false);
      }
    }

    fetchImageURL();
  }, [photo]);

  return (
    <View>
      {notFound ? (
        <View
          testID="user-avatar-text"
          style={[styles(size).container, styles(size).gradient]}>
          <Typography variant="subHeading">{initials}</Typography>
        </View>
      ) : (
        <Image
          testID="user-avatar-img"
          source={{uri: photo}}
          style={styles(size).container}
        />
      )}
    </View>
  );
}

const styles = (size: number | undefined) => {
  return StyleSheet.create({
    container: {
      height: size || 50,
      width: size || 50,
      borderRadius: 9999,
    },
    gradient: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#737373',
    },
  });
};
