import { PostDetails } from "../../types/wordpress"
import PostPreview from "./components/postPreview";
import styles from "./NewsPreviews.module.css"

type Props = {
    posts: PostDetails[];
}

export default function NewsPreviews({posts}: Props) {
    return (
        <div className={styles.contentWrapper}>
            {posts.map((post, idx) => (
                <PostPreview post={post} key={`news-post-preview-${idx}`} />
            ))}
        </div>
    )
}