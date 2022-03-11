import { CSSProperties, MouseEventHandler } from "react";
import { Post } from "../../../../types/wordpress";
import styles from "./GridScroller.module.css";
import Slider from "react-slick"
import Card from "../..";

type Props = {
    posts: Post[];
}

export default function GridScroller({ posts }: Props) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
    }

    const batches = getPostBatches(posts)

    return (
        <Slider {...settings} className={styles.slider}>
            {batches.map((batch, idx) => (
                <div key={`grid-scroll-${idx}`}>
                    <div className={styles.cardContainer}>
                        {batch.map((post, index) => (
                            <Card post={post} key={`grid-scroll-card-$${index}`} />
                        ))}
                    </div>
                </div>
            ))}
        </Slider>
    )
}

type ArrowProps = {
    className?: string
    style?: CSSProperties | undefined
    onClick?: MouseEventHandler<HTMLDivElement> | undefined
}

function Arrow({ className, style, onClick }: ArrowProps) {
    return (
        <div
            className={`${styles.arrowContainer} ${className}`}
            style={{ ...style }}
            onClick={onClick}
            tabIndex={0}
        />
    )
}

function getPostBatches(posts: Post[]): Post[][] {
    let result: Post[][] = new Array<Array<Post>>()

    for (let index = 0; index < posts.length; index += 4) {
        result.push(posts.slice(index, index + 4))
    }

    return result
}