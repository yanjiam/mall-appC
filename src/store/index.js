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
    orderList: [],
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
    setOrderList(state, list) {
      state.orderList = [...state.orderList, ...list];
    },
    resetOrderList(state) {
      state.orderList = [];
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
    async addCart({ state }, options) {
      // eslint-disable-next-line no-underscore-dangle
      const pin = state.pin || getUserCookie().pin;
      const res = await api.addCart(pin, options.productId, options.num);
      if (res.state === 0) {
        this.dispatch('getShopCat');
      }
    },
    async deleteCart({ state }, options) {
      console.log(state);
      // eslint-disable-next-line no-underscore-dangle
      const res = await api.deleteCart(options._id);
      if (res.state === 0) {
        this.dispatch('getShopCat');
      }
    },
    async getOrderList({ state, commit }, options) {
      const { page, size, status } = options;
      const pin = state.pin || getUserCookie().pin;
      const res = await api.getOrderList(pin, page, size, status);
      commit('setOrderList', res.data);
      if (res.total > state.orderList.length) {
        return true;
      }
      return false;
    },
    async addOrder({ state }, options) {
      const pin = state.pin || getUserCookie().pin;
      const res = await api.addOrder(options.product_list, pin, options.pay_num);
      if (res.state === 0) {
        return true;
      }
      return false;
    },
    async deleteOrder({ state }, options) {
      console.log(state);
      // eslint-disable-next-line no-underscore-dangle
      const res = await api.deleteOrder(options._id);
      if (res.state === 0) {
        return true;
      }
      return false;
    },
    async changeStatus({ state }, options) {
      console.log(state);
      // eslint-disable-next-line no-underscore-dangle
      const res = await api.changeStatus(options._id, options.status);
      if (res.state === 0) {
        return true;
      }
      return false;
    },
  },
  modules: {
  },
});
