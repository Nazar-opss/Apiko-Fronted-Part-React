'use client'
import { useState } from 'react';
import styles from './Header.module.css'
import Image from 'next/image';
import Register from './Register';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from '@headlessui/react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  const authCheck = useSelector((state) => state.auth.accessToken)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const userData = useSelector((state) => state.auth.userData)
  
  let {fullName, email, phoneNumber, phone, id} = userData

  const dispatch = useDispatch()

  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  const avatarInitials = fullName?.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')

  console.log(avatarInitials)
  return (
    <div className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.header_buttons}>
          <Image src="/logo.svg" alt="Apiko Logo" width={102} height={42} />
          <div className={styles.header_links}>
            <Image
              src="/like.svg"
              alt="Like Icon"
              width={18}
              height={18}
              style={{ marginRight: "25px" }}
            />
            <Image src="/basket.svg" alt="Basket Icon" width={18} height={18} />
          </div>
        </div>
        {
          isLoggedIn === true 
          ? 
            <div className='flex items-center ml-8 justify-center text-white text-xs leading-[17.63px] '>
              <p className='truncate'>Welcome, {fullName}!</p>
              <Menu>
                <MenuButton
                  className='ml-4 flex justify-center items-center '
                >
                  <div className=' h-full max-w-[40px] max-h-[38px] rounded-[100%] bg-white flex  border-2 border-orange_main justify-center'>
                    <div className='text-black py-2 px-3 text-sm'>{avatarInitials}</div>
                  </div>
                  <Image
                    className='ml-[11px]' 
                    src="/arrow_down.svg"
                    alt="Arrow Down"
                    width={18}
                    height={13}
                  />
                </MenuButton>
                <MenuItems
                  transition
                  anchor="bottom end"
                  className="w-52 mt-[19px] flex drop-shadow-md flex-col origin-top-right rounded-lg border border-white bg-white text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                  <div className='flex flex-col py-[17px] px-4 text-[13px] leading-[19px] tracking-wide '>
                    <p className='text-dark_1'>{fullName}</p>
                    <p className='text-dark_2 font-light mt-px'>{email}</p>
                  </div>
                  <MenuSeparator className="h-px bg-[#E4E4E4]" />
                  <div className='flex flex-col text-sm leading-[26px] py-[10px] px-4 gap-[14px]'>
                    <MenuItem as='button' className='text-dark_1 text-start ' onClick={() => console.log('setting')}>
                      Settings
                    </MenuItem>
                    <MenuItem as='button' className='text-error text-start ' onClick={() => console.log('logout')}>
                      Log Out
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
                
            </div>
          : 
            <div className={styles.header_auth}>
              {/* TODO: Modals by ulr */}
              <button onClick={() => openModal("Register")}>REGISTER</button>

              <div className={styles.vl}></div>
              {modalContent === "Login" 
                ? (
                <Login close={closeModal} RegIn={() => openModal("Register")} isOpen={isOpen} />
              ) : (
                <Register close={closeModal} LogIn={() => openModal("Login")} isOpen={isOpen} />
              )}
              <button onClick={() => openModal("Login")}>LOG IN</button>
              {/* <button> <Link href="/login">Open modal</Link></button> */}
            </div>
        }
      </div>
    </div>
  );
}