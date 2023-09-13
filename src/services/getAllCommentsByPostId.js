import axios from 'axios';

export async function getAllCommentsByPostId(postId) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    return response.data;
}
