'use client'

import React, { useState } from 'react';
import  {MdOutlineLocationOn, MdWbSunny}  from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import SearchBox from './SearchBox';
import axios from 'axios';
import { useAtom } from 'jotai';
import { loadingCityAtom, placeAtom } from '@/app/atom';

type Props = { location?: string};

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
// console.log("API_KEY", API_KEY);

export default function Navbar({location}: Props) {

    const [city, setCity] = useState("");
    const [error, setError] = useState("");

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [ , setPlace] = useAtom(placeAtom);
    const [ , setLoadingCity] = useAtom(loadingCityAtom);

    async function handleInputChange(value : string){
    setCity(value);
    if(value.length >= 3){
    try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`
        );

        interface CityItem {
          name: string;
      }

        const suggestions = response.data.list.map((item: CityItem) => item.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
    } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
        console.log("Error fetching suggestions:", error);
    }
    }else{
        setSuggestions([]);
        setShowSuggestions(false);
    }
    }

    function handleSuggestionClick(value: string) {
        setCity(value);
        setShowSuggestions(false);
        }
    
        function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
            setLoadingCity(true);
        e.preventDefault();
        if(suggestions.length == 0){
        setError("Location not found");
        setLoadingCity(false);
        }else{
            setError("");
            setTimeout(() => {
                setLoadingCity(false);
                setPlace(city);
                setShowSuggestions(false);
            },500);
        }
        }

        function handleCurrentLocation(){
            if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(async (position) => {
                const {latitude, longitude} = position.coords;
                try {
                    setLoadingCity(true);
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
                    setTimeout(() => {
                        setLoadingCity(false);
                        setPlace(response.data.name);
                    }, 5000);
                } catch (error) {
                    setLoadingCity(false);
                    console.log("Error fetching current location:", error);
                }
            });
        }
    }

    return(
      <>
        <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
            <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
                <p className="flex items-center justify-center gap-2">
                    <h2 className="text-gray-500 text-3xl">Weather</h2>
                    <MdWbSunny  className="text-yellow-300 text-3xl mt-1"/>
                </p>
                {/* */}
                <section className="flex items-center gap-2">
                <MdMyLocation
                title='Your Current Location'
                onClick={handleCurrentLocation}
                className='text-2xl text-gray-400 hover:opacity-80 cursor-pointer' />
                <MdOutlineLocationOn className='text-3xl'/>
                <p className='text-slate-900/80 text-sm'> {location} </p>
                <div className='relative hidden md:flex'>
                    {/* SearchBox */}

                    <SearchBox
                    value={city}
                    onSubmit={handleSubmitSearch}
                    onChange={(e) => handleInputChange(e.target.value)}
                    />

                    <SuggestionBox
                    {...{showSuggestions,
                        suggestions,
                        handleSuggestionClick,
                        error}}
                    />
                </div>
                </section>
            </div>
            </nav>

            <section className='flex max-w-7xl px-3 md:hidden'>
            <div className='relative'>
                    {/* SearchBox */}

                    <SearchBox
                    value={city}
                    onSubmit={handleSubmitSearch}
                    onChange={(e) => handleInputChange(e.target.value)}
                    />

                    <SuggestionBox
                    {...{showSuggestions,
                        suggestions,
                        handleSuggestionClick,
                        error}}
                    />
                </div>
            </section>
            </>
    )
}


function SuggestionBox({
    showSuggestions,
    suggestions,
    handleSuggestionClick,
    error
  }: {
    showSuggestions: boolean;
    suggestions: string[];
    handleSuggestionClick: (item: string) => void;
    error: string;
  }) {
    return (
      <>
        {((showSuggestions && suggestions.length > 1) || error) && (
          <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px]  flex flex-col gap-1 py-2 px-2">
            {error && suggestions.length < 1 && (
              <li className="text-red-500 p-1 "> {error}</li>
            )}
            {suggestions.map((item, i) => (
              <li
                key={i}
                onClick={() => handleSuggestionClick(item)}
                className="cursor-pointer p-1 rounded   hover:bg-gray-200"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }