import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Image from 'next/image'
import React from 'react'

function Favourite_CTA(props) {
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
          <div className='bg-white '>
            <DialogTitle as="h3" className="text-center text-dark_1 relative">
              <Image
                onClick={props.close}
                className='absolute right-[32px] top-[32px] cursor-pointer'
                src='/close.svg'
                alt='Close button'
                width={18}
                height={18}
              />
            </DialogTitle>
            <div className='pl-[102px] pr-[103px] pb-[54px] pt-[84px]'>
                <div className='max-w-[220px] flex flex-col justify-center items-center text-center tracking-[0.4px]'>
                    <p className='text-[25px] text-dark_1 leading-[35px] '>
                        To continue please 
                        register or log in
                    </p>
                    <div className='font-medium text-sm leading-6 h-[158px] flex flex-col justify-between mt-8' >
                        <Button
                            className="text-white bg-orange_main w-full py-1.5 px-[47.5px] rounded hover:opacity-80"
                        >
                            Continue to sign in
                        </Button>
                        <Button
                            className="text-white bg-orange_main w-full py-1.5 px-[44px] rounded hover:opacity-80"
                        >
                            Continue to register
                        </Button>
                        <Button
                            className="text-orange_main bg-white w-full py-1.5 px-[47.5px] border-[1px] border-orange_main rounded hover:opacity-80"
                        >
                            Continue as guest
                        </Button>
                    </div>
                </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
  )
}

export default Favourite_CTA