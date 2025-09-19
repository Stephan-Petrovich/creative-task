export const fetchPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    return data;
};

export const fetchUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data.map((user: any) => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
    }));
};
