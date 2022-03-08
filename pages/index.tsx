import Head from 'next/head'
import Image from 'next/image'
import styles from './Home.module.css'
import bannerPic from '../public/clayton-runner-no-noise.png'
import { getMenuData, getPage } from '../utils/wordpress'
import pageIds from '../utils/wp-page-ids.json'
import Layout from '../components/layout'
import { MenuItem } from '../types/wordpress'

type Props = {
  content: string;
  menuData: MenuItem[];
}

export default function Home({ content, menuData }: Props) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Layout menuData={menuData}>
        <section className={styles.heroSection}>
          <div className={styles.bannerImage}>
            <Image src={bannerPic} alt="clayton runner landscape" />
          </div>

          <div className={styles.bannerTextContainer}>
            <h1>
              Clayton-Le-Moors Harriers
            </h1>

            <div className={styles.contentWrapper} dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const homePageInfoPromise = getPage(pageIds.new_home_page);
  const menuDataPromise = getMenuData();

  const [homePageInfo, menuData] = await Promise.all([homePageInfoPromise, menuDataPromise]);

  return {
    props: {
      content: homePageInfo.content.rendered,
      menuData
    }
  }
}
