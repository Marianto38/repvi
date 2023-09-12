import axios from 'axios';

export async function editPostById(postId, newTitle, newBody) {

    const response = await axios.patch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
            title: newTitle,
            body: newBody
        },
        {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        }
    );
    return response.data;

}