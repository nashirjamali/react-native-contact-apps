import React, {useEffect, useState} from 'react';
import {Alert, View, StyleSheet, SectionList} from 'react-native';
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
      setContacts(
        data.data.sort((a, b) => a.firstName.localeCompare(b.firstName)),
      );
    } else {
      Alert.alert('Error', 'something went wrong');
    }
  }

  function groupingData() {
    const groupData: {title: string; data: Contact[]}[] = [];

    contacts.forEach(contact => {
      const alphabet = contact.firstName[0].toUpperCase();
      const existingIndex = groupData.findIndex(
        item => item.title === alphabet,
      );

      if (existingIndex >= 0) {
        groupData[existingIndex] = {
          ...groupData[existingIndex],
          data: [...groupData[existingIndex].data, contact],
        };
      } else {
        groupData.push({
          title: alphabet,
          data: [contact],
        });
      }
    });

    return groupData;
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
      <SectionList
        style={styles.list}
        sections={groupingData()}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ContactItem
            contact={item}
            key={item.id}
            onPress={() =>
              navigation.navigate('Detail', {
                id: item.id,
              })
            }
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.sectionHeader}>
            <Typography variant="subHeading"> {title}</Typography>
          </View>
        )}
      />
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
  sectionHeader: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});
