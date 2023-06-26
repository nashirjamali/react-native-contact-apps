import React from 'react';
import {View} from 'react-native';

type GapProps = {
  x?: number;
  y?: number;
};

export default function Gap({x = 0, y = 0}: GapProps) {
  return <View style={{width: x, height: y}} testID="gap-view" />;
}
