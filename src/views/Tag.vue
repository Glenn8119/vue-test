<template>
  <div class="tag">
    <div v-if="error">{{ error }}</div>
    <div v-if="targetPosts.length" class="layout">
      <PostList :posts="targetPosts" />
      <TagCloud :posts="posts" />
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import getPosts from '../composables/getPosts';
import { useRoute } from 'vue-router';
import { computed } from '@vue/runtime-core';
import Spinner from '../components/Spinner.vue';
import PostList from '../components/PostList';
import TagCloud from '../components/TagCloud';

export default {
  components: { Spinner, PostList, TagCloud },
  setup() {
    const { posts, error, load } = getPosts();
    load();
    const route = useRoute();

    const targetPosts = computed(() => {
      return posts.value.filter((post) => post.tags.includes(route.params.tag));
    });
    console.log(targetPosts);

    return { posts, error, targetPosts };
  },
};
</script>

<style>
.tag {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
</style>
