import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Contact} from '../types';
import Typography from './Typography';
import UserAvatar from './UserAvatar';

type ContactItemProps = {
  contact: Contact;
  onPress?: () => void;
};

export default function ContactItem({contact, onPress}: ContactItemProps) {
  const {firstName, lastName, photo} = contact;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      testID="contact-item">
      <View style={styles.wrapper}>
        <UserAvatar firstName={firstName} lastName={lastName} photo={photo} />
        <View style={styles.textWrapper}>
          <Typography>
            {firstName} {lastName}
          </Typography>
        </View>
      </View>
      <View style={styles.divider} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 9999,
  },
  divider: {
    height: 2,
    backgroundColor: '#71717a',
    opacity: 0.1,
    marginVertical: 16,
  },
});
