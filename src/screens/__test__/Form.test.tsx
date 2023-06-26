import React from 'react';
import {fireEvent, waitFor} from '@testing-library/react-native';
import Form from '../Form';
import {renderWithProviders} from '../../utils/test-utils';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useIsFocused: jest.fn(),
}));

type NavigationProps = StackNavigationProp<RootStackParamList, 'Form'>;

const createTestProps = (props: Partial<NavigationProps>) => ({
  navigation: {
    navigate: jest.fn(),
    ...props,
  } as NavigationProps,
  ...props,
});

describe('Form', () => {
  beforeEach(() => {
    jest.setTimeout(30000);
  });

  test('renders correctly and enables next button when form is complete', async () => {
    const props = createTestProps({});
    const {getByPlaceholderText, getByLabelText} = renderWithProviders(
      <Form
        route={{key: 'Form', name: 'Form', params: {isEdit: false}}}
        {...props}
      />,
    );

    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const ageInput = getByPlaceholderText('Age');
    const nextButton = getByLabelText('button-next');

    fireEvent.changeText(firstNameInput, 'John');
    fireEvent.changeText(lastNameInput, 'Doe');
    fireEvent.changeText(ageInput, '30');

    expect(firstNameInput.props.value).toBe('John');
    expect(lastNameInput.props.value).toBe('Doe');
    expect(ageInput.props.value).toBe('30');
    expect(nextButton.props.accessibilityState.disabled).toBe(false);
  });

  test('navigates to ChooseAvatar screen when Next button is clicked', async () => {
    const props = createTestProps({});
    const {getByPlaceholderText, getByLabelText} = renderWithProviders(
      <Form
        route={{key: 'Form', name: 'Form', params: {isEdit: false}}}
        {...props}
      />,
    );

    await waitFor(() => {
      expect(getByPlaceholderText('First Name')).toBeTruthy();
      expect(getByPlaceholderText('Last Name')).toBeTruthy();
      expect(getByPlaceholderText('Age')).toBeTruthy();
      expect(getByLabelText('button-next')).toBeTruthy();
    });

    fireEvent.changeText(getByPlaceholderText('First Name'), 'John');
    fireEvent.changeText(getByPlaceholderText('Last Name'), 'Doe');
    fireEvent.changeText(getByPlaceholderText('Age'), '30');
    fireEvent.press(getByLabelText('button-next'));

    await waitFor(() => {
      expect(props.navigation.navigate).toHaveBeenCalledWith('ChooseAvatar', {
        isEdit: false,
      });
    });
  });
});
