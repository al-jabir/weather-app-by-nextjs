import { Button, Group, Paper, Text, TextInput } from '@mantine/core';
import { useState } from 'react';

const api_key = '23bc5c22e5a754a5130c8b26f097d093';

export default function Home() {
  const [cityInput, setCityInput] = useState('');
  // console.log(cityInput);
  const [weather, setWeather] = useState<any>({});
  async function getWeather() {
    //https://api.openweathermap.org/data/2.5/weather?{city name}&appid={API key}

    try {
      const serverRes = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?' +
          'q=' +
          cityInput +
          '&appid' +
          api_key +
          '&units=imperial'
      );
      const data = await serverRes.json();
      console.log(data);
      if (data?.cod === '400') throw data;
      setWeather(data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div
      style={{
        position: 'static',
        height: '100vh',
        backgroundImage: `url('https://littlevisuals.co/images/smoking_grass.jpg')`,
        backgroundSize: 'cover',
      }}>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
        <Paper withBorder p='lg' style={{ maxWidth: '500px' }}>
          <Group position='apart'>
            <Text size='xl' weight={500}>
              Get The Weather
            </Text>
          </Group>
          <Group position='apart'>
            <Text size='lg' weight={500}>
              Enter a city, and get the weather below!
            </Text>
          </Group>
          <Group position='apart' mb={'xs'}>
            <TextInput
              label='City Name'
              placeholder='ex: Dhaka'
              onChange={(e) => setCityInput(e.target.value)}
            />
          </Group>
          <Group>
            <Button variant='gradient' size='md' onClick={() => getWeather()}>
              Get Weather
            </Button>
          </Group>
        </Paper>
      </div>
    </div>
  );
}
