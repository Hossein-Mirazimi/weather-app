export interface WeatherInterface {
  coord?: {
    lon?: number;
    lat?: number;
  };
  weather?: [
    {
      id?: number;
      main?: string;
      description?: string;
      icon?: string;
    }
  ];
  base?: string;
  main?: {
    temp: number;
    feels_like?: number;
    temp_min?: number;
    temp_max?: number;
    pressure?: number;
    humidity?: number;
  };
  visibility?: number;
  wind?: {
    speed?: number;
    deg?: number;
  };
  clouds?: {
    all?: number;
  };
  dt?: number;
  sys?: {
    type?: number;
    id?: number;
    message?: number;
    country?: string;
    sunrise?: number;
    sunset?: number;
  };
  timezone?: number;
  id?: number;
  name?: string;
  cod?: number;
}

export interface HourlyInterface {
  dt?: number;
  temp?: number;
  feels_like?: number;
  pressure?: number;
  humidity?: number;
  dew_point?: number;
  uvi?: number;
  clouds?: number;
  visibility?: number;
  wind_speed?: number;
  wind_deg?: number;
  wind_gust?: number;

  weather?: {
    id?: number;
    main?: string;
    description?: string;
    icon?: string;
  }[];
  pop?: number;
}
export interface DailyInterface {
  dt?: number;
  sunrise?: number;
  sunset?: number;
  moonrise?: number;
  moonset?: number;
  moon_phase?: number;
  temp?: {
    day?: number;
    min?: number;
    max?: number;
    night?: number;
    eve?: number;
    morn?: number;
  };
  feels_like?: {
    day?: number;
    night?: number;
    eve?: number;
    morn?: number;
  };
  pressure?: number;
  humidity?: number;
  dew_point?: number;
  wind_speed?: number;
  wind_gust?: number;
  wind_deg?: number;
  weather?: {
    id?: number;
    main?: string;
    description?: string;
    icon?: string;
  }[];
  clouds?: number;
  pop?: number;
  rain?: number;
  snow?: number;
  uvi?: number;
}
export interface ForecastInterface {
  lat?: number;
  lon?: number;
  timezone?: string;
  timezone_offset?: number;
  current?: {
    dt?: number;
    sunrise?: number;
    sunset?: number;
    temp?: number;
    feels_like?: number;
    pressure?: number;
    humidity?: number;
    dew_point?: number;
    uvi?: number;
    clouds?: number;
    visibility?: number;
    wind_speed?: number;
    wind_gust?: number;
    wind_deg?: number;
    weather?: {
      id?: number;
      main?: string;
      description?: string;
      icon?: string;
    }[];
    rain?: {
      [propName: string]: number;
    };
    snow?: {
      [propName: string]: number;
    };
  };
  minutely?: {
    dt?: number;
    precipitation?: number;
  }[];

  hourly?: HourlyInterface[];

  daily?: DailyInterface[];
  alerts?: {
    sender_name?: string;
    event?: string;
    start?: number;
    end?: number;
    description?: string;
    tags?: string[];
  }[];
}
export interface CityInterface {
  id: string;
  city?: string;
  currentweather: WeatherInterface;
}
