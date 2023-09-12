import axios from 'axios';

export async function getUserPosts(userId) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return response.data;
}
