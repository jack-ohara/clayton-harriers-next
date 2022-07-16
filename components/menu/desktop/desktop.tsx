import { MenuItem } from "../../../types/wordpress";
import styles from "./DesktopMenu.module.css";
import { Fragment, useEffect, useRef, useState } from "react";
import isActiveRoute from "../../../utils/isActiveRoute";
import Link from "next/link";
import DropdownArrow from "./components/DropdownArrow";

type Props = {
    menuData: MenuItem[] | undefined;
}

export default function Menu({ menuData }: Props) {
    return (
        <nav className={styles.nav}>
            <ul>
                {menuData?.map(item => (
                    <Fragment key={`menu-item-${item.id}`}>
                        {item.childItems.length ? (
                            <DropdownMenuItem title={item.label} key={`dropdown-item-${item.id}`}>
                                {item.childItems.map(child => child.childItems.length ? (
                                    <InnerDropdownMenuItem
                                        title={child.label}
                                        key={`child-item-${child.id}`}
                                    >
                                        {child.childItems.map(innerChild => (
                                            <MenuItem
                                                key={`inner-child-item-${child.id}-${innerChild.id}`}
                                                to={innerChild.url}
                                                showBackgroundOnHover
                                                small
                                            >
                                                {innerChild.label}
                                            </MenuItem>
                                        ))}
                                    </InnerDropdownMenuItem>
                                ) : (
                                    <MenuItem
                                        key={`child-item-${child.id}`}
                                        to={child.url}
                                        showBackgroundOnHover
                                        small
                                    >
                                        {child.label}
                                    </MenuItem>
                                ))}
                            </DropdownMenuItem>
                        ) : (
                            <MenuItem key={`collapsable-item-${item.id}`} to={item.url}>
                                {item.label}
                            </MenuItem>
                        )}
                    </Fragment>
                ))}
            </ul>
        </nav>
    )
}

type DropdownMenuItemProps = {
    title: string
    children: JSX.Element | JSX.Element[]
}

function DropdownMenuItem({ title, children }: DropdownMenuItemProps) {
    const [hasActiveChild, setHasActiveChild] = useState(false)

    useEffect(() => {
        let allNestedChildren: JSX.Element[] | undefined

        if (Array.isArray(children)) {
            allNestedChildren = children

            for (const child of children) {
                if (Array.isArray(child.props.children) && child.props.children.length) {
                    allNestedChildren = allNestedChildren?.concat(child.props.children)
                }
            }

            setHasActiveChild(allNestedChildren.some(e => isActiveRoute(e.props.to)))
        } else {
            setHasActiveChild(isActiveRoute(children.props.to))
        }
    }, [hasActiveChild, children])

    return (
        <li className={styles.dropdown}>
            <div className={`${styles.navItemTitle} ${hasActiveChild ? styles.isActiveRoute : ""}`}>
                <DropdownArrow hasActiveChild={hasActiveChild} />
                {title}
            </div>
            <ul>{children}</ul>
        </li>
    )
}

type InnerDropdownMenuItemProps = {
    title: string;
    children: JSX.Element | JSX.Element[];
}

function InnerDropdownMenuItem({ title, children }: InnerDropdownMenuItemProps): JSX.Element {
    const [hasActiveChild, setHasActiveChild] = useState(false)

    const innerDropdownRef = useRef<HTMLLIElement>(null)
    const innerDropdownUlRef = useRef<HTMLUListElement>(null)
    const innerDropdownContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setHasActiveChild(
            Array.isArray(children)
                ? children.some(e => e && isActiveRoute(e.props.to))
                : isActiveRoute(children.props.to)
        )
    }, [hasActiveChild, children])

    useEffect(() => {
        if (!innerDropdownRef.current || !innerDropdownUlRef.current || !innerDropdownContainerRef.current) return

        innerDropdownUlRef.current.style.left = `${innerDropdownRef.current.clientWidth}px`
        innerDropdownContainerRef.current.style.width = `${innerDropdownRef.current.clientWidth + innerDropdownUlRef.current.clientWidth}px`
        innerDropdownContainerRef.current.style.height = `${innerDropdownUlRef.current.clientHeight}px`
    }, [innerDropdownRef, innerDropdownUlRef, innerDropdownContainerRef])

    return (
        <li className={styles.innerDropdown} ref={innerDropdownRef}>
            <div className={`${styles.navItemTitle} ${hasActiveChild ? styles.isActiveRoute : ""}`}>
                <DropdownArrow hasActiveChild={hasActiveChild} />
                {title}
            </div>
            <div className={styles.innerDropdownContainer} ref={innerDropdownContainerRef}>
                <ul ref={innerDropdownUlRef}>
                    {children}
                </ul>
            </div>
        </li>
    )
}

type MenuItemProps = {
    to: string;
    showBackgroundOnHover?: boolean;
    small?: boolean;
    children: string;
}

function MenuItem({
    to,
    showBackgroundOnHover = false,
    small = false,
    children,
}: MenuItemProps) {
    const [isActive, setIsActive] = useState(false)

    const dependencies: any[] = [to]
    if (typeof window !== "undefined") {
        dependencies.push(window.location.pathname)
    }

    useEffect(() => {
        setIsActive(isActiveRoute(to))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies)

    return (
        <li>
            <Link href={to}>
                <a
                    className={`${styles.menuLink} ${isActive ? styles.isActiveRoute : ""} ${showBackgroundOnHover ? styles.showBackground : ""} ${small ? styles.small : ""}`}
                >
                    {children}
                </a>
            </Link>
        </li>
    )
}