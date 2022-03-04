export type Post = {
    id: number;
    slug: string;
    type: string;
    title: {
        rendered: string;
    }
    content: {
        rendered: string;
    }
}

export type Page = Post;