import { useLayoutEffect, useRef, useState } from "react";
import Card from "../..";
import { Post } from "../../../../types/wordpress";
import styles from "./HorizontalScroller.module.css";

type Props = {
    posts: Post[];
}

export default function HorizontalCardScroller({ posts }: Props) {
    const [maxParagraphHeight, setMaxParagraphHeight] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if (containerRef.current) {
            const allParagraphs = [
                ...containerRef.current.querySelectorAll(":scope div p"),
            ]
            const maxHeight = Math.max(...allParagraphs.map(el => el.scrollHeight))

            setMaxParagraphHeight(maxHeight)
        }
    })

    return (
        <div className={styles.cardContainer} ref={containerRef}>
            {posts.map((post, index) => (
                <div className={styles.cardWrapper} key={`news-card=${index}`}>
                    <Card post={post} paragraphHeight={maxParagraphHeight} />
                </div>
            ))}
        </div>
    )
}