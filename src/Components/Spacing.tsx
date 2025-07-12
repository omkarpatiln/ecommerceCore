import React from 'react';
import {View} from 'react-native';

interface SpacingProps {
  height?: number;
  width?: number;
}

const Spacing: React.FC<SpacingProps> = ({height = 0, width = 0}) => {
  return <View style={{height, width}} />;
};

export default Spacing;
