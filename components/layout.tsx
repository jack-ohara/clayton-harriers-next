import { ReactNode } from "react"
import styles from "../styles/Layout.module.css";
import { MenuItem } from "../types/wordpress";
import Header from "./header";

type Props = {
    children: ReactNode;
    setMaxWidth?: boolean;
    menuData: MenuItem[];
}

export default function Layout({children, setMaxWidth = true, menuData}: Props) {
    return (
        <div className={styles.container}>
            <Header menuData={menuData} />
            <div className={styles.pageWrapper}>
                <main style={{maxWidth: setMaxWidth ? "var(--max-content-width)" : "unset"}} className={styles.contentWrapper}>
                    {children}
                </main>
                <footer className={styles.footer}>© {new Date().getFullYear()} Clayton-Le-Moors Harriers</footer>
            </div>
        </div>
    )
}