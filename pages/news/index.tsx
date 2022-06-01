import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useInView } from "react-intersection-observer"
import { getMenuData, getPostDetails } from "../../utils/wordpress";
import { MenuItem, PostDetails } from "../../types/wordpress";
import PageHeader from "../../components/PageHeader";
import NewsPreviews from "../../components/newsPreviews";

const postsBlockSize = 10

type Props = {
    menuData: MenuItem[];
    postDetails: PostDetails[];
}

export default function NewsPage({ menuData, postDetails }: Props) {
    const [posts, setPosts] = useState(
        postDetails.slice(0, postsBlockSize) //.map(e => mapCardFields(e))
    )
    const [postsRevealed, setPostsRevealed] = useState(postsBlockSize)
    const [ref, inView] = useInView({})

    useEffect(() => {
        loadMorePosts()
    }, [inView])

    const loadMorePosts = () => {
        let nextPosts = postDetails.slice(
            postsRevealed,
            postsRevealed + postsBlockSize
        )

        // nextPosts = nextPosts.map(e => mapCardFields(e))

        setPosts(prevPosts => [...prevPosts, ...nextPosts])
        setPostsRevealed(prev => prev + postsBlockSize)
    }

    return (
        <Layout title="News &amp; Info" menuData={menuData}>
            <div>
                <PageHeader>News &amp; Info</PageHeader>

                <NewsPreviews posts={posts} />
            </div>

            <div ref={ref} />
        </Layout>
    )
}

export async function getStaticProps() {
    const menuDataPromise = getMenuData()
    const allPostsDetailsPromise = getPostDetails()

    const [menuData, allPostDetails] = await Promise.all([menuDataPromise, allPostsDetailsPromise])

    return {
        props: {
            menuData,
            postDetails: allPostDetails
        }
    }
}