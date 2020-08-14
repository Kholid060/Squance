export default {
  state: () => ({
    entity: {},
  }),
  getters: {
    activeKey: (state, getters, rootState) => rootState.active,
    active: (state, getters) => state.entity[getters.activeKey] || {},
  },
  mutations: {
    updateProperties(state, { activeKey, entity }) {
      state.entity[activeKey] = {
        ...state.entity[activeKey],
        ...entity,
      };
    },
    addEntity(state, key) {
      state.entity[key] = {
        duration: 4000,
        easing: 'ease',
        iterations: Infinity,
        direction: 'normal',
        fill: 'none',
      };
    },
    deleteEntity(state, key) {
      delete state.entity[key];
    },
  },
  actions: {
    update({ getters, commit }, entity) {
      return new Promise((resolve) => {
        commit('updateProperties', {
          entity,
          activeKey: getters.activeKey,
        });
        resolve();
      });
    },
  },
};
