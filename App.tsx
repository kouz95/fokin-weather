import React from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import axios from 'axios';
import Loading from './src/Loading';
import Weather from './src/Weather';

interface Props {}

interface State {
  isLoading: boolean;
  temp: number;
}

const API_KEY = '4c4fd33dc52199132ebbcbb788b5711e';

export default class extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      temp: 0,
    };
  }

  componentDidMount(): void {
    this.getLocation();
  }

  getWeather = async (latitude: number, longitude: number) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
    this.setState({ isLoading: false, temp: data.main.temp });
  };

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you.", 'So sad');
    }
  };

  render() {
    const { isLoading, temp } = this.state;
    const roundedTemp = Math.round(temp);
    return isLoading ? <Loading /> : <Weather temp={roundedTemp} />;
  }
}
