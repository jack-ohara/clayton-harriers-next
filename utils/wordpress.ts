import { MenuItem, Page, PageDetails, Post, PostDetails } from "../types/wordpress";

export async function getRecentPosts() {
  const recentPostsRaw = await fetchFromWordpress('recent-posts');

  return await recentPostsRaw.json() as Post[];
}

export async function getPage(id: number): Promise<Page> {
  const page = await fetchFromWordpress(`page/${id}`);

  return await page.json() as Page;
}

export async function getPageBySlug(slug: string): Promise<Page | undefined> {
  const response = await fetchFromWordpress(`page?slug=${encodeURIComponent(slug)}`)

  return await response.json() as Page
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const response = await fetchFromWordpress(`post?slug=${encodeURIComponent(slug)}`)

  const post = await response.json() as Post

  return post.id ? post : undefined
}

export async function getPostSlugs(): Promise<string[]> {
  const response = await fetchFromWordpress('post-slugs')

  return await response.json() as string[]
}

export async function getPageSlugs(): Promise<string[]> {
  const response = await fetchFromWordpress('page-slugs')

  return await response.json() as string[]
}

export async function getMenuData(): Promise<MenuItem[]> {
  const menuDataRaw = await fetchFromWordpress("menu");

  return await menuDataRaw.json() as MenuItem[];
}

export async function getPostDetails() {
  const postDetailsRaw = await fetchFromWordpress("post-details")

  return await postDetailsRaw.json() as PostDetails[]
}

export async function getChildPageDetails(parentSlug: string) {
  const childPageDetailsRaw = await fetchFromWordpress(`child-page-details?parentSlug=${encodeURIComponent(parentSlug)}`)

  return await childPageDetailsRaw.json() as PageDetails[]
}

async function fetchFromWordpress(relativeURL: string, retryCount: number = 5): Promise<Response> {
  if (!process.env.WP_CONTENT_BASE_URL) {
    throw new Error("WP content base URL not found in environment variable")
  }

  const url = `${process.env.WP_CONTENT_BASE_URL}${relativeURL.startsWith('/') ? relativeURL : `/${relativeURL}`}`;

  try {
    return await fetch(url);
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
    console.log(url)

    if (retryCount > 0) {
      await new Promise(resolve => setTimeout(resolve, 5000))
      return fetchFromWordpress(relativeURL, retryCount - 1)
    }

    console.error(`Failed to call ${url}`)

    throw e
  }
}