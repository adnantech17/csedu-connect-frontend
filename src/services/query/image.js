import axios from 'axios';

export async function uploadImage(file) {
  if (!file) return '';
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(
      'https://api.imgbb.com/1/upload?key=dba11ea3f38c1eb8288d6436e0d89413',
      formData,
    );
    return response.data.data.url;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to upload image');
  }
}
