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

export type MenuItem = {
    id: number;
    menuOrder: number;
    label: string;
    parentId?: number | undefined;
    childItems: MenuItem[];
    url: string;
}