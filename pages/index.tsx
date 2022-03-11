import Image from 'next/image'
import styles from './Home.module.css'
import bannerPic from '../public/clayton-runner-no-noise.png'
import { getMenuData, getPage, getRecentPosts } from '../utils/wordpress'
import pageIds from '../utils/wp-page-ids.json'
import Layout from '../components/layout'
import { MenuItem, Post } from '../types/wordpress'
import CardScroller from '../components/card/cardScroller'

type Props = {
  content: string;
  menuData: MenuItem[];
  recentPostsData: Post[];
}

export default function Home({ content, menuData, recentPostsData }: Props) {
  return (
    <Layout menuData={menuData} setMaxWidth={false} title="Home">
      <section className={styles.heroSection}>
        <div className={styles.bannerImage}>
          <Image src={bannerPic} alt="clayton runner landscape" layout='intrinsic' />
        </div>

        <div className={styles.bannerTextContainer}>
          <h1>
            Clayton-Le-Moors Harriers
          </h1>

          <div className={styles.contentWrapper} dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </section>

      <div className={styles.latestUpdates}>
        <CardScroller title="Latest Updates" posts={recentPostsData} />
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const homePageInfoPromise = getPage(pageIds.new_home_page);
  const menuDataPromise = getMenuData();
  const recentPostsPromise = getRecentPosts();

  const [homePageInfo, menuData, recentPostsData] = await Promise.all([homePageInfoPromise, menuDataPromise, recentPostsPromise]);

  return {
    props: {
      content: homePageInfo.content.rendered,
      menuData,
      recentPostsData
    }
  }
}
