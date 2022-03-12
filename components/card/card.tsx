import { Post } from "../../types/wordpress";
import styles from "./Card.module.css";
import CardBannerSVG from "../../public/card-banner.svg";
import HorizontalRule from "../horizontalRule";
import Link from "next/link";

type Props = {
    post: Post;
    paragraphHeight?: number | undefined;
}

export default function Card({ post: { title, slug, featuredImage, author, date, excerpt }, paragraphHeight }: Props) {
    const cardContent = (
        <article className={styles.cardContent}>
            <img
                src={featuredImage ? featuredImage.url : CardBannerSVG.src}
                alt={featuredImage ? featuredImage.altText : "Clayton-le-moors Harriers banner logo"}
                className={`${styles.cardImage} ${featuredImage ? styles.featuredImage : styles.bannerImage}`}
            />

            <div className={styles.cardBox}>
                <h4>{title}</h4>
                <h5>{author}</h5>
                <h5>{date}</h5>
                <HorizontalRule />
                <p className={styles.excerpt} style={{ height: paragraphHeight ?? "unset" }} dangerouslySetInnerHTML={{ __html: excerpt?.replace(" Continue reading →", "") ?? "" }} />
            </div>
        </article>
    )

    return slug ? (
        <Link href={slug} passHref>
            <a href={slug} className={styles.cardContainer}>{cardContent}</a>
        </Link>
    ) : (
        <div className={styles.cardContainer}>{cardContent}</div>
    )
}