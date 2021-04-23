export default (method, url, body) => {
  const host = process.env.NODE_ENV === 'production' ? 'https://suyash-baby-tracker.herokuapp.com/' : 'http://localhost:3000/';
  const obj = {
    method,
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.token,
    },
  };

  if (method === 'POST') {
    obj.body = JSON.stringify(body);
  }

  return new Request(`${host}${url}`, obj);
};
