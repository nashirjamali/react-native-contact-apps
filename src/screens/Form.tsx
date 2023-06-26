import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../types';
import Typography from '../components/Typography';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button';
import {StackScreenProps} from '@react-navigation/stack';
import Input from '../components/Input';
import Gap from '../components/Gap';
import {State} from '../redux/configureStore';

type Props = StackScreenProps<RootStackParamList, 'Form'>;

export default function Form({route: {params}, navigation}: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();
  const formReducer = useSelector((state: State) => state.formReducer);

  function acceptOneWord(inputText: string, setter: (input: string) => void) {
    const sanitizedText = inputText.trim();
    const words = sanitizedText.split(' ');
    const firstWord = words[0];
    setter(firstWord);
  }

  function onClickNext() {
    dispatch({
      type: 'SET_FORM',
      payload: {
        firstName: firstName,
        lastName: lastName,
        age: Number(age),
      },
    });

    navigation.navigate('ChooseAvatar', {isEdit: params.isEdit});
  }

  useEffect(() => {
    if (firstName !== '' && lastName !== '' && age !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [firstName, lastName, age]);

  useEffect(() => {
    if (params.isEdit) {
      setFirstName(formReducer.firstName);
      setLastName(formReducer.lastName);
      setAge(`${formReducer.age}`);
    }
  }, [formReducer, params.isEdit]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Typography>
          {params.isEdit ? 'Edit Contact' : 'New Contact'}
        </Typography>
        <Button
          onPress={onClickNext}
          disabled={disabled}
          aria-label="button-next">
          <Typography>Next</Typography>
        </Button>
      </View>
      <ScrollView>
        <View style={styles.wrapper}>
          <Input
            placeholder="First Name"
            value={firstName}
            onChangeText={value => acceptOneWord(value, setFirstName)}
          />
          <Gap y={10} />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChangeText={value => acceptOneWord(value, setLastName)}
          />
          <Gap y={10} />
          <Input
            placeholder="Age"
            keyboardType="number-pad"
            value={age}
            onChangeText={setAge}
          />
        </View>
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
});
