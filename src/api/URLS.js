export const URLS = {
  getSide: '/category/queryInfo',
  getGoodsList: '/products/all',
  getAllGoodsList: '/products/allList',
  getGoodsByIds: '/products/queryInfo',
  getCategory: '/category/all',
  getShopCat: '/shopCart/all',
  addCart: '/shopCart/add',
  editCart: '/shopCart/edit',
  deleteCart: '/shopCart/delete',
  login: '/user/login',
  queryInfo: 'user/queryInfo',
  changeInfo: 'user/changeInfo',
  upload: '/upload/images',
  register: '/user/register',
  getOrder: '/order/clist',
  addOrder: '/order/add',
  changeStatus: '/order/change',
  deleteOrder: '/order/delete',
};
const baseURL = 'http://localhost:9527';
export default baseURL;
