import { MenuItem } from "../../../types/wordpress";
import styles from "../../../styles/DesktopMenu.module.css";
import { Fragment } from "react";
import isActiveRoute from "../../../utils/isActiveRoute";
import Link from "next/link";

type Props = {
    menuData: MenuItem[];
}

export default function Menu({ menuData }: Props) {
    return (
        <nav className={styles.nav}>
            <ul>
                {menuData.map(item => (
                    <Fragment key={`menu-item-${item.id}`}>
                        {item.childItems.length ? (
                            <DropdownMenuItem title={item.label} key={`dropdown-item-${item.id}`}>
                                {item.childItems.map(child => (
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
    const hasActiveChild = Array.isArray(children)
        ? children.some(e => e && isActiveRoute(e.props.to))
        : isActiveRoute(children.props.to)

    return (
        <li className={styles.dropdown}>
            <div className={`${styles.navItemTitle} ${hasActiveChild ? styles.isActiveRoute : ""}`}>
                <svg className={`${styles.dropdownArrow} ${hasActiveChild ? styles.isActiveRoute : ""}`}>
                    <polygon points="0,0 0,8 8,4" />
                </svg>
                {title}
            </div>
            <ul>{children}</ul>
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
    const isActive = isActiveRoute(to)

    return (
        <li>
            <Link href={to}>
                <a className={`${styles.menuLink} ${isActive ? styles.isActiveRoute : ""} ${showBackgroundOnHover ? styles.showBackground : ""} ${small ? styles.small : ""}`}>
                    {children}</a>
            </Link>
        </li>
    )
}