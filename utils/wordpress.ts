import { table } from "console";
import { MenuItem, Page } from "../types/wordpress";
import responseTypes from "../types/wordpress-responses";

export async function getPosts() {
  const postsRes = await fetchFromWordpress("posts?_embed");
  const posts = await postsRes.json();
  return posts;
}

export async function getPost(slug: string) {
  const posts = await getPosts();
  const postArray = posts.filter((post: any) => post.slug == slug);
  const post = postArray.length > 0 ? postArray[0] : null;
  return post;
}
export async function getEvents() {
  const eventsRes = await fetchFromWordpress("events?_embed");
  const events = await eventsRes.json();
  return events;
}

export async function getEvent(slug: string) {
  const events = await getEvents();
  const eventArray = events.filter((event: any) => event.slug == slug);
  const event = eventArray.length > 0 ? eventArray[0] : null;
  return event;
}

export async function getSlugs(type: "posts" | "events") {
  let elements = [];

  switch (type) {
    case "posts":
      elements = await getPosts();
      break;
    case "events":
      elements = await getEvents();
      break;
  }

  const elementsIds = elements.map((element: any) => {
    return {
      params: {
        slug: element.slug,
      },
    };
  });
  return elementsIds;
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
          url: item.url,
          childItems: [],
          parentId
        })
      } else {
        result.push({
          id: item.ID,
          label: item.title,
          menuOrder: item.menu_order,
          url: item.url,
          childItems: [],
          parentId: undefined
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

async function fetchFromWordpress(relativeURL: string) {
  if (!process.env.WP_BASE_URL) {
    throw new Error("Wordpress base URL not found in environment variable")
  }

  return await fetch(`${process.env.WP_BASE_URL}${relativeURL.startsWith('/') ? relativeURL : `/${relativeURL}`}`);
}