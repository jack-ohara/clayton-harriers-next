import Link from "next/link";
import { PostDetails } from "../../../../types/wordpress"
import styles from "./PostPreview.module.css"
import BannerSVG from "../../../../public/card-banner.svg"
import Image from "next/image";

type Props = {
    post: PostDetails;
}

export default function PostPreview({ post }: Props) {
    const formatExcerpt = (
        excerpt: string | null
    ): JSX.Element | undefined => {
        return excerpt ? (
            <p>
                {excerpt?.replace("Continue reading →", "")}
                <br />
                <span className={styles.excerptContinueReading}>Continue reading →</span>
            </p>
        ) : undefined
    }

    return (
        <article className={styles.wrapper}>
            <Link href={post.slug} passHref>
                <a className={`${styles.link} ${post.featuredImage ? styles.postHasImage : ""}`}>
                    <div className={styles.infoArea}>
                        <h3>{post.title}</h3>
                        <h4>{post.author}</h4>
                        <h4>{new Date(post.date).toLocaleDateString("en-gb", { month: "short", day: "numeric", year: "numeric"})}</h4>
                    </div>

                    {formatExcerpt(post.excerpt)}

                    <div className={styles.postPreviewImage}>
                        {post.featuredImage ?
                            <Image
                                src={post.featuredImage.url}
                                alt={post.featuredImage.altText}
                                width={350}
                                height={250}
                                objectFit="cover"
                                objectPosition="top"
                            /> :
                            <img
                                src={BannerSVG.src}
                                alt="Clayton-le-moors Harriers banner logo"
                                width={320}
                                height={120}
                            />
                        }
                    </div>
                </a>
            </Link>
        </article>
    )
}