import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AvatarItem from '../AvatarItem';

describe('AvatarItem', () => {
  const imageURL = 'https://example.com/avatar.jpg';
  const onSelectMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    const {getByTestId} = render(
      <AvatarItem imageURL={imageURL} onSelect={onSelectMock} />,
    );
    const avatarImage = getByTestId('avatar-image');
    expect(avatarImage.props.source.uri).toBe(imageURL);
  });

  test('calls onSelect when pressed', () => {
    const {getByTestId} = render(
      <AvatarItem imageURL={imageURL} onSelect={onSelectMock} />,
    );
    const avatarContainer = getByTestId('avatar-image');
    fireEvent.press(avatarContainer);
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });

  test('renders with selected style when isSelected is true', () => {
    const {getByTestId} = render(
      <AvatarItem imageURL={imageURL} onSelect={onSelectMock} isSelected />,
    );
    const avatarImage = getByTestId('avatar-image');
    expect(avatarImage.props.style).toEqual({
      borderColor: '#1d4ed8',
      borderWidth: 10,
    });
  });
});
