
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const sortedByMostLiked = (blogs) => [...blogs].sort((a, b) => b.likes - a.likes);

const sortedByMostBlogsCreated = (users) => [...users].sort((a, b) => b.blogs.length - a.blogs.length);

const getUserId = () => {
    const user = localStorage.getItem("user");
    if (user) {
        const userParsed = JSON.parse(user);
        return userParsed.id;
    }
    return null;
};

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export {
    sortedByMostLiked,
    sortedByMostBlogsCreated,
    getUserId,
}