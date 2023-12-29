const sortedByMostLiked = (blogs) => [...blogs].sort((a, b) => b.likes - a.likes);

const getUserId = () => {
    const user = localStorage.getItem("user");
    if (user) {
        const userParsed = JSON.parse(user);
        return userParsed.id;
    }
    return null;
};

export {
    sortedByMostLiked,
    getUserId,
}