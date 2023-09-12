import axios from 'axios';

export async function getUserById(userId) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return response.data;
}
