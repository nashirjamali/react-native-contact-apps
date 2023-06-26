import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet, Alert} from 'react-native';
import {Contact, RootStackParamList} from '../types';
import Typography from '../components/Typography';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button';
import {StackScreenProps} from '@react-navigation/stack';
import Gap from '../components/Gap';
import {deleteContact, getContact} from '../apis/contact';
import UserAvatar from '../components/UserAvatar';
import {useDispatch} from 'react-redux';
import {EditIcon, Trash2} from 'lucide-react-native';
import {useIsFocused} from '@react-navigation/native';

type Props = StackScreenProps<RootStackParamList, 'Detail'>;

export default function Detail({navigation, route: {params}}: Props) {
  const [contact, setContact] = useState<Contact>();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  async function getData(id: string) {
    try {
      const response = await getContact(id);

      if (response.status === 200) {
        setContact(response.data.data);
      }
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  }

  async function deleteData(id: string) {
    try {
      await deleteContact(id);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  }

  useEffect(() => {
    getData(params.id);
  }, [params.id, isFocused]);

  function onClickEdit() {
    dispatch({
      type: 'SET_FORM',
      payload: {
        firstName: contact?.firstName,
        lastName: contact?.lastName,
        age: contact?.age,
        photo: contact?.photo,
        id: contact?.id,
      },
    });

    navigation.navigate('Form', {isEdit: true});
  }

  function onClickDelete() {
    Alert.alert(
      'Delete contact',
      `Are you sure delete ${contact?.firstName} ${contact?.lastName}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          isPreferred: true,
        },
        {
          text: 'Sure',
          style: 'default',
          isPreferred: false,
          onPress: async () => {
            await deleteData(params.id);
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Typography>Detail</Typography>
        <Button onPress={onClickEdit}>
          <EditIcon color="white" />
        </Button>
      </View>
      <ScrollView>
        {contact && (
          <View style={styles.wrapper}>
            <View style={styles.imageWrapper}>
              <UserAvatar
                firstName={contact.firstName}
                lastName={contact.lastName}
                photo={contact.photo}
                size={150}
              />
            </View>
            <Gap y={20} />
            <Typography variant="button">First Name</Typography>
            <Typography variant="subHeading">{contact.firstName}</Typography>
            <Gap y={20} />
            <Typography variant="button">Last Name</Typography>
            <Typography variant="subHeading">{contact.lastName}</Typography>
            <Gap y={20} />
            <Typography variant="button">Age</Typography>
            <Typography variant="subHeading">{contact.age}</Typography>
            <Gap y={60} />
            <Button
              onPress={onClickDelete}
              style={styles.buttonContainer}
              aria-label="button-delete">
              <View style={styles.buttonWrapper}>
                <Trash2 color="white" />
                <Typography variant="button">Delete</Typography>
              </View>
            </Button>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181b',
  },
  header: {
    backgroundColor: '#09090b',
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper: {
    padding: 20,
    flex: 1,
  },
  imageWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#f43f5e',
  },
  buttonWrapper: {
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
