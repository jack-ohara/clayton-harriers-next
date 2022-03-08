import styles from "../../../styles/BurgerButton.module.css"

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BurgerButton({ isOpen, setIsOpen }: Props) {
    return (
        <button
            aria-label="menu button"
            className={`${styles.burger} ${isOpen ? styles.open : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            id="menu-burger-button"
        >
            <div />
            <div />
            <div />
        </button>
    )
}