import React from 'react';
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";
import { ImMeter } from "react-icons/im";

export interface WeatherDetailProps {
visibility: string;
humidity: string;
windSpeed: string;
airPressure: string;
sunrise: string;
sunset: string;
}

export default function WeatherDetails(props: WeatherDetailProps) {
    const {
        visibility = "25km",
        humidity = "61%",
        windSpeed = "7 km/h",
        airPressure = "1012 hPa",
        sunrise = "6.20",
        sunset = "18:48"
    } = props;

    return (
    <>
    <SingleWeatherDetails
    icon={<LuEye />}
    information="Visibility"
    value={visibility}
    />
        <SingleWeatherDetails
        icon={<FiDroplet />}
        information="Humidity"
        value={humidity}
    />
        <SingleWeatherDetails
        icon={<MdAir />}
        information="Wind speed"
        value={windSpeed}
    />
        <SingleWeatherDetails
        icon={<ImMeter />}
        information="Air Pressure"
        value={airPressure}
    />
        <SingleWeatherDetails
        icon={<LuSunrise />}
        information="Sunrise"
        value={sunrise}
    />
        <SingleWeatherDetails
        icon={<LuSunset />}
        information="Sunset"
        value={sunset}
    />
    </>
    );
}

export interface SingleWeatherDetailsProps {
information: string;
icon: React.ReactNode;
value: string;
}

function SingleWeatherDetails(props : SingleWeatherDetailsProps) {
    return(
        <div className="flex flex-col items-center justify-between gap-2 text-xs font-semibold
        text-black/80">
            <p className='whitespace-nowrap'>{props.information}</p>
            <div className='text-3xl'>{props.icon}</div>
            <p>{props.value}</p>
            </div>
    );
}
