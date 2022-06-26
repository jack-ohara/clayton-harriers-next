import { GetStaticPathsResult, GetStaticPropsContext } from "next";
import Layout from "../components/layout";
import PageHeader from "../components/PageHeader";
import { MenuItem, Page, Post } from "../types/wordpress";
import { getMenuData, getPageBySlug, getPageSlugs, getPostBySlug, getPostSlugs } from "../utils/wordpress";
import pathsToIgnore from "../utils/paths-to-ignore.json"
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
  const slugs = [...await getStaticPostSlugs(), ...await getStaticPageSlugs()]

  return {
    paths: slugs,
    fallback: false
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
  console.log(`Finding entity with slug ${slug}`)
  const page = await getPageBySlug(slug)

  if (page) return page

  const post = await getPostBySlug(slug)

  if (post) return post

  if (!post) {
    console.error(`Entity not found for slug: ${slug}`)
  }

  return post
}

async function getStaticPostSlugs(): Promise<{ params: { slug: string[]; }; }[]> {
  const postSlugs = await getPostSlugs();

  return postSlugs
    .filter(s => s.length && !pathsToIgnore.includes(s))
    .map((slug) => ({
      params: {
        slug: slug.split('/')
      }
    }))
}

async function getStaticPageSlugs(): Promise<{ params: { slug: string[]; }; }[]> {
  const pageSlugs = await getPageSlugs();

  return pageSlugs
    .filter(s => s.length && !pathsToIgnore.includes(s))
    .map((slug) => ({
      params: {
        slug: slug.split('/')
      }
    }))
}