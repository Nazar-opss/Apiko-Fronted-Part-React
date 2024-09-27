"use client";
import IconInput from "@/app/IconInput";
import Input from "@/app/Input";
import { Button } from "@headlessui/react";
import Link from "next/link";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function Edit() {
  const [isVisible, setIsVisible] = useState(true)
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.fetch.countries);

  const {
    reset,
    register,
    watch,
    setError,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    values: {
      fullName: "",
      phoneNumber: "",
      city: "",
      country: "",
      address: "",
    },
  });

  const onSubmit = async (data) => {
    const { fullName, phoneNumber, country, city, address } = data;
    console.log(fullName, phoneNumber, country, city, address);
  };
  const onSubmitPassword = async (data) => {
    const { currentPassword, confirmPassword, newPassword } = data;
    console.log(currentPassword, confirmPassword, newPassword);
  };

  const passwordToggle = () => {
    setIsVisible(!isVisible)
  }
  return (
    <div className="w-full mt-[63px] ">
      <p className="ml-[206px] text-lg leading-6 tracking-[0.15px] ">Main information</p>
      <div className="w-full flex flex-col justify-center items-center">
        <form
          className="w-full max-w-[377px] mt-[10px]"
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
          <div className="relative z-0 mt-5">
            <select
              name="country"
              className="block px-2.5 pb-2 pt-2.5 w-full max-h-[40px] text-base tracking-[0.25px] leading-[20px] text-dark_2 bg-transparent rounded border-dark_3 border-[1px] appearance-none focus:border-dark_2 focus:border-2 focus:outline-none focus:ring-0 peer"
              {...register("country", { required: "Mandatory info missing" })}
            >
              {/* <option selected disabled hidden></option> */}
              {countries.map((elem) => (
                <option key={elem} className="" value={elem}>
                  {elem}
                </option>
              ))}
            </select>
            {/* <label for="country" class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Select an option</label> */}
            <label
              htmlFor="country"
              className="absolute text-base leading-[19px] select-none text-dark_2 tracking-[0.25px] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-2"
            >
              Country
            </label>
            {errors && (
              <span className="text-error text-xs leading-5 tracking-[0.4px]">
                {errors?.message}
              </span>
            )}
          </div>
          <Controller
            name="city"
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
            rules={{
              required: "Mandatory info missing",
            }}
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
              disabled={!isDirty || !isValid}
              className={`text-white bg-orange_main w-full tracking-[0.4px] ${
                !isValid ? "cursor-not-allowed" : "cursor-pointer"
              } mt-[40px] {} font-medium rounded-[5px] text-sm  leading-6 py-1.5 hover:opacity-80`}
              // onClick={props.close}
            >
              Save
            </Button>
            
          </div>
        </form>
      </div>
      <p className="ml-[206px] text-lg leading-6 tracking-[0.15px] mt-[50px]">Change password</p>
      <div className="w-full flex flex-col justify-center items-center ">
        <form
          className="w-full max-w-[377px] mt-[10px]"
          onSubmit={handleSubmit(onSubmitPassword)}
        >
          <Controller
                  name='currentPassword'
                  control={control}
                  rules={{required: 'Mandatory info missing',}}
                  render={({field}) =>(
                    <IconInput 
                        errors={errors}
                        placeholder='Current password'
                        handleIcon={passwordToggle}
                        isVisible={isVisible}
                        type={isVisible === true ? 'password' : 'text'}
                        name='currentPassword'
                        fieldRef={field}
                      /> 
                  )}
                />
                {
                  errors.root && <div className='text-error text-xs leading-5 tracking-[0.4px]'>{errors.root.message}</div>
                }
                <Controller
                  name='newPassword'
                  control={control}
                  rules={{required: 'Mandatory info missing',}}
                  render={({field}) =>(
                    <IconInput 
                        errors={errors}
                        placeholder='New password'
                        handleIcon={passwordToggle}
                        isVisible={isVisible}
                        type={isVisible === true ? 'password' : 'text'}
                        name='newPassword'
                        fieldRef={field}
                      /> 
                  )}
                />
                {
                  errors.root && <div className='text-error text-xs leading-5 tracking-[0.4px]'>{errors.root.message}</div>
                }

          <Controller
                  name='confirmPassword'
                  control={control}
                  rules={{required: 'Mandatory info missing',}}
                  render={({field}) =>(
                    <IconInput 
                        errors={errors}
                        placeholder='Confirm password'
                        handleIcon={passwordToggle}
                        isVisible={isVisible}
                        type={isVisible === true ? 'password' : 'text'}
                        name='confirmPassword'
                        fieldRef={field}
                      /> 
                  )}
                />
                {
                  errors.root && <div className='text-error text-xs leading-5 tracking-[0.4px]'>{errors.root.message}</div>
                }
          
          <div className="">
            <Button
              type="submit"
              disabled={!isDirty || !isValid}
              className={`text-white bg-orange_main w-full tracking-[0.4px] ${
                !isValid ? "cursor-not-allowed" : "cursor-pointer"
              } mt-[40px] {} font-medium rounded-[5px] text-sm  leading-6 py-1.5 hover:opacity-80`}
              // onClick={props.close}
            >
              Change password
            </Button>
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
