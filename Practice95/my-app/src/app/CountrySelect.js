'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries } from './state/slice/FetchSlice'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import ArrowDown from "../../public/arrow_down.svg"

function CountrySelect(props) {
    const [country, setCountry] = useState('Select Country')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCountries())
    }, [])

    const countries = useSelector((state) => state.fetch.countries)

    return (
        <div className='relative mt-5 max-w-[220px]'>
            <Listbox
                value={country}
            >
                <div className="relative">
                    <ListboxButton className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-select-border focus:outline-none sm:text-sm sm:leading-6">
                        <span className="flex items-center ">
                            <span className="block truncate text-dark_2 open:text-black">{country}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ArrowDown
                                width={13}
                                height={8}
                                className='fill-dark_2'
                            />
                        </span>
                    </ListboxButton>

                    <ListboxOptions
                        transition
                        className="absolute z-10 max-h-56 w-full overflow-auto rounded-b-md bg-white text-sm leading-[26px] shadow-lg outline outline-1 outline-select-border focus:outline-1 data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                    >

                        {countries.map((option) => (
                            <ListboxOption
                                key={option}
                                value={option}
                                // defaultValue={searchParams.get('sortBy') === 'popular' ? 'Popular' : 'New'}
                                onClick={() => setCountry(option)}
                                className="group relative cursor-pointer select-none bg-white pt-[8px] pb-[7px] pl-1 pr-3 text-gray-900 data-[focus]:bg-select-hover data-[focus]:text-black"
                            >
                                <div className="flex items-center">
                                    <span className="ml-[33px] block truncate font-normal group-data-[selected]:font-semibold">
                                        {option}
                                    </span>
                                </div>
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </div>
            </Listbox>
            {/* <div className="relative mt-5 max-w-[220px]">
            <select name='countries' className="block px-2.5 pb-2 pt-2.5 w-full max-h-[40px] text-base tracking-[0.25px] leading-[19px] text-dark_2 bg-transparent rounded border-dark_3 border-[1px] appearance-none dark:text-dark_1 dark:border-gray-600 focus:border-dark_2 focus:border-2 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                {
                    countries?.map((elem) => {
                        return <option key={elem} value={elem} className='bg-white hover:bg-orange_main'>{elem}</option>
                    })
                }
            </select>
            <label
                htmlFor='countries'
                className="absolute text-base leading-[19px] select-none text-dark_2 tracking-[0.25px] dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-2"
            >
                Country
            </label>
        </div> */}
        </div>
    )
}

export default CountrySelect