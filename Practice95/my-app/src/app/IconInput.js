import React from 'react'

function IconInput({type, name, errors, image, placeholder, fieldRef, hasError}) {
  return (
    <>
    <div className="relative mt-5">
      <input
        name={name}
        type={type}
        id={name}
        className="block px-2.5 pb-2.5 pt-4 w-full max-h-[40px] text-base tracking-[0.25px] leading-[19px] text-dark_2 bg-transparent rounded border-dark_3 border-[1px] appearance-none dark:text-dark_1 dark:border-gray-600 focus:border-dark_2 focus:border-2 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        {...fieldRef}
      />        
      {image}
      <label
        for={name}
        className="absolute text-base leading-[19px] select-none text-dark_2 tracking-[0.25px] dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-2"
      >
        {placeholder}
      </label>
    </div>
    {errors && errors[name]?.type && (
      <span className="text-error text-xs leading-5 tracking-[0.4px]">""</span>
    ) ? (
      <span className="text-error text-xs leading-5 tracking-[0.4px]">{errors[name]?.message}</span>
    ) : (
      <p id="floating_helper_text" class="mt-[3px] text-xs leading-5 tracking-wide text-dark_2 ">The password has to be at least at least 1 letter, 1 special symbol, 1 number</p>
    )}
    {/* {errors && errors[name]?.type === "required" && (
      <span className="text-error text-xs leading-5 tracking-[0.4px]">{errors[name]?.message}</span>
    )} */}
    </>
  )
  // find a way to change icon on type in password input and install react hook forms
}

export default IconInput