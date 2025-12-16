const BASE_URL = "http://localhost:7070/api/";
const LOGIN_ENDPOINT = "auth/login";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

/* Insert utility-methods from later steps 
here (REMEMBER to uncomment in the returned 
object when you do)*/

const login = (user, password) => {
  const options = makeOptions("POST", false, {
    username: user,
    password: password,
  });
  return fetch(BASE_URL + LOGIN_ENDPOINT, options)
    .then(handleHttpErrors)
    .then((data) => { setToken(data.token);
    });
};

const fetchData = (endpoint) => {
  const options = makeOptions("GET", true); //True add's the token
  return fetch(BASE_URL + endpoint, options).then(handleHttpErrors);
};

const makeOptions = (method, addToken, body) => {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (addToken && loggedIn()) {
    opts.headers["Authorization"] = `Bearer ${getToken()}`;
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
};

const setToken = (token) => {
  localStorage.setItem("jwtToken", token);
};
const getToken = () => {
  return localStorage.getItem("jwtToken");
};
const loggedIn = () => {
  const loggedIn = getToken() != null;
  return loggedIn;
};
const logout = () => {
  localStorage.removeItem("jwtToken");
};


const getUserNameAndRoles = () => {
    const token = getToken();
    if (token != null) {
        try {
            const payloadBase64 = token.split('.')[1];
            const decodedClaims = JSON.parse(window.atob(payloadBase64));
            const roles = decodedClaims.roles;
            const username = decodedClaims.username;
            const rolesArray = Array.isArray(roles) ? roles : roles.split(',');
            return [username, rolesArray];
        } catch {
            return ["", []];
        }
    } else return ["", []];
};

const hasUserAccess = (neededRole, loggedIn) => {
    const [, roles] = getUserNameAndRoles(); 
    return loggedIn && roles.includes(neededRole);
};

const facade = {
  makeOptions,
  setToken,
  getToken,
  loggedIn,
  login,
  logout,
  fetchData,
  getUserNameAndRoles,
  hasUserAccess 
};

export default facade;