import { headers } from 'next/headers';
import styles from './Header.module.css'
import Image from 'next/image';

export default function Header() {
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
                    <a>REGISTER</a>
                    <div className={styles.vl}></div>
                    <a>LOG IN</a>
                </div>
            </div>
        </div>
    );
}