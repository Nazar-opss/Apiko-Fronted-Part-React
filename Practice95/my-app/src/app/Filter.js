"use client"
import React, { useEffect, useState } from 'react'
import styles from './Catalog.module.css'
import Image from 'next/image';
import { Description, Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, ListboxSelectedOption, Select } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { fetchCategoriesList, fetchItemsList, fetchSearchList } from './state/slice/FetchSlice';
import { useDebouncedCallback } from 'use-debounce';
import CreatableSelect from 'react-select/creatable';
import ArrowDown from "../../public/arrow_down.svg"
import Close from "../../public/close.svg"


const customStyles = {
    control: (provided) => ({ // class attribute : class=" css-13cymwt-control"
      ...provided,
      background: 'white',
      display: 'flex',
      flexWrap: 'nowrap',
      borderRadius: 6 
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
          ...styles,
          color: '#373738',
          backgroundColor: isSelected ? '#F2F2F2' : 'white',
          cursor: isDisabled ? 'not-allowed' : 'default',
        //   borderTopRightRadius: 6,
        //   borderTopLeftRadius: 6,
          "&:hover"  : {
            background : "#F2F2F2",
            color      : "#373738",
            cursor: "pointer"
          },
    }),
    menu: (provided) => ({
        ...provided,
        marginTop: 2,
    }),
  };

const optionsSort = [
    {value: 'popular', text: "Popular" },
    {value: 'latest', text: "New" },
]

function Filter(props) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const dispatch = useDispatch()

    const [selectedCategory, setSelectedCategory] = useState("Choose Category")
    const [selectedSort, setSelectedSort] = useState({name: 'Sorting', value: ''})

    const [searchActive, setSearchActive] = useState(false)

    const categories = props.categories
    // console.log(categories)

    const toggleSearch = () => {
        setSearchActive(!searchActive)
    }

    //make re render after select sort, when selected only category, clear params when searching

    console.log(searchParams.get('category'))

    useEffect(() => {
        if (searchParams.size === 1 && searchParams.get('query')?.length >= 3 ) {
            dispatch(fetchSearchList(searchParams.get('query')?.toString()))
        } else if (searchParams.get('category')?.length >= 1 ) {
            dispatch(fetchCategoriesList({categoryId: searchParams.get('id'), sortBy: searchParams.get('sortBy')}));
            setSelectedSort({name: searchParams.get('sortBy') === 'popular' ? 'Popular' : 'New', value:searchParams.get('sortBy')})
            setSelectedCategory(searchParams.get('category'))
        } else {
            dispatch(fetchItemsList())
        }
        // dispatch(fetchItemsList())
        console.log(selectedCategory)
    }, [])
    
    const handleSearch = useDebouncedCallback((term) => {
        console.log(`Searching... ${term}`);
        // router.replace('/?', undefined, { shallow: true });
        const params = new URLSearchParams(searchParams)
        
        if (term) {
            params.delete('category')
            params.delete('id')
            params.delete('sortBy')
            if (term.length >= 3) {
                dispatch(fetchSearchList(term))
            } else {
                dispatch(fetchItemsList())
            }
            params.set('query', term)
        } else {
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
    }, 300)
    
    const handleCategories = ({id, sortBy, name}) => {
        console.log(id, sortBy, name)
        setSelectedCategory(name)
        const params = new URLSearchParams(searchParams)
        if (id) {
            dispatch(fetchCategoriesList({categoryId: id, sortBy: sortBy}))
            params.set('category', name)
            params.set('id', id)
            if(sortBy) {
                params.set('sortBy', sortBy)
            }
        } else {
            params.delete('category')
            params.delete('id')
            dispatch(fetchItemsList())
        }
        replace(`${pathname}?${params.toString()}`)
    }

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
                            <Listbox value={selectedCategory} onChange={setSelectedCategory}
                            // defaultValue={searchParams.get('category')?.toString()}
                            // onChange={(e) => handleCategories({value: selectedCategory,id: e.target, sortBy: selectedSort})}
                            >
                            
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
                                {
                                    selectedCategory == 'Choose Category'
                                        ? <ArrowDown
                                            width={13}
                                            height={8}
                                            className='fill-dark_2'
                                        />
                                        : <Close
                                            onClick={() => setSelectedCategory('Choose Category')}
                                            className='fill-dark_2 cursor-pointer'
                                        />
                                }
                                <Close
                                    onClick={() => setSelectedCategory('Choose Category')}
                                    className='fill-dark_2 cursor-pointer'
                                />
                                </span>
                                <ListboxSelectedOption placeholder='Choose Category'>

                                </ListboxSelectedOption>
                                </ListboxButton>

                                <ListboxOptions
                                    transition
                                    className="absolute z-10 max-h-56 w-full rounded-b-md bg-white text-sm leading-[26px] shadow-lg outline outline-1 outline-select-border focus:outline-1 data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in"
                                >
                                    {categories.map((option) => (
                                        <ListboxOption
                                            key={option.id}
                                            value={option.name}
                                            // defaultValue={searchParams.get('category')?.toString()}
                                            onClick={() => handleCategories({id: option.id, sortBy: selectedSort.value, name: option.name})}
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
                            {/* <CreatableSelect 
                                defaultValue={(e) => categories[`${e?.id}`]}
                                isClearable 
                                isSearchable={false}
                                options={categories} 
                                getOptionValue={(option) => `${option['id']}`} 
                                getOptionLabel={(option) => `${option['name']}`}
                                styles={customStyles}
                                onChange={(e) => handleCategories({id: e?.id, sortBy: selectedSort.value, name: e?.name})}
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                        ...theme.colors,
                                        primary25: '#F2F2F2',
                                        primary: '#DEDEE0',
                                    },
                                    })}
                            /> */}
                            {/* <Select
                                className='w-full'
                                value={selectedCategory}
                                placeholder='CHECK'
                                onChange={setSelectedCategory}
                                // onChange={(e) => handleCategories({id: e?.id, sortBy: selectedSort.value, name: e?.name})}
                            >
                                {
                                    categories.map((option) => (
                                        <MenuItem key={option.id} 
                                        onClick={() => handleCategories({id: option.id, sortBy: selectedSort.value, name: option.name})} 
                                        value={option.name}>{option.name}</MenuItem>
                                    ))
                                }
                            </Select> */}
                        </div>
                        <div className={styles.filter_sort}>
                            <Listbox value={selectedSort.name}>
                            <div className="relative">
                                <ListboxButton className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-select-border focus:outline-none sm:text-sm sm:leading-6">
                                <span className="flex items-center ">
                                    <Image
                                        src="/sorting.svg"
                                        alt="Sorting Icon"
                                        width={14}
                                        height={18}
                                    />
                                    <span className="ml-3 block truncate text-dark_2 open:text-black">{selectedSort.name}</span>
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
                                        // defaultValue={searchParams.get('sortBy') === 'popular' ? 'Popular' : 'New'}
                                        onClick={() => setSelectedSort({name: option.text, value: option.value})}
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