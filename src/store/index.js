import { createStore } from 'vuex';
import localforage from 'localforage';
import modules from './modules';

const store = createStore({
  modules,
  getters: {
    activeAnimation: (state, getters) => {
      if (state.active === '') return {};

      return {
        ...getters['animation/active'],
        keyframes: getters['keyframe/active'],
        properties: getters['property/active'],
      };
    },
    data: (state) => ({
      animation: state.animation.entity,
      property: state.property.entity,
      keyframe: state.keyframe.entity,
    }),
  },
  state: () => ({
    showProperties: true,
    playing: false,
    active: '',
  }),
  mutations: {
    setState(state, { key, data }) {
      state[key] = data;
    },
    updateEntity(state, { key, data }) {
      state[key].entity = data;
    },
  },
  actions: {
    animationExample({ commit, state }) {
      const id = 'exmp';
      const defaultData = {
        property: {
          duration: 800,
          easing: 'cubic-bezier(.6,.05,.15,.95)',
          iterations: Infinity,
          direction: 'alternate',
          fill: 'backwards',
        },
        keyframe: {
          0: {
            transform: 'translate3d(0, 20px, 0) scale(1.2, 0.85)',
          },
          100: {
            transform: 'translate3d(0, -50px, 0) scale(0.9, 1.1)',
          },
        },
        animation: {
          html: '<div class="ball"></div>',
          css: '.ball { height: 50px; width: 50px; border-radius: 50%; background-color: #36b37e }',
          target: '.ball',
          description: 'Animation example',
          name: 'bounce',
          createdAt: Date.now(),
        },
      };

      Object.keys(defaultData).forEach((key) => {
        commit('updateEntity', {
          key,
          data: { [id]: defaultData[key] },
        });

        localforage.setItem(key, JSON.parse(JSON.stringify(state[key].entity)));
      });
    },
    async retrieveData({ commit, dispatch }) {
      const animations = await localforage.getItem('animation');
      commit('updateEntity', {
        key: 'animation',
        data: animations || {},
      });

      if (!animations) {
        dispatch('animationExample');
        return;
      }

      const properties = await localforage.getItem('property');
      commit('updateEntity', {
        key: 'property',
        data: properties || {},
      });

      const keyframes = await localforage.getItem('keyframe');
      commit('updateEntity', {
        key: 'keyframe',
        data: keyframes || {},
      });
    },
  },
});

export default store;
