export default (method, url, body) => {
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

  return new Request(`http://localhost:3000/${url}`, obj);
};
