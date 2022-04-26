import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/index';
import { getUserCookie } from '../util/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    category: null,
    sideList: [],
    showContent: false,
    size: 5,
    goodsList: [],
    type: null,
    shopCatList: [],
  },
  mutations: {
    setSideList(state, list) {
      list.unshift('all');
      state.sideList = list;
    },
    setShowContent(state, bool) {
      state.showContent = bool;
    },
    setGoodsList(state, list) {
      state.goodsList = [...state.goodsList, ...list];
    },
    resetGoodsList(state) {
      state.goodsList = [];
    },
    setGoodsType(state, type) {
      state.type = type;
    },
    setCategory(state, _id) {
      state.category = _id;
    },
    setShopCatList(state, list) {
      state.shopCatList = list;
    },
    setUserInfo(state, data) {
      state.userInfo = data;
    },
  },
  actions: {
    async getSideList({ commit }, _id) {
      commit('setShowContent', false);
      commit('setCategory', _id);
      const value = await api.getSideList({ _id }).then((res) => res.data.c_items);
      commit('setSideList', value);
      commit('setShowContent', true);
    },
    async getGoodsList({ state, commit }, options) {
      const { page, sortType } = options;
      // eslint-disable-next-line no-underscore-dangle
      const type = options.type || state.type;
      commit('setGoodsType', options.type);
      // eslint-disable-next-line no-underscore-dangle
      const res = await api.getGoodsList(state.category, type,
        page, state.size, sortType);
      let { data } = res;
      data = data.map((item) => ({
        ...item,
        // eslint-disable-next-line no-underscore-dangle
        productId: item._id,
      }));
      commit('setGoodsList', data);
      if (res.total > state.goodsList.length) {
        return true;
      }
      return false;
    },
    async getShopCat({ state, commit }) {
      const pin = state.pin || getUserCookie().pin;
      const { data } = await api.getShopCat(pin);
      commit('setShopCatList', data);
    },
    async addCart({ state, commit }, options) {
      // eslint-disable-next-line no-underscore-dangle
      const pin = state.pin || getUserCookie().pin;
      await api.addCart(pin, options.productId, options.num);
      const { data } = await api.getShopCat(pin);
      commit('setShopCatList', data);
    },
    async deleteCart({ state, commit }, options) {
      // eslint-disable-next-line no-underscore-dangle
      await api.deleteCart(options._id);
      const pin = state.pin || getUserCookie().pin;
      const { data } = await api.getShopCat(pin);
      commit('setShopCatList', data);
    },
  },
  modules: {
  },
});
