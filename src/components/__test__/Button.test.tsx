import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Button from '../Button';

describe('Button', () => {
  test('renders correctly', () => {
    const {getByLabelText} = render(<Button aria-label="button" />);
    const button = getByLabelText('button');
    expect(button).toBeTruthy();
  });

  test('executes onPress callback when pressed', () => {
    const onPressMock = jest.fn();
    const {getByLabelText} = render(
      <Button aria-label="button" onPress={onPressMock} />,
    );
    const button = getByLabelText('button');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test('applies disabled style when disabled prop is true', () => {
    const {getByLabelText} = render(<Button aria-label="button" disabled />);
    const button = getByLabelText('button');

    expect(button.props.style.backgroundColor).toEqual('#3f3f46');
  });
});
