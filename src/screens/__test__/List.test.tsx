import React from 'react';
import {waitFor} from '@testing-library/react-native';
import List from '../List';
import {getContacts} from '../../apis/contact';
import {AxiosResponse} from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';
import {renderWithProviders} from '../../utils/test-utils';
import {Alert} from 'react-native';

jest.mock('../../apis/contact', () => ({
  getContacts: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useIsFocused: jest.fn(),
}));

type NavigationProps = StackNavigationProp<RootStackParamList, 'List'>;

const createTestProps = (props: Partial<NavigationProps>) => ({
  navigation: {
    navigate: jest.fn(),
    ...props,
  } as NavigationProps,
  ...props,
});

describe('List', () => {
  afterEach(() => {
    const mockedGetContacts = getContacts as jest.MockedFunction<
      typeof getContacts
    >;

    mockedGetContacts.mockClear();
  });
  test('renders correctly and fetches contacts', async () => {
    const mockContacts = [
      {
        id: '111',
        firstName: 'John',
        lastName: 'Doe',
        age: 20,
        photo: 'https://picsum.photos/200',
      },
      {
        id: '222',
        firstName: 'Jane',
        lastName: 'Smith',
        age: 20,
        photo: 'https://picsum.photos/200',
      },
    ];
    const mockedGetContacts = getContacts as jest.MockedFunction<
      typeof getContacts
    >;
    mockedGetContacts.mockResolvedValueOnce({
      data: {data: mockContacts},
      status: 200,
    } as AxiosResponse);

    const props = createTestProps({});
    const {getByText} = renderWithProviders(
      <List route={{key: 'List', name: 'List'}} {...props} />,
    );

    await waitFor(() => {
      expect(getByText('Contact')).toBeTruthy();
      expect(getByText('John Doe')).toBeTruthy();
      expect(getByText('Jane Smith')).toBeTruthy();
    });

    expect(mockedGetContacts).toHaveBeenCalledTimes(1);
  });

  test('displays error message when fetching contacts fails', async () => {
    const mockedGetContacts = getContacts as jest.MockedFunction<
      typeof getContacts
    >;
    mockedGetContacts.mockResolvedValueOnce({
      data: {data: null},
      status: 500,
    } as AxiosResponse);

    jest.spyOn(Alert, 'alert');

    const props = createTestProps({});
    renderWithProviders(
      <List route={{key: 'List', name: 'List'}} {...props} />,
    );

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'something went wrong');
    });

    expect(mockedGetContacts).toHaveBeenCalledTimes(1);
  });
});
