import { ref } from 'vue';

const getPost = (id) => {
  const post = ref(null);
  const error = ref(null);

  const load = async () => {
    try {
      const data = await fetch('http://localhost:3000/posts/' + id);
      post.value = await data.json();
      if (!data.ok) {
        throw Error('that post dose not exist');
      }
    } catch (err) {
      error.value = err.message;
    }
  };

  return { post, error, load };
};

export default getPost;
