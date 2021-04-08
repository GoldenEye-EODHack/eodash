import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import config from './modules/config';
import dashboard from './modules/dashboard';
import features from './modules/features';
import indicators from './modules/indicators';

const vuexLocal = new VuexPersistence({
  storage: localStorage,
  reducer: (state) => (
    {
      dashboard: {
        dashboardConfig: state.dashboard.dashboardConfig,
      },
    }
  ),
});


Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    config,
    dashboard,
    features,
    indicators,
  },
  state: {
    packageVersion: process.env.PACKAGE_VERSION || '0',
    isFullScreen: false,
  },
  getters: {
    appVersion: (state) => state.packageVersion,
  },
  mutations: {
    changeFullScreen(state, val) {
      state.isFullScreen = val;
    }
  },
  plugins: [vuexLocal.plugin],
});

export default store;
