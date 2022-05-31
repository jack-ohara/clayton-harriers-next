import Link from "next/link";
import { FeaturedImage } from "../../../types/wordpress";
import styles from "./SimpleNavCard.module.css"

type Props = {
    title: string;
    featuredImage: FeaturedImage | undefined;
    slug: string;
    className?: string | undefined; // Not yet used - can implement when needed
}

export default function SimpleNavCard({ title, featuredImage, slug }: Props): JSX.Element {
    return (
        <Link href={slug} passHref>
            <a className={styles.styledLink}>
                <span className={styles.headingContainer}>
                    <h3 className={styles.cardHeading}>{title}</h3>
                </span>
                {featuredImage && <img className={styles.cardImage} src={featuredImage.url} alt={featuredImage.altText} />}
            </a>
        </Link>
    )
}