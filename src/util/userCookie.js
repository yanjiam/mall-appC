/** *
 * @param {Object} info
 */
export function setCookie(info) {
  const arr = Object.entries(info);
  for (let i = 0; i < arr.length; i += 1) {
    localStorage.setItem(arr[i][0], JSON.stringify(arr[i][1]));
  }
  return true;
}
/**
 * 获取用户的cookie信息
 */
export function getUserCookie() {
  return {
    username: JSON.parse(localStorage.getItem('username')),
    pin: JSON.parse(localStorage.getItem('pin')),
    avatar: JSON.parse(localStorage.getItem('avatar')),
    power: JSON.parse(localStorage.getItem('power')),
  };
}

export function removeUserCookie() {
  localStorage.removeItem('username');
  localStorage.removeItem('pin');
  localStorage.removeItem('avatar');
  localStorage.removeItem('power');
  return true;
}
