import { ReactNode } from "react"
import styles from "./PageHeader.module.css"

type Props = {
    children: ReactNode;
    className?: string;
}

export default function PageHeader({children, className = ""}: Props) {
    return <h2 className={`${styles.pageHeader} ${className}`}>{children}</h2>
}