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
                        {item.childItems.map(child => child.childItems.length ? (
                            <CollapsableMenuItem
                                key={`child-item-${item.label}-${child.label}`}
                                title={child.label}
                                resetOpen={!isOpen}
                            >
                                {child.childItems.map(innerChild => (
                                    <SingleMenuItem
                                        key={`inner-child-item-${item.label}-${child.label}-${innerChild.label}`}
                                        title={innerChild.label}
                                        to={innerChild.url}
                                        closeFunction={closeMenuFunction}
                                        small
                                    />
                                ))}
                            </CollapsableMenuItem>

                        ) : (
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
        let allNestedChildren: JSX.Element[] | undefined

        if (Array.isArray(children)) {
            allNestedChildren = children

            for (const child of children) {
                if (child.props.children?.length) {
                    allNestedChildren = allNestedChildren?.concat(child.props.children)
                }
            }

            setHasActiveChild(allNestedChildren.some(e => isActiveRoute(e.props.to)))
        } else {
            setHasActiveChild(isActiveRoute(children.props.to))
        }
    }, [children])

    useEffect(() => {
        setIsOpen(hasActiveChild)
    }, [resetOpen, children, hasActiveChild])

    const reEvaluateScrollHeight = (): void => {
        if (subItems.current) {
            setScrollHeight(
                [...subItems.current.children].reduce((acc, curr) => acc + curr.scrollHeight, 0)
            )
        }
    }

    return (
        <>
            <button className={`${styles.navButton} ${isOpen ? styles.open : ""} ${hasActiveChild ? styles.hasActiveChild : ""}`}
                onClick={() => {
                    reEvaluateScrollHeight()
                    setIsOpen(!isOpen)
                }}
            >
                {title}
                <span>
                    <div />
                    <div />
                </span>
            </button>
            <div className={styles.subItemsContainer} style={{ maxHeight: isOpen ? scrollHeight : 0 }} ref={subItems} onClick={reEvaluateScrollHeight}>
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

    const dependencies: any[] = [to]
    if (typeof window !== "undefined") {
        dependencies.push(window.location.pathname)
    }

    useEffect(() => {
        setIsActive(isActiveRoute(to))
    }, dependencies)

    return (
        <StyledLink
            href={to}
            isActiveRoute={isActive}
            small={small}
            onClick={() => closeFunction()}
            className={styles.navButton}
        >
            {title}
        </StyledLink>
    )
}