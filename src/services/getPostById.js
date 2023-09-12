import axios from 'axios';

export async function getPostById(postId) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return response.data;
}
