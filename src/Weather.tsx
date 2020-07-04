import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

interface Props {
  temp: number;
  condition: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Weather({ temp, condition }: Props) {
  return (
    <View style={styles.container}>
      <Text>{temp}</Text>
      <Text>{condition}</Text>
    </View>
  );
}

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf([
    'ThunderStorm',
    'Drizzle',
    'Rain',
    'Snow',
    'Atmosphere',
    'Clear',
    'Clouds',
    'Haze',
    'Mist',
    'Dust',
  ]).isRequired,
};
