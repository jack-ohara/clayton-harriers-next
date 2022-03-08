import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import harriersLogo from "../public/harriers-logo-transparent.png"
import styles from "../styles/Header.module.css"
import NavMenu from "./menu"

type Props = {
    menuData: any;
}

export default function Header({ menuData }: Props) {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/">
                    <Image src={harriersLogo} width={65} height={65} alt="Clayton Harriers logo" loading="eager" />
                </Link>

                <NavMenu mobileMenuOpen={mobileMenuIsOpen} setMobileMenuOpen={setMobileMenuIsOpen} menuData={menuData} />
            </header>
        </div>
    )
}