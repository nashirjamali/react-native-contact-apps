import React from 'react';
import {Text, StyleSheet, StyleProp, TextStyle} from 'react-native';

type TypographyProps = {
  variant?: 'heading' | 'subHeading' | 'body' | 'caption' | 'button';
  color?: 'light' | 'dark';
  children: React.ReactNode;
  align?: 'left' | 'right' | 'center';
};

const Typography = ({
  variant = 'body',
  color = 'light',
  align = 'left',
  children,
}: TypographyProps) => {
  const getTypographyStyle = (): StyleProp<TextStyle> => {
    let typographyStyle: {
      fontSize?: number;
      fontWeight?: any;
      color?: string;
    } = {};

    switch (variant) {
      case 'heading':
        typographyStyle = styles.heading;
        break;
      case 'subHeading':
        typographyStyle = styles.subHeading;
        break;
      case 'body':
        typographyStyle = styles.body;
        break;
      case 'caption':
        typographyStyle = styles.caption;
        break;
      case 'button':
        typographyStyle = styles.button;
        break;
      default:
        typographyStyle = styles.body;
    }

    switch (color) {
      case 'light':
        typographyStyle.color = '#fafafa';
        break;
      case 'dark':
        typographyStyle.color = '#18181b';
        break;
      default:
        break;
    }

    return [typographyStyle, {textAlign: align}, {padding: 5}];
  };

  return <Text style={getTypographyStyle()}>{children}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 18,
  },
  caption: {
    fontSize: 12,
  },
  button: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Typography;
