import axios from 'axios';

export async function getAllPosts() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return response.data
}

// Llamada a la función getAllPosts
getAllPosts();
