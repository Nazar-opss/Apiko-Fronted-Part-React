import React from 'react'
import { forwardRef } from 'react';

const Input = ({type, name, placeholder, fieldRef, hasError}) => (
  <div class="relative mt-5">
      <input
        name={name}
        type={type}
        id={name}
        class="block px-2.5 pb-2.5 pt-4 w-full max-h-[40px] text-base tracking-[0.25px] leading-[19px] text-dark_2 bg-transparent rounded border-dark_3 border-[1px] appearance-none dark:text-dark_1 dark:border-gray-600 focus:border-dark_2 focus:border-2 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        {...fieldRef}
      />
      <label
        htmlFor={name}
        class="absolute text-base leading-[19px] select-none text-dark_2 tracking-[0.25px] dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-2"
      >
        {placeholder}
      </label>
    </div>
  )
  
  {/* <label
    for={props.name}
    class="absolute text-base leading-[19px] select-none text-dark_2 tracking-[0.25px] dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-2"
  >
    {props.placeholder}
  </label>
  <input
    name={props.name}
    type={props.type}
    id={props.name}
    class="block px-2.5 pb-2.5 pt-4 w-full max-h-[40px] text-base tracking-[0.25px] leading-[19px] text-dark_2 bg-transparent rounded border-dark_3 border-[1px] appearance-none dark:text-dark_1 dark:border-gray-600 focus:border-dark_2 focus:border-2 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    placeholder=" "
  /> */}


export default Input