import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import axios from 'axios';
import Loading from './src/Loading';
import Weather from './src/Weather';


/*
 *
 * @author : @kouz95
 */


const API_KEY = '4c4fd33dc52199132ebbcbb788b5711e';

export type WeatherOption =
  | 'Thunderstorm'
  | 'Drizzle'
  | 'Rain'
  | 'Snow'
  | 'Atmosphere'
  | 'Clear'
  | 'Haze'
  | 'Mist'
  | 'Dust';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [temp, setTemp] = useState(0);
  const [condition, setCondition] = useState<WeatherOption>('Clear');

  const getWeather = async (latitude: number, longitude: number) => {
    const {
      data: {
        main: { temp },
        weather,
      },
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
    setIsLoading(false);
    setTemp(temp);
    setCondition(weather[0].main);
  };

  const getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you.", 'So sad');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const roundedTemp = Math.round(temp);
  return isLoading ? <Loading /> : <Weather temp={roundedTemp} condition={condition} />;
}
