import React, {useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet, Alert} from 'react-native';
import {RootStackParamList} from '../types';
import Typography from '../components/Typography';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button';
import {StackScreenProps} from '@react-navigation/stack';
import AvatarItem from '../components/AvatarItem';
import {useSelector, useDispatch} from 'react-redux';
import {postContact, putContact} from '../apis/contact';
import {State} from '../redux/configureStore';

type Props = StackScreenProps<RootStackParamList, 'ChooseAvatar'>;

const avatarImages = [
  'https://thypix.com/wp-content/uploads/2021/11/sponge-bob-profile-picture-thypix-52-700x628.jpg',
  'https://thypix.com/wp-content/uploads/2021/11/sponge-bob-profile-picture-thypix-124-680x700.jpg',
  'https://thypix.com/wp-content/uploads/2021/11/sponge-bob-profile-picture-thypix-122-655x700.jpg',
  'https://thypix.com/wp-content/uploads/2021/11/sponge-bob-profile-picture-thypix-106-700x627.jpg',
  'https://thypix.com/wp-content/uploads/2021/11/sponge-bob-profile-picture-thypix-104-615x700.jpg',
  'https://thypix.com/wp-content/uploads/2021/11/sponge-bob-profile-picture-thypix-102-662x700.jpg',
  'https://thypix.com/wp-content/uploads/2021/11/sponge-bob-profile-picture-thypix-98-691x700.jpg',
  'https://thypix.com/wp-content/uploads/2021/11/sponge-bob-profile-picture-thypix-82-700x695.jpg',
];

export default function ChooseAvatar({route: {params}, navigation}: Props) {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [disabled, setDisabled] = useState(true);

  const formReducer = useSelector((state: State) => state.formReducer);
  const dispatch = useDispatch();

  async function onClickCreate() {
    try {
      const response = await postContact({
        firstName: formReducer.firstName,
        lastName: formReducer.lastName,
        age: formReducer.age,
        photo: selectedImage,
      });

      if (response.status === 201) {
        dispatch({
          type: 'RESET',
        });
        navigation.replace('List');
      }
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  }

  async function onClickUpdate() {
    try {
      const response = await putContact(formReducer.id, {
        firstName: formReducer.firstName,
        lastName: formReducer.lastName,
        age: formReducer.age,
        photo: selectedImage,
      });

      if (response.status === 201) {
        dispatch({
          type: 'RESET',
        });
        navigation.replace('List');
      }
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  }

  useEffect(() => {
    if (selectedImage !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [selectedImage]);

  useEffect(() => {
    if (params.isEdit) {
      setSelectedImage(formReducer.photo);
    }
  }, [formReducer, params.isEdit]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Typography>Choose Avatar</Typography>
        {params.isEdit ? (
          <Button
            onPress={onClickUpdate}
            disabled={disabled}
            aria-label="button-update">
            <Typography>Update</Typography>
          </Button>
        ) : (
          <Button
            onPress={onClickCreate}
            disabled={disabled}
            aria-label="button-save">
            <Typography>Save</Typography>
          </Button>
        )}
      </View>
      <ScrollView>
        <View style={styles.wrapper}>
          {avatarImages.map((image, index) => (
            <AvatarItem
              imageURL={image}
              key={index}
              onSelect={() => setSelectedImage(image)}
              isSelected={selectedImage === image ? true : false}
            />
          ))}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    flex: 1,
    gap: 20,
    justifyContent: 'center',
  },
});
