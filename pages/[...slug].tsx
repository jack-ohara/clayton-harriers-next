import { GetStaticPathsResult, GetStaticPropsContext } from "next";
import Layout from "../components/layout";
import PageHeader from "../components/PageHeader";
import { MenuItem, Page, Post } from "../types/wordpress";
import { getMenuData, getPage, getPageBySlug, getPages, getPostBySlug, getPosts } from "../utils/wordpress";
import styles from "./slug/Slug.module.css"

type Props = {
  content: string;
  title: string;
  menuData: MenuItem[];
}

export default function Slug({ content, title, menuData }: Props) {
  return (
    <Layout title={title} menuData={menuData}>
      <section className={styles.templateWrapper}>
        <PageHeader>{title}</PageHeader>

        <div dangerouslySetInnerHTML={{ __html: content }} />
      </section>
    </Layout>
  )
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const allPagesPromise = getPages();
  const allPostsPromise = getPosts();

  const [allPages, allPosts] = await Promise.all([allPagesPromise, allPostsPromise])

  let paths = allPages.map((page) => ({ params: { slug: page.slug.split('/').filter(e => e) } }))
  paths = paths.concat(allPosts.map((post) => ({ params: { slug: post.slug.split('/').filter(e => e) } })))

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = params?.slug as string[];
  const entityPromise = getEntityBySlug(slug.join('/'))
  const menuDataPromise = getMenuData();

  const [menuData, entity] = await Promise.all([menuDataPromise, entityPromise])

  return {
    props: {
      menuData,
      title: entity?.title ?? '',
      content: entity?.content ?? ''
    }
  }
}

async function getEntityBySlug(slug: string): Promise<Page | Post | undefined> {
  const post = await getPostBySlug(slug)

  if (post) return post

  const page = await getPageBySlug(slug)

  if (!page) {
    console.error(`Entity not found for slug: ${slug}`)
  }

  return page
}