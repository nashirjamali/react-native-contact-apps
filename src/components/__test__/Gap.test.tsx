import React from 'react';
import {render} from '@testing-library/react-native';
import Gap from '../Gap';

describe('Gap', () => {
  test('renders correctly with default props', () => {
    const {getByTestId} = render(<Gap />);
    const gapView = getByTestId('gap-view');
    expect(gapView.props.style).toEqual({
      width: 0,
      height: 0,
    });
  });

  test('renders correctly with custom props', () => {
    const {getByTestId} = render(<Gap x={10} y={20} />);
    const gapView = getByTestId('gap-view');
    expect(gapView.props.style).toEqual({
      width: 10,
      height: 20,
    });
  });
});
