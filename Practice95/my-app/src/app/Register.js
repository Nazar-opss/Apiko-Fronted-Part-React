import { Button, CloseButton, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import React, { useState } from 'react'
import Image from 'next/image';
import Input from './Input';
function Register(props) {
  const [show, setShot] = useState('/password_show.svg')

  const handleIcon = () =>{
    setShot('/password_hide.svg')
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
            <div className='bg-white pl-[33px] pr-[30px] pb-10'>
              <DialogTitle as="h3" className="text-center text-dark_1 relative">
                <p className='pt-10 pb-7 text-[22px] leading-8'>Register</p>
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
                image={ <Image
                  className='absolute right-[17px] top-[13px]'
                  src={show}
                  width={18}
                  height={18}
                  alt='Show Password'
                />}
                placeholder='Password'
                handleIcon={handleIcon}
                type={'password'}
              />
              
              <p id="floating_helper_text" class="mt-[3px] text-xs leading-5 tracking-wide text-dark_2 ">The password has to be at least at least 1 letter, 1special symbol, 1 number</p>
              <div className="mt-4">
                <Button
                  className="text-white bg-orange_main w-full max-w-[362px] tracking-wide mt-[50px] font-medium rounded text-sm  leading-6 px-[153px] py-1.5 hover:opacity-80"
                  onClick={props.close}
                >
                  Register
                </Button>
              </div>
            </div>
            <div className='bg-white'>
              <DialogPanel
                transition
                className="w-full max-w-[425px] mt-[15px] text-sm leading-[26px] rounded text-center bg-white pl-[108px] pt-[30px] pr-[111px] pb-5 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                > 
                <p>I already have an account, <a href='#' className='text-orange_main'>Log In</a></p>
              </DialogPanel>
            </div>
          </DialogPanel>
          
        </div>
      </div>
    </Dialog>
  );
  // <Modal
  //       show={props.isOpen}
  //       onHide={props.close}
  //       backdrop="static"
  //       keyboard={false}
  //     >
  //       <Modal.Header closeButton>
  //         <Modal.Title>Modal title</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         I will not close if you click outside me. Do not even try to press
  //         escape key.
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button variant="secondary" onClick={props.close}>
  //           Close
  //         </Button>
  //         <Button variant="primary">Understood</Button>
  //       </Modal.Footer>
  //     </Modal>
}

export default Register