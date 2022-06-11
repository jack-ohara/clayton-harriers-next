import Link, { LinkProps } from "next/link"
import styles from "./StyledLink.module.css"

type Props = React.PropsWithChildren<LinkProps> & {
  small: boolean;
  isActiveRoute: boolean;
  onClick: () => void;
  className?: string | undefined;
}

export default function StyledLink({ small, isActiveRoute, onClick, children, className, ...rest }: Props) {
  return (
    <Link {...rest} passHref>
      <a
        className={`${className} ${styles.styledLink} ${small ? styles.small : ""} ${isActiveRoute ? styles.isActiveRoute : ""}`}
        onClick={onClick}
      >
        {children}
      </a>
    </Link>
  )
}
