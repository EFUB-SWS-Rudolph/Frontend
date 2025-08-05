import { client } from './client';

export const postLecture = async (formData) => {
  try {
    console.log('FormData 내용 출력:', formData);
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await client.post('/course', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(response, 'success');
    return response;
  } catch (err) {
    console.error(err);
  }
};
