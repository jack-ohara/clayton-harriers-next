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
                {/*
                    This image doesn't resolve when you navigate to deeper pages
                    becuase the leading slash disappears
                */}
                <img src={harriersLogo.src} className={styles.logoImage} alt="Clayton Harriers logo" loading="eager" />
            </a>
        )
    })

    CustomImage.displayName = "CustomImage"

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/">
                    <a>
                        <img src={harriersLogo.src} className={styles.logoImage} alt="Clayton Harriers logo" loading="eager" />
                    </a>
                </Link>

                <NavMenu mobileMenuOpen={mobileMenuIsOpen} setMobileMenuOpen={setMobileMenuIsOpen} menuData={menuData} />
            </header>
        </div>
    )
}