import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'
import Image from 'next/image';
import Input from './Input';
function Register(props) {
  return (
    <Dialog
      open={props.isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={props.close}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
        <div className="flex min-h-full items-center justify-center p-4 ">
          <DialogPanel
            transition
            className="w-full max-w-[425px] rounded bg-white pl-[33px] pr-[30px] pb-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle as="h3" className="text-center text-dark_1 relative">
              <p className='pt-10 pb-12 text-[22px] leading-8 '>Register</p>
              <Image
                onClick={props.close}
                className='absolute right-[-9px] top-[21px] cursor-pointer'
                src='/close.svg'
                alt='Close button'
                width={18}
                height={18}
              />
            </DialogTitle>
            <Input
              placeholder='Full Name'
            />
            <Input
              placeholder='Email'
            />
            <Input
              placeholder='Phone number'
            />
            <Input
              placeholder='Password'
            >
              <Image
                src='/password_show.svg'
              />
            </Input>
            <p id="floating_helper_text" class="mt-[3px] text-xs leading-5 tracking-wide text-dark_2 ">The password has to be at least at least 1 letter, 1special symbol, 1 number</p>
            {/* <Input
              placeholder="Password"
              className={clsx(
                "mt-3 block w-full rounded-lg  max-w-[362px] border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
              )}
            /> */}

            <div className="mt-4">
              <Button
                className="text-white bg-orange_btn w-full max-w-[362px] tracking-wide mt-[50px] font-medium rounded text-sm  leading-6 px-[153px] py-1.5 hover:opacity-80"
                onClick={props.close}
              >
                Register
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default Register