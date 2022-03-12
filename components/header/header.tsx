import Image from "next/image"
import Link from "next/link"
import { forwardRef, useState } from "react"
import harriersLogo from "../../public/harriers-logo-transparent.png"
import styles from "./Header.module.css"
import NavMenu from "../menu"

type Props = {
    menuData: any;
}

export default function Header({ menuData }: Props) {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

    const CustomImage = forwardRef<HTMLAnchorElement, any>((props, ref) => {
        return (
            <a href={props.href} ref={ref}>
                <Image src={harriersLogo} width={65} height={65} alt="Clayton Harriers logo" loading="eager" />
            </a>
        )
    })

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/" passHref>
                    <CustomImage />
                </Link>

                <NavMenu mobileMenuOpen={mobileMenuIsOpen} setMobileMenuOpen={setMobileMenuIsOpen} menuData={menuData} />
            </header>
        </div>
    )
}