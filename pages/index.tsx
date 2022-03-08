import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import bannerPic from '../public/clayton-runner-no-noise.png'
import { getPage } from '../utils/wordpress'
import pageIds from '../utils/wp-page-ids.json'
import Layout from '../components/layout'

type Props = {
  content: string;
}

export default function Home({ content }: Props) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Layout menuData={[{label: "Home", childItems: [], url: "/"}, {label: "Away", childItems: [], url: "/away"}]}>
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
  const homePageInfo = await getPage(pageIds.new_home_page);

  return {
    props: {
      content: homePageInfo.content.rendered
    }
  }
}
