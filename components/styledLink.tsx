import Link, { LinkProps } from "next/link"
import styles from "../styles/StyledLink.module.css"

type Props = React.PropsWithChildren<LinkProps> & {
  small: boolean;
  isActiveRoute: boolean;
  onClick: () => void;
}

export default function StyledLink({ small, isActiveRoute, onClick, children, ...rest }: Props) {
  return (
    <Link {...rest}>
      <a
        className={`${styles.styledLink} ${small ? styles.small : ""} ${isActiveRoute ? styles.isActiveRoute : ""}`}
        onClick={onClick}
      >
        {children}
      </a>
    </Link>
  )
}
