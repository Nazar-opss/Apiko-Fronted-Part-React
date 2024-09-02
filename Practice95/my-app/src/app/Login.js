'use client'
import React, { useState } from 'react'
import { Button, CloseButton, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Controller, useForm } from 'react-hook-form'
import Input from './Input'
import Image from 'next/image'
import IconInput from './IconInput'
import { useDispatch, useSelector } from 'react-redux'
import { setAccessToken, setIsLoggedIn } from './state/slice/AuthSlice'

function Login(props) {
  const authCheck = useSelector((state) => state.auth.accessToken)

  const dispatch = useDispatch()

  const [isVisible, setIsVisible] = useState(true)

  const passwordToggle = () => {
    setIsVisible(!isVisible)
  }

  const {
      register,
      handleSubmit,
      setError,
      formState: {errors},
      control,
  } = useForm({
      values: {
          email: '',
          password: '',
      }
  })

  const onSubmit = async (data) => {
    const {email, password} = data
    try {
      await fetch('https://demo-api.apiko.academy/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "email": email,
          "password":password
          } ),
      }) .then(response => response.json())
          // .then(response => console.log(response))
          .then(response => {
            dispatch(setAccessToken(response.token))
            if (response.status === 401) {
              dispatch(setIsLoggedIn(false))
              throw new Error();
            } 
            dispatch(setIsLoggedIn(true))
            }
          )
        } catch (error) {
          setError("root", {
            message:"Email or password is wrong"
          })
        }
        console.log(data)
        console.log(authCheck)
        
        // validate such email
        // setError("root", {
          //   message:"Email or password is wrong"
          // })
          
    // working to get token continue with this and read this https://reqbin.com/code/javascript/wzp2hxwh/javascript-post-request-example
    // reset();
  }

  return (
    <Dialog
      open={props.isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={props.close}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/70" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
        <div className="flex flex-col min-h-full items-center justify-center p-4 ">
          <DialogPanel
            transition
            className="w-full max-w-[425px] rounded duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className='bg-white pl-[33px] pr-[30px] pb-[29px]'>
              <DialogTitle as="h3" className="text-center text-dark_1 relative">
                <p className='pt-[33px] pb-7 text-[22px] leading-8'>Login</p>
                <Image
                  onClick={props.close}
                  className='absolute right-[-9px] top-[21px] cursor-pointer'
                  src='/close.svg'
                  alt='Close button'
                  width={18}
                  height={18}
                />
              </DialogTitle>
              <form
                onSubmit={handleSubmit(onSubmit)}
              >
                 {/* <input type="text" class="block px-2.5 pb-2.5 pt-4 w-full max-h-[40px] text-base tracking-[0.25px] leading-[19px] text-dark_2 bg-transparent rounded border-dark_3 border-[1px] appearance-none dark:text-dark_1 dark:border-gray-600 focus:border-dark_2 focus:border-2 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Full Name" {...register("Full Name", {required: true})} /> */}
                {/* <Controller
                  name='fullName'
                  control={control}
                  defaultValue='Check'
                  render={({field}) => <Input {...field} type={'text'} placeholder='Full Name'/>}
                /> */}
                  


         
                <Controller
                  name='email'
                  control={control}
                  rules={{required: 'Mandatory info missing',
                    pattern: {
                      value: /\S+@\S+/,
                      message: 'Should contain @'
                    }
                  }}
                  render={({field}) => (
                    <Input
                      placeholder='Email'
                      type='email'
                      name='email'
                      errors={errors}
                      fieldRef={field}
                    />
                  )}
                />
                <Controller
                  name='password'
                  control={control}
                  rules={{required: 'Mandatory info missing',}}
                  render={({field}) =>(
                    <IconInput 
                        errors={errors}
                        placeholder='Password'
                        handleIcon={passwordToggle}
                        isVisible={isVisible}
                        type={isVisible === true ? 'password' : 'text'}
                        name='password'
                        fieldRef={field}
                      /> 
                  )}
                />
                {
                  errors.root && <div className='text-error text-xs leading-5 tracking-[0.4px]'>{errors.root.message}</div>
                }
                <Button className="text-white bg-orange_main w-full max-w-[362px] tracking-wide mt-[71px] font-medium rounded text-sm  leading-6 px-[153px] py-1.5 hover:opacity-80" 
                onClick={() => console.log(authCheck)}/>
                <div className="mt-4">
                  <Button
                    type="submit"
                    className="text-white bg-orange_main w-full max-w-[362px] tracking-wide mt-[71px] font-medium rounded text-sm  leading-6 px-[153px] py-1.5 hover:opacity-80"
                    // onClick={props.close}
                  >
                    Login
                  </Button>
                </div>
              </form>
            </div>
            <div className='bg-white'>
              <DialogPanel
                transition
                className="w-full max-w-[425px] mt-[15px] text-sm leading-[26px] rounded text-center bg-white pl-[108px] pt-[30px] pr-[111px] pb-5 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                > 
                <p>I have no account, <a onClick={props.RegIn} className='text-orange_main cursor-pointer'>Register now</a></p>
              </DialogPanel>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default Login