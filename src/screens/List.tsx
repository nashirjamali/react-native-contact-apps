import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, View, StyleSheet} from 'react-native';
import {Contact, RootStackParamList} from '../types';
import {getContacts} from '../apis/contact';
import Typography from '../components/Typography';
import ContactItem from '../components/ContactItem';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Plus} from 'lucide-react-native';
import Button from '../components/Button';
import {StackScreenProps} from '@react-navigation/stack';
import {useIsFocused} from '@react-navigation/native';

type Props = StackScreenProps<RootStackParamList, 'List'>;

export default function List({navigation}: Props) {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const isFocused = useIsFocused();

  async function getContactData() {
    const {data, status} = await getContacts();

    if (status === 200) {
      setContacts(data.data);
    } else {
      Alert.alert('Error', 'something went wrong');
    }
  }

  useEffect(() => {
    getContactData();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Typography>Contact</Typography>
        <Button onPress={() => navigation.navigate('Form', {isEdit: false})}>
          <Plus color="#fafafa" size={20} />
        </Button>
      </View>
      <ScrollView style={styles.list}>
        {contacts.map(contact => {
          return (
            <ContactItem
              contact={contact}
              key={contact.id}
              onPress={() =>
                navigation.navigate('Detail', {
                  id: contact.id,
                })
              }
            />
          );
        })}
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
  list: {
    paddingTop: 20,
    flex: 1,
  },
});
