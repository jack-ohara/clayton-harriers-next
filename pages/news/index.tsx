import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useInView } from "react-intersection-observer"
import { getMenuData } from "../../utils/wordpress";
import { MenuItem } from "../../types/wordpress";
import PageHeader from "../../components/PageHeader";

const postsBlockSize = 10

type Props = {
    data: any;
    menuData: MenuItem[]
}

export default function NewsPage({ data, menuData }: Props) {
    // const [posts, setPosts] = useState(
    //     data.allWpPost.nodes.slice(0, postsBlockSize).map(e => mapCardFields(e))
    // )
    const [postsRevealed, setPostsRevealed] = useState(postsBlockSize)
    const [ref, inView] = useInView({})

    useEffect(() => {
        loadMorePosts()
    }, [inView])

    const loadMorePosts = () => {
        // let nextPosts = data.allWpPost.nodes.slice(
        //     postsRevealed,
        //     postsRevealed + postsBlockSize
        // )

        // nextPosts = nextPosts.map(e => mapCardFields(e))

        // setPosts(prevPosts => [...prevPosts, ...nextPosts])
        setPostsRevealed(prev => prev + postsBlockSize)
    }

    return (
        <Layout title="News &amp; Info" menuData={menuData}>
            <div>
                <PageHeader>News &amp; Info</PageHeader>

                {/* <NewsPreviews posts={posts} /> */}
            </div>

            <div ref={ref} />
        </Layout>
    )
}

export async function getStaticProps() {
    const menuData = await getMenuData()

    return {
        props: {
            menuData
        }
    }
}