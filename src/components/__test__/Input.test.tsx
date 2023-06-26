import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Input from '../Input';

describe('Input', () => {
  test('renders correctly', () => {
    const {getByPlaceholderText} = render(
      <Input placeholder="Enter your name" />,
    );
    const input = getByPlaceholderText('Enter your name');
    expect(input).toBeTruthy();
  });

  test('calls onChangeText when input text changes', () => {
    const onChangeTextMock = jest.fn();
    const {getByPlaceholderText} = render(
      <Input placeholder="Enter your name" onChangeText={onChangeTextMock} />,
    );
    const input = getByPlaceholderText('Enter your name');
    fireEvent.changeText(input, 'John Doe');
    expect(onChangeTextMock).toHaveBeenCalledWith('John Doe');
  });
});
