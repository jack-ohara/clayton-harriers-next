import { ReactNode } from "react"
import styles from "./MobileComponent.module.css"

interface Props {
    children: ReactNode
}

export default function MobileComponent({ children }: Props) {
    return <div className={styles.wrapper}>{children}</div>
}