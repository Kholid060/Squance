export default {
  state: () => ({
    entity: {},
    active: 0,
  }),
  getters: {
    activeKey: (state, getters, rootState) => rootState.active,
    active: (state, getters) => state.entity[getters.activeKey] || {},
    activeKeyframe: (state, getters) => state.entity[getters.activeKey][state.active],
  },
  mutations: {
    activeKeyframe(state, keyframe) {
      state.active = keyframe;
    },
    addKeyframe(state, { activeKey, key, data }) {
      state.entity[activeKey][key] = data;
    },
    updateKeyframe(state, { activeKey, data }) {
      state.entity[activeKey][state.active] = {
        ...state.entity[activeKey][state.active],
        ...data,
      };
    },
    deleteKeyframe(state, { activeKey, key }) {
      state.active = 0;
      delete state.entity[activeKey][key];
    },
    deleteProperty(state, { activeKey, key }) {
      delete state.entity[activeKey][state.active][key];
    },
    addEntity(state, key) {
      state.entity[key] = { 0: {} };
    },
    deleteEntity(state, key) {
      delete state.entity[key];
    },
  },
  actions: {
    add({ getters, commit }, key) {
      return new Promise((resolve) => {
        commit('addKeyframe', {
          activeKey: getters.activeKey,
          data: {},
          key,
        });
        resolve();
      });
    },
    update({ getters, commit }, data) {
      return new Promise((resolve) => {
        commit('updateKeyframe', {
          data,
          activeKey: getters.activeKey,
        });
        resolve();
      });
    },
    delete({ getters, commit, state }, key) {
      return new Promise((resolve) => {
        if (state.active === 0 || key === 0) return;

        commit('deleteKeyframe', {
          activeKey: getters.activeKey,
          key: key || state.active,
        });
        resolve();
      });
    },
    deleteProperty({ getters, commit }, key) {
      return new Promise((resolve) => {
        commit('deleteProperty', {
          activeKey: getters.activeKey,
          key,
        });
        resolve();
      });
    },
  },
};
