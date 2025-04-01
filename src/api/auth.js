import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export async function login(payload) {
  const userProfile = await axios.post(`${baseUrl}/api/login`, payload, {
    headers: {
      // Authorization: 'Bearer ' + token,
    },
  });

  return userProfile;
}

export async function signup(payload) {
  const userProfile = await axios.post(`${baseUrl}/api/register`, payload, {
    headers: {
      // Authorization: 'Bearer ' + token,
    },
  });

  return userProfile;
}
