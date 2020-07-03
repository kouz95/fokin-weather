import React from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import Loading from './src/Loading';

interface Props {}

interface State {
  isLoading: boolean;
}

export default class extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount(): void {
    this.getLocation();
  }

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
    } catch (error) {
      Alert.alert("Can't find you.", 'So sad');
    }
  };

  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
}
