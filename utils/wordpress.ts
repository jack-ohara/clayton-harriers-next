import { MenuItem, Page, Post } from "../types/wordpress";
import responseTypes from "../types/wordpress-responses";
import { JSDOM } from "jsdom";

const urlReplace = `^(${process.env.WP_BASE_URL})`;
const urlRegRx = new RegExp(urlReplace);

export async function getRecentPosts() {
  const recentPostsRaw = await fetchFromWordpress('posts?_embed&per_page=12&order=desc&status=publish');

  const recentPosts = await recentPostsRaw.json() as responseTypes.Post[];

  return mapPostsResponseToDomain(recentPosts);
}

export async function getPage(id: number) {
  const page = await fetchFromWordpress(`pages/${id}`);

  return await page.json() as Page;
}

export async function getMenuData(): Promise<MenuItem[]> {
  const menuDataRaw = await fetchFromWordpress("new-menu");

  const menuData = await menuDataRaw.json() as responseTypes.MenuItem[];

  return mapMenuResponseToDomain(menuData);
}

function mapPostsResponseToDomain(responseItems: responseTypes.Post[]): Post[] {
  return responseItems.map(item => (
    {
      id: item.id,
      slug: item.link.replace(urlRegRx, ''),
      type: item.type,
      date: item.date_gmt,
      title: extractTextFromHtml(item.title.rendered),
      content: extractTextFromHtml(item.content.rendered),
      excerpt: extractTextFromHtml(item.excerpt.rendered),
      author: item._embedded.author[0].name,
      featuredImage: item._embedded["wp:featuredmedia"] ? {
        url: item._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large?.source_url ?? item._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url,
        altText: item._embedded["wp:featuredmedia"][0].alt_text ?? extractTextFromHtml(item._embedded["wp:featuredmedia"][0].title.rendered)
      } : null
    }
  ))
}

function mapMenuResponseToDomain(responseItems: responseTypes.MenuItem[]): MenuItem[] {
  const result: MenuItem[] = [];
  let itemsToAllocate = responseItems;

  let atLeastOneItemAdded: boolean;

  do {
    atLeastOneItemAdded = false;
    const itemsNotPlaced: responseTypes.MenuItem[] = [];

    for (const item of itemsToAllocate) {
      const parentId = parseInt(item.menu_item_parent);

      if (parentId) {
        let parent: MenuItem | undefined;

        for (const placedItem of result) {
          parent = tryGetParent(placedItem, parentId);

          if (parent) break;
        }

        if (!parent) {
          itemsNotPlaced.push(item);

          continue;
        };

        parent.childItems.push({
          id: item.ID,
          label: item.title,
          menuOrder: item.menu_order,
          url: item.url.replace(urlRegRx, ''),
          childItems: [],
          parentId
        })
      } else {
        result.push({
          id: item.ID,
          label: item.title,
          menuOrder: item.menu_order,
          url: item.url.replace(urlRegRx, ''),
          childItems: []
        })
      }

      atLeastOneItemAdded = true;
    }

    itemsToAllocate = itemsNotPlaced;
  } while (atLeastOneItemAdded)

  result.forEach(sortChildren)

  return result.sort((a, b) => a.menuOrder > b.menuOrder ? 1 : -1);
}

/**
 * Will return the item itself if it is the parent, or the child item
 * if it is a nested child (will keep checking all the way down the chain)
 * @param itemToCheck 
 * @param targetParentItem 
 */
function tryGetParent(itemToCheck: MenuItem, targetParentItem: number): MenuItem | undefined {
  if (itemToCheck.id === targetParentItem) return itemToCheck;

  for (const child of itemToCheck.childItems) {
    const resultFromChild = tryGetParent(child, targetParentItem);

    if (resultFromChild) return resultFromChild;
  }
}

function sortChildren(item: MenuItem): void {
  if (item.childItems.length) {
    item.childItems.sort((a, b) => a.menuOrder > b.menuOrder ? 1 : -1);

    item.childItems.forEach(sortChildren);
  }
}

function extractTextFromHtml(html: string): string {
  return new JSDOM(html).window.document.querySelector("*")?.textContent ?? "";
}

async function fetchFromWordpress(relativeURL: string) {
  if (!process.env.WP_JSON_ENDPOINT_BASE_URL) {
    throw new Error("Wordpress base URL not found in environment variable")
  }

  return await fetch(`${process.env.WP_JSON_ENDPOINT_BASE_URL}${relativeURL.startsWith('/') ? relativeURL : `/${relativeURL}`}`);
}