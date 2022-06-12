import styles from "./DropdownArrow.module.css"

type Props = {
    hasActiveChild: boolean;
}

export default function DropdownArrow({ hasActiveChild }: Props): JSX.Element {
    return (
        <svg className={`${styles.dropdownArrow} ${hasActiveChild ? styles.isActiveRoute : ""}`}>
            <polygon points="0,0 0,8 8,4" />
        </svg>
    )
}