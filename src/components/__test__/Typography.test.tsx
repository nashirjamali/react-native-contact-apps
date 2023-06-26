import React from 'react';
import {render} from '@testing-library/react-native';
import Typography from '../Typography';

describe('Typography', () => {
  test('renders correctly with default props', () => {
    const {getByText} = render(<Typography>Hello, World!</Typography>);
    const textElement = getByText('Hello, World!');
    expect(textElement).toBeTruthy();
  });

  test('renders correctly with custom props', () => {
    const {getByText} = render(
      <Typography variant="heading" color="dark" align="center">
        Heading Text
      </Typography>,
    );
    const textElement = getByText('Heading Text');
    expect(textElement).toBeTruthy();

    expect(textElement.props.style).toEqual([
      {fontSize: 30, fontWeight: 'bold'},
      {textAlign: 'center'},
      {padding: 5},
    ]);
  });
});
