import useSWR from 'swr';
import { ForecastService, TomorrowWeatherForecast, WeekForecast } from '../services/forecast.service';
import axios from 'axios';
import { Box } from '@chakra-ui/react';
import { Header } from '../components/header';
import { ForecastGraph } from '../components/forecast-graph';
import { ForecastTable } from '../components/forecast-table';
import { Section } from '../components/section';

export default function Home() {
  const { data: weatherData } = useSWR<[TomorrowWeatherForecast, WeekForecast]>(ForecastService.getApiUrl(23), args => axios.get(args).then(res => res.data));
  if (!weatherData) {
    return <></>;
  }

  const forecastService = new ForecastService(weatherData);
  const dateLabels = forecastService.getDateLabels();
  const minTemps = forecastService.getMinTemps();
  const maxTemps = forecastService.getMaxTemps();
  const [ data, options ] = forecastService.getChartData();

  return (
    <Box>
      <Header path={'/'} />
      <Box as={'main'}>
        <Section>
          <ForecastGraph data={data} options={options} />
        </Section>
        <Section>
          <ForecastTable dateLabels={dateLabels} maxTemps={maxTemps} minTemps={minTemps} />
        </Section>
      </Box>
    </Box>
  );
}
