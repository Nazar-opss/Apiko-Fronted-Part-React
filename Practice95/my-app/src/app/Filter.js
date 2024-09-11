"use client"
import React, { useEffect, useState } from 'react'
import styles from './Catalog.module.css'
import Image from 'next/image';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { fetchItemsList, fetchSearchList } from './state/slice/FetchSlice';
import { useDebouncedCallback } from 'use-debounce';
import ArrowDown from "../../public/arrow_down.svg"

const optionsSort = [
    {value: '1', text: "Popular" },
    {value: '2', text: "New" },
]

function Filter(props) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const dispatch = useDispatch()

    const [selectedCategory, setSelectedCategory] = useState("Choose Category")
    const [selectedSort, setSelectedSort] = useState("Sorting")

    const [searchActive, setSearchActive] = useState(false)

    const categories = props.categories

    const toggleSearch = () => {
        setSearchActive(!searchActive)
    }

    console.log(searchParams.get('query')?.length)

    useEffect(() => {
        if (searchParams.size === 1 && searchParams.get('query')?.length >= 3 ) {
            dispatch(fetchSearchList(searchParams.get('query')?.toString()))
        } else {
            dispatch(fetchItemsList())
        }
        // dispatch(fetchItemsList())
    }, [])
    
    const handleSearch = useDebouncedCallback((term) => {
        console.log(`Searching... ${term}`);
        const params = new URLSearchParams(searchParams)
        if (term) {
            if (term.length >= 3) {
                dispatch(fetchSearchList(term))
            } 
            params.set('query', term)
        } else {
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
    }, 300)

  return (
    <div className={styles.filter}>
            <div className={styles.filter_container}>
                <div className={styles.filter_search}>
                    <div className="relative rounded-md shadow-sm ">
                    <div className="pointer-events-none absolute inset-y-0  left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">
                            <Image
                                src="/search.svg"
                                alt="Search Icon"
                                width={17.5}
                                height={17.5}
                            />
                        </span>
                    </div>
                    <input
                        onFocus={toggleSearch}
                        onBlur={toggleSearch}
                        id="name"
                        name="name"
                        type="text"
                        onChange={(e) => {
                            handleSearch(e.target.value);
                        }}
                        defaultValue={searchParams.get('query')?.toString()}
                        placeholder="Search products by name"
                        className="block w-full rounded-md border-0 py-1.5 pl-9 pr-22 ring-1 ring-select-border placeholder:text-dark_2  focus:outline-none focus:ring-1 focus:ring-select-border sm:text-sm sm:leading-6"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center"></div>
                    </div>
                </div>
                {
                    searchActive === true 
                    ? 
                    ''
                    : 
                    <>
                        <div className={styles.filter_category}>
                            <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                            <div className="relative">
                                <ListboxButton className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-select-border  open:rounded-t-md focus:outline-none sm:text-sm sm:leading-6 ">
                                <span className="flex items-center">
                                    <Image
                                        src="/menu.svg"
                                        alt="Menu Icon"
                                        width={17}
                                        height={14}
                                    />
                                    <span className="ml-1.5 block truncate text-dark_2">{selectedCategory}</span>
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
                                    className="absolute z-10 max-h-56 w-full rounded-b-md bg-white text-sm leading-[26px] shadow-lg outline outline-1 outline-select-border focus:outline-1 data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in"
                                >
                                    {categories.map((option) => (
                                        <ListboxOption
                                            key={option.id}
                                            value={option.name}

                                            className="group relative cursor-pointer select-none bg-white pt-[8px] pb-[7px] pl-1 pr-3 text-gray-900 data-[focus]:bg-select-hover data-[focus]:text-black"
                                        >
                                            <div className="flex items-center">
                                                <span className="ml-[33px] block truncate  font-normal group-data-[selected]:font-semibold">
                                                {option.name}
                                                </span>
                                            </div>
                                        </ListboxOption>
                                    ))}
                                </ListboxOptions>
                            </div>
                            </Listbox>
                        </div>
                        <div className={styles.filter_sort}>
                            <Listbox value={selectedSort} onChange={setSelectedSort}>
                            <div className="relative">
                                <ListboxButton className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-select-border focus:outline-none sm:text-sm sm:leading-6">
                                <span className="flex items-center ">
                                    <Image
                                        src="/sorting.svg"
                                        alt="Sorting Icon"
                                        width={14}
                                        height={18}
                                    />
                                    <span className="ml-3 block truncate text-dark_2 open:text-black">{selectedSort}</span>
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
                                {optionsSort.map((option) => (
                                    <ListboxOption
                                        key={option.value}
                                        value={option.text}
                                        disabled={option.disabled}
                                        className="group relative cursor-pointer select-none bg-white pt-[8px] pb-[7px] pl-1 pr-3 text-gray-900 data-[focus]:bg-select-hover data-[focus]:text-black"
                                    >
                                    <div className="flex items-center">
                                        <span className="ml-[33px] block truncate font-normal group-data-[selected]:font-semibold">
                                        {option.text}
                                        </span>
                                    </div>
                                    </ListboxOption>
                                ))}
                                </ListboxOptions>
                            </div>
                            </Listbox>
                        </div>
                    </> 
                }
            </div>
        </div>
  )
}

export default Filter