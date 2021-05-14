const getError = (url) => {
  switch (url) {
    case 'users':
      return "Couldn't Sign Up!";
    case 'sessions':
      return "Couldn't Sign In!";
    case 'measurements':
      return "Couldn't process Measurements!";
    case 'measures':
      return "Couldn't process Measures!";
    default:
      return "Request couldn't be processed!";
  }
};

export default (method, url, body, cb) => {
  let res;
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

  fetch(new Request(`${host}${url}`, obj))
    .then((response) => {
      if (!response.ok) {
        res = response;
        throw Error(response);
      }
      return response.json();
    })
    .then((response) => {
      cb(response);
    })
    .catch(() => {
      if (res.json) {
        res.json().then((err) => {
          cb({ error: err.error || getError(url) });
        });
      } else {
        cb({ error: getError(url) });
      }
    });
};
