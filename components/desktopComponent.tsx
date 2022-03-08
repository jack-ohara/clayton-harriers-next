import { ReactNode } from "react"
import styles from "../styles/DesktopComponent.module.css"

interface Props {
    children: ReactNode
}

export default function DesktopComponent({ children }: Props) {
    return <div className={styles.wrapper}>{children}</div>
}