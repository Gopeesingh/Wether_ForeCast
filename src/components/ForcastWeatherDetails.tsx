import React from 'react';
import { convertKelvinToCelsius } from '@/utils/convertKelvineToCelsius';
import  Container  from './Container';
import WeatherDetails, { WeatherDetailProps } from './WeatherDetails';
import WeatherIcon from './WeatherIcon';


export interface ForecastWeatherDetailsProps extends WeatherDetailProps {
    weatherIcon: string;
    date: string;
    day: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    description: string;
}

export default function ForcastWeatherDetails(props: ForecastWeatherDetailsProps) {
const {
    weatherIcon = "02d",
    date = "19.09",
    day = "Tuesday",
    temp,
    feels_like,
    // temp_min,
    // temp_max,
    description
    } = props;
    return (
        <Container className='gap-4'>
        {/* left */}
        <section className='flex gap-4 item-center px-4'>
            <div className='flex flex-col items-center gap-1'>
            <WeatherIcon iconName={weatherIcon}/>
            <p>{date}</p>
            <p className='text-sm'>{day}</p>
            </div>

            {/*  */}
            <div className='flex flex-col px-4'>
                <span className='text-5xl'>{convertKelvinToCelsius(temp ?? 0)}°</span>
                <p className="text-xs space-x-1 whitespace-nowrap">
            <span> Feels like</span>
            <span>{convertKelvinToCelsius(feels_like ?? 0)}°</span>
            </p>
            <p className='capitalize'>{description}</p>
            </div>
        </section>

        {/* right */}
        <section className='overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10'>
        <WeatherDetails {...props}/>
        </section>
        </Container>
    );
}