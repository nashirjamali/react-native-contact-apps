import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import ContactItem from '../ContactItem';

describe('ContactItem', () => {
  const contact = {
    firstName: 'John',
    lastName: 'Doe',
    photo: 'https://example.com/avatar.png',
    age: 2,
    id: '111',
  };

  jest
    .spyOn(global, 'fetch')
    .mockResolvedValue(Promise.resolve({ok: true, status: 404} as Response));

  test('renders correctly with contact data', async () => {
    const {getByText, getByTestId} = render(<ContactItem contact={contact} />);

    await waitFor(() => {
      const avatar = getByTestId('user-avatar-text');
      const name = getByText('John Doe');

      expect(avatar.props.children.props.children).toBe('JD');
      expect(name).toBeTruthy();
    });
  });

  test('calls onPress when pressed', async () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(
      <ContactItem contact={contact} onPress={onPressMock} />,
    );

    await waitFor(() => {
      const touchable = getByTestId('user-avatar-text');
      fireEvent.press(touchable);
    });

    expect(onPressMock).toHaveBeenCalled();
  });
});
