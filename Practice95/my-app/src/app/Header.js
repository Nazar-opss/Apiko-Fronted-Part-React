'use client'
import { useState } from 'react';
import styles from './Header.module.css'
import Image from 'next/image';
import Register from './Register';
import Login from './Login';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './state/slice/AuthSlice';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  const authCheck = useSelector((state) => state.auth.accessToken)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  
  console.log(authCheck)

  const dispatch = useDispatch()

  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  console.log(isLoggedIn)
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
            <div>
              <p>LOX</p>
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
              <button onClick={() => dispatch(login(authCheck))}>LOG IN</button>
      </div>
    </div>
  );
}