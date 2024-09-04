"use client"

import React, { useState } from 'react'
import styles from './Catalog.module.css'
import Image from 'next/image';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const optionsSort = [
    {value: '1', text: "Popular" },
    {value: '2', text: "New" },
]

function Filter(props) {
    const [selectedCategory, setSelectedCategory] = useState("Choose Category")
    const [selectedSort, setSelectedSort] = useState("Sorting")
    const categories = props.categories


  return (
    <div className={styles.filter}>
            <div className={styles.filter_container}>
                <div className={styles.filter_search}>
                    <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
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
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Search products by name"
                        className="block w-full rounded-md border-0 py-1.5 pl-9 pr-22 text-gray-900 ring-1 ring-select-border ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-select-border sm:text-sm sm:leading-6"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center"></div>
                    </div>
                </div>
                <div className={styles.filter_category}>
                    <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                    <div className="relative">
                        <ListboxButton className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-select-border ring-gray-300 open:rounded-t-md focus:outline-none focus:ring-2 sm:text-sm sm:leading-6 ">
                        <span className="flex items-center">
                            <Image
                                src="/menu.svg"
                                alt="Menu Icon"
                                width={17}
                                height={14}
                            />
                            <span className="ml-1.5 block truncate">{selectedCategory}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronDownIcon
                                className='w-7 h-7'
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
                                        <span className="ml-[33px] block truncate font-normal group-data-[selected]:font-semibold">
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
                        <ListboxButton className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-select-border ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                        <span className="flex items-center">
                            <Image
                                src="/sorting.svg"
                                alt="Sorting Icon"
                                width={14}
                                height={18}
                            />
                            <span className="ml-3 block truncate">{selectedSort}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronDownIcon
                                className='w-7 h-7'
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
            </div>
        </div>
  )
}

export default Filter