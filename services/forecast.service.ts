import { ChartData, ChartOptions } from 'chart.js/auto';
import { DateTime } from 'luxon';

export interface TomorrowWeatherForecast {
  publishingOffice: string;
  reportDatetime: string;
  timeSeries: [
    {
      timeDefines: string[];
      areas: {
        area: {
          name: string;
          code: string;
        };
        weatherCodes: string[];
        weathers: string[];
        winds: string[];
        waves: string[];
      }[];
    },
    {
      timeDefines: string[];
      areas: {
        area: {
          name: string;
          code: string;
        };
        pops: string[];
      }[];
    },
    {
      timeDefines: string[];
      areas: {
        area: {
          name: string;
          code: string;
        };
        temps: string[];
      }[];
    },
  ];
}

export interface WeekForecast {
  publishingOffice: string;
  reportDatetime: string;
  timeSeries: [
    {
      timeDefines: string[];
      areas: {
        area: {
          name: string;
          code: string;
        };
        weatherCodes: string[];
        pops: string[];
        reliabilities: string[];
      }[];
    },
    {
      timeDefines: string[];
      areas: {
        area: {
          name: string;
          code: string;
        };
        tempsMin: string[];
        tempsMinUpper: string[];
        tempsMinLower: string[];
        tempsMax: string[];
        tempsMaxUpper: string[];
        tempsMaxLower: string[];
      }[];
    },
  ];
  tempAverage: {
    areas: {
      area: {
        name: string;
        code: string;
      };
      min: string;
      max: string;
    }[];
  };
  precipAverage: {
    areas: {
      area: {
        name: string;
        code: string;
      };
      min: string;
      max: string;
    }[];
  };
}

export class ForecastService {
  // private forecast: [TomorrowWeatherForecast, WeekForecast] = [
  //   {
  //     "publishingOffice": "名古屋地方気象台",
  //     "reportDatetime": "2021-06-23T17:00:00+09:00",
  //     "timeSeries": [
  //       {
  //         "timeDefines": [
  //           "2021-06-23T17:00:00+09:00",
  //           "2021-06-24T00:00:00+09:00",
  //           "2021-06-25T00:00:00+09:00"
  //         ],
  //         "areas": [
  //           {
  //             "area": {
  //               "name": "西部",
  //               "code": "230010"
  //             },
  //             "weatherCodes": [
  //               "111",
  //               "201",
  //               "201"
  //             ],
  //             "weathers": [
  //               "晴れ　夜遅く　くもり　所により　夜のはじめ頃　まで　雨　で　雷を伴う",
  //               "くもり　昼過ぎ　まで　時々　晴れ　所により　昼過ぎ　から　夜のはじめ頃　雨　で　雷を伴う",
  //               "くもり　時々　晴れ"
  //             ],
  //             "winds": [
  //               "南の風",
  //               "南の風",
  //               "南東の風　後　南の風"
  //             ],
  //             "waves": [
  //               "０．５メートル",
  //               "０．５メートル",
  //               "０．５メートル"
  //             ]
  //           },
  //           {
  //             "area": {
  //               "name": "東部",
  //               "code": "230020"
  //             },
  //             "weatherCodes": [
  //               "201",
  //               "201",
  //               "201"
  //             ],
  //             "weathers": [
  //               "くもり　夜のはじめ頃　晴れ　所により　夜のはじめ頃　まで　雨　で　雷を伴い　激しく　降る",
  //               "くもり　昼過ぎ　まで　時々　晴れ　所により　昼過ぎ　から　夜のはじめ頃　雨　で　雷を伴い　激しく　降る",
  //               "くもり　時々　晴れ"
  //             ],
  //             "winds": [
  //               "南東の風　後　南の風",
  //               "東の風　後　南の風",
  //               "南の風"
  //             ],
  //             "waves": [
  //               "１．５メートル　ただし　内海　では　０．５メートル",
  //               "１．５メートル　ただし　内海　では　０．５メートル",
  //               "１．５メートル　ただし　内海　では　０．５メートル"
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         "timeDefines": [
  //           "2021-06-23T18:00:00+09:00",
  //           "2021-06-24T00:00:00+09:00",
  //           "2021-06-24T06:00:00+09:00",
  //           "2021-06-24T12:00:00+09:00",
  //           "2021-06-24T18:00:00+09:00"
  //         ],
  //         "areas": [
  //           {
  //             "area": {
  //               "name": "西部",
  //               "code": "230010"
  //             },
  //             "pops": [
  //               "20",
  //               "10",
  //               "10",
  //               "20",
  //               "20"
  //             ]
  //           },
  //           {
  //             "area": {
  //               "name": "東部",
  //               "code": "230020"
  //             },
  //             "pops": [
  //               "30",
  //               "10",
  //               "10",
  //               "30",
  //               "30"
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         "timeDefines": [
  //           "2021-06-24T00:00:00+09:00",
  //           "2021-06-24T09:00:00+09:00"
  //         ],
  //         "areas": [
  //           {
  //             "area": {
  //               "name": "名古屋",
  //               "code": "51106"
  //             },
  //             "temps": [
  //               "20",
  //               "29"
  //             ]
  //           },
  //           {
  //             "area": {
  //               "name": "豊橋",
  //               "code": "51331"
  //             },
  //             "temps": [
  //               "19",
  //               "27"
  //             ]
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     "publishingOffice": "名古屋地方気象台",
  //     "reportDatetime": "2021-06-23T17:00:00+09:00",
  //     "timeSeries": [
  //       {
  //         "timeDefines": [
  //           "2021-06-24T00:00:00+09:00",
  //           "2021-06-25T00:00:00+09:00",
  //           "2021-06-26T00:00:00+09:00",
  //           "2021-06-27T00:00:00+09:00",
  //           "2021-06-28T00:00:00+09:00",
  //           "2021-06-29T00:00:00+09:00",
  //           "2021-06-30T00:00:00+09:00"
  //         ],
  //         "areas": [
  //           {
  //             "area": {
  //               "name": "愛知県",
  //               "code": "230000"
  //             },
  //             "weatherCodes": [
  //               "201",
  //               "201",
  //               "202",
  //               "202",
  //               "202",
  //               "202",
  //               "202"
  //             ],
  //             "pops": [
  //               "",
  //               "30",
  //               "50",
  //               "60",
  //               "60",
  //               "50",
  //               "50"
  //             ],
  //             "reliabilities": [
  //               "",
  //               "",
  //               "C",
  //               "B",
  //               "B",
  //               "C",
  //               "C"
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         "timeDefines": [
  //           "2021-06-24T00:00:00+09:00",
  //           "2021-06-25T00:00:00+09:00",
  //           "2021-06-26T00:00:00+09:00",
  //           "2021-06-27T00:00:00+09:00",
  //           "2021-06-28T00:00:00+09:00",
  //           "2021-06-29T00:00:00+09:00",
  //           "2021-06-30T00:00:00+09:00"
  //         ],
  //         "areas": [
  //           {
  //             "area": {
  //               "name": "名古屋",
  //               "code": "51106"
  //             },
  //             "tempsMin": [
  //               "",
  //               "20",
  //               "21",
  //               "20",
  //               "21",
  //               "22",
  //               "22"
  //             ],
  //             "tempsMinUpper": [
  //               "",
  //               "22",
  //               "22",
  //               "22",
  //               "23",
  //               "24",
  //               "24"
  //             ],
  //             "tempsMinLower": [
  //               "",
  //               "19",
  //               "19",
  //               "19",
  //               "19",
  //               "20",
  //               "21"
  //             ],
  //             "tempsMax": [
  //               "",
  //               "29",
  //               "29",
  //               "25",
  //               "26",
  //               "27",
  //               "28"
  //             ],
  //             "tempsMaxUpper": [
  //               "",
  //               "31",
  //               "31",
  //               "29",
  //               "29",
  //               "32",
  //               "32"
  //             ],
  //             "tempsMaxLower": [
  //               "",
  //               "27",
  //               "27",
  //               "24",
  //               "24",
  //               "25",
  //               "25"
  //             ]
  //           }
  //         ]
  //       }
  //     ],
  //     "tempAverage": {
  //       "areas": [
  //         {
  //           "area": {
  //             "name": "名古屋",
  //             "code": "51106"
  //           },
  //           "min": "21.2",
  //           "max": "28.7"
  //         }
  //       ]
  //     },
  //     "precipAverage": {
  //       "areas": [
  //         {
  //           "area": {
  //             "name": "名古屋",
  //             "code": "51106"
  //           },
  //           "min": "31.7",
  //           "max": "67.8"
  //         }
  //       ]
  //     }
  //   }
  // ];

  constructor(private data: [TomorrowWeatherForecast, WeekForecast]) {
  }

  public static getApiUrl(prefCode: number) {
    return 'https://www.jma.go.jp/bosai/forecast/data/forecast/230000.json';
  }

  public getDateLabels() {
    return this.data[1].timeSeries[1].timeDefines.map(v => DateTime.fromISO(v).toFormat('MM/dd'));
  }

  public getMinTemps() {
    return this.data[1].timeSeries[1].areas[0].tempsMin.map(v => v === '' ? null : Number(v));
  }

  public getMinUpperTemps() {
    return this.data[1].timeSeries[1].areas[0].tempsMinUpper.map(v => v === '' ? null : Number(v));
  }

  public getMinLowerTemps() {
    return this.data[1].timeSeries[1].areas[0].tempsMinLower.map(v => v === '' ? null : Number(v));
  }

  public getMaxTemps() {
    return this.data[1].timeSeries[1].areas[0].tempsMax.map(v => v === '' ? null : Number(v));
  }

  public getMaxUpperTemps() {
    return this.data[1].timeSeries[1].areas[0].tempsMaxUpper.map(v => v === '' ? null : Number(v));
  }

  public getMaxLowerTemps() {
    return this.data[1].timeSeries[1].areas[0].tempsMaxLower.map(v => Number(v));
  }

  public getChartData(): [ChartData, ChartOptions] {
    const data: ChartData = {
      labels: this.getDateLabels(),
      datasets: [
        {
          type: 'line',
          label: '最低気温',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 2,
          fill: false,
          data: this.getMinTemps(),
        },
        {
          type: 'line',
          label: '最高気温',
          backgroundColor: 'rgb(255, 99, 132)',
          borderWidth: 2,
          fill: false,
          data: this.getMaxTemps(),
        },
      ],
    };

    const options: ChartOptions = {
      scales: {
        y: {
          min: -5,
          max: 45,
        },
      },
    };

    return [data, options];
  }
}
