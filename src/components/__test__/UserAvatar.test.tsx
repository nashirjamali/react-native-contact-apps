import React from 'react';
import {render, waitFor, screen} from '@testing-library/react-native';
import UserAvatar from '../UserAvatar';

describe('UserAvatar', () => {
  test('renders image if photo exists', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(
        Promise.resolve({ok: true, status: 200} as Response),
      );

    const photo = 'https://example.com/avatar.jpg';

    render(<UserAvatar photo={photo} firstName="John" lastName="Doe" />);

    await waitFor(() => {
      const image = screen.getByTestId('user-avatar-img');
      expect(image.props.source.uri).toBe(photo);
    });
  });

  test('renders initials if photo is not found', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(
        Promise.resolve({ok: true, status: 404} as Response),
      );

    const {getByTestId} = render(
      <UserAvatar photo="non-existing.jpg" firstName="John" lastName="Doe" />,
    );
    const textContainer = getByTestId('user-avatar-text');
    const initials =
      getByTestId('user-avatar-text').props.children.props.children;
    await waitFor(() => {
      expect(textContainer).toBeTruthy();
      expect(initials).toBe('JD');
    });
  });
});
