import axios from 'axios';

export const createPost = async (postData) => {
  
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', postData, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });

    return response.data;
  
};

