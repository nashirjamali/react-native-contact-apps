import React from 'react';
import {fireEvent, waitFor, act} from '@testing-library/react-native';
import ChooseAvatar from '../ChooseAvatar';
import {postContact, putContact} from '../../apis/contact';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';
import {renderWithProviders} from '../../utils/test-utils';

jest.mock('../../apis/contact', () => ({
  postContact: jest.fn(() =>
    Promise.resolve({
      status: 201,
    }),
  ),
  putContact: jest.fn(() =>
    Promise.resolve({
      status: 201,
    }),
  ),
}));

type NavigationProps = StackNavigationProp<RootStackParamList, 'ChooseAvatar'>;

const createTestProps = (props: Partial<NavigationProps>) => ({
  navigation: {
    navigate: jest.fn(),
    replace: jest.fn(),
    ...props,
  } as NavigationProps,
  ...props,
});

describe('ChooseAvatar', () => {
  beforeEach(() => {
    jest.setTimeout(30000);
  });

  test('navigates to List screen after successful contact creation', async () => {
    const props = createTestProps({});

    const {getByLabelText, getAllByTestId} = renderWithProviders(
      <ChooseAvatar
        route={{
          key: 'ChooseAvatar',
          name: 'ChooseAvatar',
          params: {isEdit: false},
        }}
        {...props}
      />,
    );

    expect(getAllByTestId('avatar-image')[0]).toBeTruthy();
    expect(getByLabelText('button-save')).toBeTruthy();
    fireEvent.press(getAllByTestId('avatar-image')[0]);

    await waitFor(() => {
      expect(
        getByLabelText('button-save').props.accessibilityState.disabled,
      ).toBe(false);
    });

    await act(async () => {
      fireEvent.press(getByLabelText('button-save'));

      await waitFor(() => {
        expect(postContact).toHaveBeenCalledTimes(1);
        expect(props.navigation.replace).toHaveBeenCalledWith('List');
      });
    });
  });

  test('navigates to List screen after successful contact update', async () => {
    const props = createTestProps({});

    const {getByLabelText, getAllByTestId} = renderWithProviders(
      <ChooseAvatar
        route={{
          key: 'ChooseAvatar',
          name: 'ChooseAvatar',
          params: {isEdit: true},
        }}
        {...props}
      />,
    );

    expect(getAllByTestId('avatar-image')[0]).toBeTruthy();
    expect(getByLabelText('button-update')).toBeTruthy();

    await act(async () => {
      fireEvent.press(getAllByTestId('avatar-image')[0]);

      await waitFor(() => {
        expect(
          getByLabelText('button-update').props.accessibilityState.disabled,
        ).toBe(false);
      });

      await act(async () => {
        fireEvent.press(getByLabelText('button-update'));

        await waitFor(() => {
          expect(putContact).toHaveBeenCalledTimes(1);
          expect(props.navigation.replace).toHaveBeenCalledWith('List');
        });
      });
    });
  });
});
