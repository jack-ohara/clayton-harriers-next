import { Page } from "../types/wordpress";

export async function getPosts() {
  const postsRes = await fetch(process.env.WP_BASE_URL + "/posts?_embed");
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
  const eventsRes = await fetch(process.env.WP_BASE_URL + "/events?_embed");
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

async function fetchFromWordpress(relativeURL: string) {
  if (!process.env.WP_BASE_URL) {
    throw new Error("Wordpress base URL not found in environment variable")
  }

  return await fetch(`${process.env.WP_BASE_URL}${relativeURL.startsWith('/') ? relativeURL : `/${relativeURL}`}`);
}