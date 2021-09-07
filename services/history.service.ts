import { minTemps } from '../data/min-temps';
import { maxTemps } from '../data/max-temps';
import { Temps } from '../data/type';
import { DateTime } from 'luxon';
import { theme } from '@chakra-ui/react';
import { ChartData, ChartOptions } from 'chart.js/auto';
import { ChartDataset } from 'chart.js';

interface HistoryPoint {
  year: number;
  ordinal: number;
}

export enum TempType {
  min,
  max,
}

export class HistoryService {
  constructor(private prefCode: number) {
  }

  public getMinTemps(from: HistoryPoint, to: HistoryPoint) {
    return this.getTemps(minTemps, from, to);
  }

  public getMaxTemps(from: HistoryPoint, to: HistoryPoint) {
    return this.getTemps(maxTemps, from, to);
  }

  private getTemps(baseTemps: Temps, from: HistoryPoint, to: HistoryPoint) {
    if (baseTemps[this.prefCode]?.[from.year] == null || baseTemps[this.prefCode]?.[to.year] == null) {
      return [];
    }

    if (from.year > to.year || (from.ordinal > to.ordinal && from.year === to.year)) {
      return [];
    }

    if (from.year === to.year) {
      const temps = baseTemps[this.prefCode][from.year];
      return temps.slice(from.ordinal - 1, to.ordinal);
    }

    let temps: number[] = [];
    temps = temps.concat(baseTemps[this.prefCode][from.year].slice(from.ordinal));

    let year = from.year;
    while (true) {
      year += 1;

      if (year === to.year) {
        temps = temps.concat(baseTemps[this.prefCode][to.year].slice(0, to.ordinal));
        break;
      }

      temps = temps.concat(baseTemps[this.prefCode][year]);
    }

    return temps;
  }

  public getDateLabels(from: HistoryPoint, to: HistoryPoint) {
    if (from.year > to.year || (from.ordinal > to.ordinal && from.year === to.year)) {
      return undefined;
    }

    const labels: string[] = [];
    const toDate = DateTime.fromFormat(`${to.year} ${to.ordinal}`, 'y o');
    let fromDate = DateTime.fromFormat(`${from.year} ${from.ordinal}`, 'y o');

    while (true) {
      labels.push(fromDate.toFormat('MM/dd'));

      if (fromDate.equals(toDate)) {
        break;
      }

      fromDate = fromDate.plus({ days: 1 });
    }

    return labels;
  }

  public getYears() {
    return Array.from(Array(10)).map((_, i) => 2011 + i);
  }

  public getYearColor(year: number) {
    switch (year % 10) {
      case 0:
        return theme.colors.red;
      case 1:
        return theme.colors.orange;
      case 2:
        return theme.colors.yellow;
      case 3:
        return theme.colors.green;
      case 4:
        return theme.colors.teal;
      case 5:
        return theme.colors.blue;
      case 6:
        return theme.colors.cyan;
      case 7:
        return theme.colors.purple;
      case 8:
        return theme.colors.pink;
      case 9:
      default:
        return theme.colors.gray;
    }
  }

  public getMaxScale(temps: number[]) {
    if (temps.length === 0) {
      return null;
    }

    let max = Math.floor(Math.max(...temps)) + 3;

    while (max % 5 !== 0) {
      max += 1;
    }

    return max;
  }

  public getMinScale(temps: number[]) {
    if (temps.length === 0) {
      return null;
    }

    let min = Math.floor(Math.min(...temps)) - 3;

    while (min % 5 !== 0) {
      min -= 1;
    }

    return min;
  }

  public getAvg(temps: number[]) {
    if (temps.length === 0) {
      return 0;
    }

    return temps.reduce((sum, val) => sum + val) / temps.length;
  }

  public getHistoryChartData(from: HistoryPoint, to: HistoryPoint): [ChartData, ChartOptions] {
    const fromPoint = { year: from.year, ordinal: from.ordinal };
    const toPoint = { year: to.year, ordinal: to.ordinal };

    const minTemps = this.getMinTemps(fromPoint, toPoint);
    const maxTemps = this.getMaxTemps(fromPoint, toPoint);
    const labels = this.getDateLabels(fromPoint, toPoint);

    const data: ChartData = {
      labels: labels,
      datasets: [
        {
          type: 'line',
          label: '最高気温',
          backgroundColor: 'rgb(255, 99, 132)',
          borderWidth: 2,
          fill: false,
          data: maxTemps,
        },
        {
          type: 'line',
          label: '最低気温',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 2,
          fill: false,
          data: minTemps,
        },
      ],
    };

    const options: ChartOptions = {
      scales: {
        y: {
          min: Math.min(this.getMinScale(minTemps) ?? 50, 50),
          max: Math.max(this.getMaxScale(maxTemps) ?? -50, -50),
        },
      },
    };

    return [data, options];
  }

  public getComparisonChartData(from: DateTime, to: DateTime, years: number[], type: TempType): [ChartData, ChartOptions] {
    const labels = this.getDateLabels({ year: from.year, ordinal: from.ordinal }, { year: to.year, ordinal: to.ordinal });
    let maxScale = -50;
    let minScale = 50;

    const datasets: ChartDataset[] = years.map(year => {
      const temps = type === TempType.max ?
        this.getMaxTemps(from.set({ year }), to.set({ year })) :
        this.getMinTemps(from.set({ year }), to.set({ year }));

      maxScale = Math.max(this.getMaxScale(temps) ?? maxScale, maxScale);
      minScale = Math.min(this.getMinScale(temps) ?? minScale, minScale);

      return {
        type: 'line',
        label: String(year),
        backgroundColor: this.getYearColor(year)['400'],
        borderWidth: 2,
        fill: false,
        data: temps,
      };
    });

    const data: ChartData = {
      labels: labels,
      datasets: datasets,
    };

    const options = {
      scales: {
        y: {
          min: minScale,
          max: maxScale,
        },
      },
    };

    return [data, options];
  }
}
