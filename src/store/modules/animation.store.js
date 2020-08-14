import shortid from 'shortid';

export default {
  state: () => ({
    entity: {},
  }),
  getters: {
    activeKey: (state, getters, rootState) => rootState.active,
    active: (state, getters) => state.entity[getters.activeKey] || {},
    getAnimations: (state) => {
      const animations = Object.keys(state.entity);

      if (animations.length === 0) return [];

      return animations.map((id) => ({
        ...state.entity[id],
        id,
      }));
    },
  },
  mutations: {
    updateAnimation(state, { activeKey, data }) {
      state.entity[activeKey] = {
        ...state.entity[activeKey],
        ...data,
      };
    },
    addAnimation(state, { key, data }) {
      state.entity[key] = {
        ...data,
        createdAt: Date.now(),
      };
    },
    deleteAnimation(state, key) {
      delete state.entity[key];
    },
  },
  actions: {
    update({ getters, commit }, data) {
      return new Promise((resolve) => {
        commit('updateAnimation', {
          data,
          activeKey: getters.activeKey,
        });
        resolve();
      });
    },
    add({ commit }, data) {
      return new Promise((resolve) => {
        const id = shortid.generate();

        commit('addAnimation', { key: id, data });
        commit('keyframe/addEntity', id, { root: true });
        commit('property/addEntity', id, { root: true });

        resolve();
      });
    },
    delete({ commit }, key) {
      return new Promise((resolve) => {
        commit('deleteAnimation', key);
        commit('keyframe/deleteEntity', key, { root: true });
        commit('property/deleteEntity', key, { root: true });

        resolve();
      });
    },
  },
};
