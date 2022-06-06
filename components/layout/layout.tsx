import styles from "./Layout.module.css";
import { MenuItem } from "../../types/wordpress";
import Header from "../header";
import Head from "next/head";

type Props = {
    children: JSX.Element | JSX.Element[];
    setMaxWidth?: boolean;
    menuData: MenuItem[];
    title: string;
}

export default function Layout({ children, setMaxWidth = true, title, menuData }: Props) {
    return (
        <>
            <Head>
                <title>{title} | Clayton-Le-Moors Harriers</title>
            </Head>
            <div className={styles.container}>
                <Header menuData={menuData} />
                <div className={styles.pageWrapper}>
                    <main style={{ maxWidth: setMaxWidth ? "var(--max-content-width)" : "unset" }} className={styles.contentWrapper}>
                        {children}
                    </main>
                    <footer className={styles.footer}>
                        <span>© {new Date().getFullYear()} Clayton-Le-Moors Harriers</span>
                        <span className={styles.plug}>Site designed and built by Jack O&apos;Hara</span>
                    </footer>
                </div>
            </div>
        </>
    )
}