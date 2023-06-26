import React from 'react';
import {fireEvent, waitFor} from '@testing-library/react-native';
import {Alert} from 'react-native';
import Detail from '../Detail';
import {getContact, deleteContact} from '../../apis/contact';
import {renderWithProviders} from '../../utils/test-utils';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';

const getContactMock = getContact as jest.Mock;
const deleteContactMock = deleteContact as jest.Mock;
const alertMock = Alert.alert as jest.Mock;

jest.mock('../../apis/contact', () => ({
  getContact: jest.fn(),
  deleteContact: jest.fn(),
}));

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useIsFocused: jest.fn(),
}));

type NavigationProps = StackNavigationProp<RootStackParamList, 'Detail'>;

const createTestProps = (props: Partial<NavigationProps>) => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    ...props,
  } as NavigationProps,
  ...props,
});

describe('Detail', () => {
  const mockContact = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    photo: 'https://example.com/avatar.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders contact details and triggers delete confirmation', async () => {
    getContactMock.mockResolvedValueOnce({
      status: 200,
      data: {data: mockContact},
    });

    const props = createTestProps({});
    const {getByText, getByLabelText} = renderWithProviders(
      <Detail
        route={{
          key: 'Detail',
          name: 'Detail',
          params: {id: '1'},
        }}
        {...props}
      />,
    );

    await waitFor(() => {
      expect(getContact).toHaveBeenCalledTimes(1);
    });

    expect(getByText('Detail')).toBeTruthy();
    expect(getByText('First Name')).toBeTruthy();
    expect(getByText('John')).toBeTruthy();
    expect(getByText('Last Name')).toBeTruthy();
    expect(getByText('Doe')).toBeTruthy();
    expect(getByText('Age')).toBeTruthy();
    expect(getByText('30')).toBeTruthy();
    expect(getByLabelText('button-delete')).toBeTruthy();

    fireEvent.press(getByLabelText('button-delete'));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Delete contact',
      'Are you sure delete John Doe?',
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
          onPress: expect.any(Function),
        },
      ],
      {
        cancelable: true,
      },
    );
  });

  test('triggers delete action and navigates back after confirmation', async () => {
    alertMock.mockImplementationOnce((title, message, buttons) => {
      const deleteButton = buttons.find(
        (button: {text: string}) => button.text === 'Sure',
      );
      deleteButton.onPress();
    });

    getContactMock.mockResolvedValueOnce({
      status: 200,
      data: {data: mockContact},
    });
    deleteContactMock.mockResolvedValueOnce({status: 201});

    const props = createTestProps({});
    const {getByLabelText} = renderWithProviders(
      <Detail
        route={{
          key: 'Detail',
          name: 'Detail',
          params: {id: '1'},
        }}
        {...props}
      />,
    );

    await waitFor(() => {
      expect(getContact).toHaveBeenCalledTimes(1);
    });

    fireEvent.press(getByLabelText('button-delete'));

    await waitFor(() => {
      expect(deleteContact).toHaveBeenCalledTimes(1);
      expect(props.navigation.goBack).toHaveBeenCalledTimes(1);
    });
  });
});
