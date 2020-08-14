<template>
  <div class="home">
    <div class="bg-default flex items-center h-16 px-6">
      <input-ui
        icon="mdi-magnify"
        placeholder="Search animation"
        hide-details
        width="150px"
        v-model="state.search"
      ></input-ui>
      <div class="flex-grow"></div>
      <button-ui @click="changeActiveSort">
        <v-mdi name="mdi-sort" size="20"></v-mdi>
        <span class="ml-2 capitalize">{{ state.sortBy }}</span>
      </button-ui>
    </div>
    <div class="p-6 container">
      <h4 class="text-2xl font-semibold mb-6" v-show="animations.length !== 0">
        Animations
      </h4>
      <div class="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        <card-ui
          v-for="animation in animations"
          :key="animation.id"
          hover
          class="cursor-pointer"
          @click="openAnimation(animation.id)"
        >
          <h4 class="font-semibold text-overflow">{{ animation.name }}</h4>
          <p class="text-light line-clamp leading-tight h-10">
            {{ animation.description }}
          </p>
          <div class="mt-5 flex items-center">
            <p class="text-lighter flex-1">
              <v-mdi name="mdi-calendar"></v-mdi>
              <span class="ml-1">{{ formatDate(animation.createdAt) }}</span>
            </p>
            <v-mdi
              @click.stop="deleteAnimation(animation)"
              title="Delete animation"
              name="mdi-delete"
              class="text-danger"
            ></v-mdi>
          </div>
        </card-ui>
      </div>
      <p
        class="text-xl text-center mt-8 text-light"
        v-show="animations.length === 0"
      >
        Add your first animation
      </p>
    </div>
  </div>
</template>
<script>
import { computed, shallowReactive } from 'vue';
import { useRouter } from 'vue-router';
import store from '~/store';

export default {
  setup() {
    const router = useRouter();
    const state = shallowReactive({
      search: '',
      sortBy: 'latest',
      sorts: ['latest', 'oldest'],
    });
    const sortAnimationData = (data, order = 'latest') => data.sort((a, b) => {
      let comparison = 0;

      if (a.createdAt > b.createdAt) comparison = 1;
      else if (a.createdAt < b.createdAt) comparison = -1;

      return (
        (order === 'latest') ? (comparison * -1) : comparison
      );
    });
    const animations = computed(() => {
      const filtered = store.getters['animation/getAnimations'].filter((animation) => (
        animation.name.toLowerCase().match(state.search.toLowerCase())
      ));

      return sortAnimationData(filtered, state.sortBy);
    });
    const formatDate = (createdAt) => {
      const date = new Date(createdAt);
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      return `${date.getDate()} ${months[date.getMonth()]}`;
    };

    return {
      state,
      animations,
      formatDate,
      changeActiveSort: () => {
        state.sortBy = state.sortBy === 'latest' ? 'oldest' : 'latest';
      },
      openAnimation: (animationId) => {
        store.commit('setState', {
          key: 'active',
          data: animationId,
        });

        router.push('/editor');
      },
      deleteAnimation: ({ id, name }) => {
        /* eslint-disable-next-line */
        const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);

        if (confirmDelete) {
          store.dispatch('animation/delete', id);
        }
      },
    };
  },
};
</script>
