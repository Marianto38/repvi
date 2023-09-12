import axios from 'axios';

export async function deletePostById(postId) {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  return response.data;
}
