import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js/auto';

interface Props {
  data: ChartData;
  options: ChartOptions;
}

export const ForecastGraph: React.VFC<Props> = props => {
  return (
    <Bar data={props.data} options={props.options} />
  );
};
