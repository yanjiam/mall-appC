import Axios from 'axios';
import baseURL, { URLS } from './URLS';

const request = Axios.create({
  baseURL,
});
const requestUpload = Axios.create({
  baseURL: 'http://mallapi.duyiedu.com',
});

request.interceptors.response.use((value) => value.data);
requestUpload.interceptors.response.use((value) => value.data);

const upload = (file) => requestUpload.post(
  'upload/images?appkey=LiuDeHua_1616117821248',
  file,
);

const getCategoryList = () => request.post(
  URLS.getCategory,
);

const getSideList = (_id) => request.post(
  URLS.getSide,
  { _id },
);

const getGoodsList = (category, type, page, size, sort) => request.post(
  URLS.getGoodsList,
  {
    category, type, size, page, sort,
  },
);

const getAllGoodsList = (page, size) => request.post(
  URLS.getAllGoodsList,
  {
    size, page,
  },
);

const likeSearch = (value) => request.post(
  URLS.likeSearch,
  { likeValue: value },
);

const search = (_id, page, size) => request.post(
  URLS.search,
  { _id, page, size },
);

const getGoodsByIds = (_id) => request.post(
  URLS.getGoodsByIds,
  { _id },
);

const getShopCat = (pin) => request.post(
  URLS.getShopCat,
  { pin },
);

const addCart = (pin, productId, num) => request.post(
  URLS.addCart,
  { pin, productId, num },
);

const deleteCart = (_id) => request.post(
  URLS.deleteCart,
  { _id },
);

const login = (pin, passwd) => request.post(
  URLS.login,
  { pin, passwd },
);

const queryInfo = (pin) => request.post(
  URLS.queryInfo,
  { pin },
);

const changeInfo = (pin, passwd, username, avatar) => request.post(
  URLS.changeInfo,
  {
    pin, passwd, username, avatar,
  },
);

const register = (pin, passwd, username, avatar) => request.post(
  URLS.register,
  {
    pin, passwd, username, avatar,
  },
);

const getOrderList = (pin, page, size, status) => request.post(
  URLS.getOrder,
  {
    userId: pin,
    page,
    size,
    status,
  },
);

const addOrder = (productList, pin, payNum) => request.post(
  URLS.addOrder,
  {
    product_list: productList,
    userId: pin,
    pay_num: payNum,
  },
);
// eslint-disable-next-line no-underscore-dangle
const changeStatus = (_id, status) => request.post(
  URLS.changeStatus,
  {
    _id, status,
  },
);

const deleteOrder = (_id) => request.post(
  URLS.deleteOrder,
  {
    _id,
  },
);

export default {
  getCategoryList,
  getSideList,
  getGoodsList,
  getAllGoodsList,
  search,
  likeSearch,
  getGoodsByIds,
  getShopCat,
  addCart,
  deleteCart,
  login,
  queryInfo,
  changeInfo,
  upload,
  register,
  getOrderList,
  addOrder,
  changeStatus,
  deleteOrder,
};
