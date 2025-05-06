import { cn } from '@/utils/cn';
import React from 'react';
import { IoSearch } from "react-icons/io5";

type Props = {
    className?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;

};

export default function SearchBox(props: Props) {
    return (
    <form onSubmit={props.onSubmit}
    className={cn("flex relative items-center justify-center h-10", props.className)}>
        <input
            type="text"
            value={props.value}
            onChange={props.onChange}
            placeholder="Search location...."
            className="px-4 py-2 h-full w-[230px] rounded-l-md border
        border-gray-300 focus:outline-none focus:outline-none focus:border-blue-500"
            />
        <button className='px-4 py-[9px] h-full  focus:outline-none
        rounded-r-md bg-blue-500 text-white hover:bg-blue-600'>
        <IoSearch />
        </button>
    </form>
  )
}