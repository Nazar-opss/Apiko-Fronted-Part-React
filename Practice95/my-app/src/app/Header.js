'use client'
import { useState } from 'react';
import styles from './Header.module.css'
import Image from 'next/image';
import Register from './Register';
import { createPortal } from 'react-dom';

export default function Header() {
    let [isOpen, setIsOpen] = useState(false)

    function open() {
        setIsOpen(true)
    }
    
    function close() {
        setIsOpen(false)
    }

    return (
        <div className={styles.header}>
            <div className={styles.header_container}>
                <div className={styles.header_buttons}>
                    <Image
                        src="/logo.svg"
                        alt="Apiko Logo"
                        width={102}
                        height={42}
                    />
                    <div className={styles.header_links}>
                        <Image
                            src="/like.svg"
                            alt="Like Icon"
                            width={18}
                            height={18}
                            style={{marginRight: '25px'}}
                        />
                        <Image
                            src="/basket.svg"
                            alt="Basket Icon"
                            width={18}
                            height={18}
                        />
                    </div>
                </div>
                <div className={styles.header_auth}>
                    <button onClick={open}>REGISTER</button>
                    <Register 
                        close={close}
                        isOpen={isOpen}
                        />
                    {/* {isOpen && createPortal(
                        <Register isOpen={isOpen} close={() => setIsOpen(false)} />,
                        document.getElementById('myroot'),
                        )} */}
                    <div className={styles.vl}></div>
                    <a>LOG IN</a>
                </div>
            </div>
        </div>
        
    );
}