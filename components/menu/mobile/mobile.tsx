import { Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from "react"
import { MenuItem } from "../../../types/wordpress"
import styles from "./MobileMenu.module.css"
import isActiveRoute from "../../../utils/isActiveRoute"
import StyledLink from "../../styledLink"

type Props = {
    menuData: MenuItem[] | undefined;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Menu({ menuData, isOpen, setIsOpen }: Props) {
    const navRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (event.target instanceof Node) {
                const wasMenuButtonClick = document
                    .querySelector("#menu-burger-button")
                    ?.contains(event.target)

                if (!wasMenuButtonClick && !navRef.current?.contains(event.target)) {
                    setIsOpen(false)
                }
            }
        }

        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    })

    const closeMenuFunction = () => {
        setIsOpen(false)
    }

    const menuItems = menuData && getMenuItems(menuData.filter((item) => !item.parentId), closeMenuFunction, isOpen);

    return (
        <nav className={`${styles.navMenu} ${isOpen ? styles.open : ""}`} ref={navRef}>
            {menuItems}
        </nav>
    )
}

const getMenuItems = (menuItems: MenuItem[], closeMenuFunction: () => void, isOpen: boolean) => {
    return menuItems ? menuItems.map(item => {
        return (
            <Fragment key={`menu-item-${item.label}`}>
                {item.childItems.length ? (
                    <CollapsableMenuItem
                        title={item.label}
                        resetOpen={!isOpen}
                        key={`collapsable-item-${item.label}`}
                    >
                        {item.childItems.map(child => (
                            <SingleMenuItem
                                key={`child-item-${item.label}-${child.label}`}
                                title={child.label}
                                to={child.url}
                                closeFunction={closeMenuFunction}
                                small
                            />
                        ))}
                    </CollapsableMenuItem>
                ) : (
                    <SingleMenuItem
                        key={`collapsable-item-${item.label}`}
                        title={item.label}
                        to={item.url}
                        closeFunction={closeMenuFunction}
                    />
                )}

                <hr className={styles.itemDivider} />
            </Fragment>
        )
    }) : [];
}

type CollapsableMenuItemProps = {
    title: string;
    children: JSX.Element | JSX.Element[];
    resetOpen: boolean;
}

const CollapsableMenuItem = ({ title, children, resetOpen }: CollapsableMenuItemProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrollHeight, setScrollHeight] = useState<number>()
    const [hasActiveChild, setHasActiveChild] = useState(false)
    const subItems = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setHasActiveChild(Array.isArray(children)
            ? children.some(e => isActiveRoute(e.props.to))
            : isActiveRoute(children.props.to)
        )
    }, [children])

    useEffect(() => {
        setIsOpen(hasActiveChild)
    }, [resetOpen, children])

    return (
        <>
            <button className={`${styles.navButton} ${isOpen ? styles.open : ""} ${hasActiveChild ? styles.hasActiveChild : ""}`}
                onClick={() => {
                    if (subItems.current) {
                        setScrollHeight(subItems.current.scrollHeight)
                    }
                    setIsOpen(!isOpen)
                }}
            >
                {title}
                <span>
                    <div />
                    <div />
                </span>
            </button>
            <div className={styles.subItemsContainer} style={{ maxHeight: isOpen ? scrollHeight : 0 }} ref={subItems}>
                {children}
            </div>
        </>
    )
}

type MenuItemProps = {
    title: string;
    to: string;
    small?: boolean;
    closeFunction: () => void;
}

const SingleMenuItem = ({ title, to, small = false, closeFunction }: MenuItemProps) => {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        setIsActive(isActiveRoute(to))
    }, [to])

    return (
        <StyledLink
            href={to}
            isActiveRoute={isActive}
            small={small}
            onClick={() => {
                isActive && closeFunction()
            }}
        >
            {title}
        </StyledLink>
    )
}