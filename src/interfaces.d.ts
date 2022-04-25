export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface Post {
    userid: number;
    id: number;
    title: string;
    body: string;
}

export interface Todos {
    userid: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface PostWithComment {
    post: Post;
    comments: Array<Comment> | null;
}

export interface ViewPost {
    view: boolean; // Boolean value for controlling the opening and closing of posts
    post: PostWithComment; // The post which need to be displayed
    index: number; // Index value passed for updating the post array in O(1) time
}
