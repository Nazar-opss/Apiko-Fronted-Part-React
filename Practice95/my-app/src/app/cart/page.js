'use client'
import React, { useEffect, useState } from 'react'
import CartItem from '../CartItem'
import { Controller, useForm } from 'react-hook-form'
import Input from '../Input'
import IconInput from '../IconInput'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Select } from '@headlessui/react'
import { fetchCountries } from '../state/slice/FetchSlice'
import CountrySelect from '../CountrySelect'
import ArrowDown from "../../../public/arrow_down.svg"

function CartComponent() {
    const [cartItems, setCartItems] = useState()
    const [country, setCountry] = useState('Select Country')
    const dispatch = useDispatch()

    const countries = useSelector((state) => state.fetch.countries)
    const userData = useSelector((state) => state.auth.userData)
    
    const {phone, fullName} = userData

    const {
        reset,
        register,
        watch,
        setError,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm({
        values: {
            fullName: '',
            phoneNumber: '',
            city: '',
            country: '',
            address: '',
        }
    })
    let cartItemsCopy
    useEffect(() => {
        cartItemsCopy = sessionStorage.getItem('items')
        cartItemsCopy = JSON.parse(cartItemsCopy)
        setCartItems(cartItemsCopy)
        console.log(cartItemsCopy)

        setValue("fullName", fullName)
        setValue("phoneNumber", phone)

        dispatch(fetchCountries())
    }, [fullName, phone, cartItemsCopy])
    
    console.log(cartItems)

    const onSubmit = async (data) => {
        const {fullName, phoneNumber, country, city, address} = data
        console.log(fullName, phoneNumber, country, city, address)
        
    }
    
    return (
        <div className="w-full h-full max-w-[984px] min-h-full bg-white border border-[#E4E4E4] drop-shadow-md m-auto">
            <p className="mt-[70px] ml-[39px] text-[25px] leading-[36.72px] tracking-[0.4px]">
                Cart
            </p>
            <div className="mt-8 ml-[37px] flex">
                <div className="flex flex-col ">
                    {
                        cartItems ? (
                        cartItems?.map((elem) => {
                            return (
                                <CartItem
                                    key={elem.id}
                                    id={elem.id}
                                    picture={elem.picture}
                                    title={elem.title}
                                    alt={elem.title}
                                    price={elem.price}
                                    totalPrice={elem.totalPrice}
                                    quantity={elem.quantity}
                                />
                            );
                        })
                    ) : (
                        <div className="flex flex-row justify-center items-center text-center w-full h-full px-[161px] ">
                            <p className="text-lg leading-[26.44px] tracking-[0.5px] font-bold">
                                There are no items in a cart
                            </p>
                        </div>
                    )}
                </div>
                <div className="flex border-l-[1px] border-[#ECEEF0] h-[526px] ml-[88px] mr-[46px] r-0"></div>

                <form 
                    className='mr-[34px]'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Controller
                        name="fullName"
                        control={control}
                        rules={{
                            required: "Mandatory info missing",
                            pattern: {
                                value: /^[a-zA-Z\s]+$/,
                                message:
                                    "Only letters. Cannot have special characters and numbers",
                            },
                        }}
                        render={({ field }) => (
                            <Input  
                                errors={errors}
                                placeholder="Full Name"
                                type="text"
                                name="fullName"
                                fieldRef={field}
                            />
                        )}
                    />

                    <Controller
                        name="phoneNumber"
                        control={control}
                        rules={{
                            required: "Mandatory info missing",
                            pattern: {
                                value: /^(\+)?([0-9]){10,14}$/,
                                message:
                                    "Should contain 10-14 numbers, can have optional + at the beginning",
                            },
                        }}
                        render={({ field }) => (
                            <Input
                                errors={errors}
                                placeholder="Phone number"
                                type="tel"
                                name="phoneNumber"
                                fieldRef={field}
                            />
                        )}
                    />
                    {/* <Controller
                        name="country"
                        control={control}
                        // rules={{
                        //     required: "Mandatory info missing",
                        //     pattern: {
                        //         value: /^(\+)?([0-9]){10,14}$/,
                        //         message:
                        //             "Should contain 10-14 numbers, can have optional + at the beginning",
                        //     },
                        // }}
                        render={({ field }) => (
                            <CountrySelect field={field}
                            />
                        )}
                    /> */}
                    <div className="relative z-0 mt-5 max-w-[220px]">
                        <select 
                            name="country" 
                            className="block px-2.5 pb-2 pt-2.5 w-full max-h-[40px] text-base tracking-[0.25px] leading-[20px] text-dark_2 bg-transparent rounded border-dark_3 border-[1px] appearance-none dark:text-dark_1 dark:border-gray-600 focus:border-dark_2 focus:border-2 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            {...register("country")}>
                        {
                            countries.map((elem) => (
                                <option key={elem} className='' value={elem}>{elem}</option>
                            ))

                        }
                        </select>
                        {/* <label for="select" class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Select an option</label> */}
                        <label
                            htmlFor="country"
                            className="absolute text-base leading-[19px] select-none text-dark_2 tracking-[0.25px] dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-2"
                            >
                            Country
                        </label>
                    </div>
                    <Controller
                        name="city"
                        control={control}
                        // rules={{
                        //     required: "Mandatory info missing",
                        //     pattern: {
                        //         value: /^[a-zA-Z\s]+$/,
                        //         message:
                        //             "Only letters. Cannot have special characters and numbers",
                        //     },
                        // }}
                        render={({ field }) => (
                            <Input  
                                errors={errors}
                                placeholder="City"
                                type="text"
                                name="city"
                                fieldRef={field}
                            />
                        )}
                    />
                    <Controller
                        name="address"
                        control={control}
                        // rules={{
                        //     required: "Mandatory info missing",
                        //     pattern: {
                        //         value: /^[a-zA-Z\s]+$/,
                        //         message:
                        //             "Only letters. Cannot have special characters and numbers",
                        //     },
                        // }}
                        render={({ field }) => (
                            <Input  
                                errors={errors}
                                placeholder="Address"
                                type="text"
                                name="address"
                                fieldRef={field}
                            />
                        )}
                    />
                    

                    <div className="">
                        <Button
                            type="submit"
                            className="text-white bg-orange_main w-full max-w-[362px] tracking-wide mt-[50px] font-medium rounded text-sm  leading-6 py-1.5 hover:opacity-80"
                            // onClick={props.close}
                        >
                            Confirms the purchase
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
// make form select and style it
export default CartComponent