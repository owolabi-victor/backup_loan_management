import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

// const token = localStorage.getItem("authToken");

export async function getProfile(token) {
  const userProfile = await axios.get(`${baseUrl}/api/profile`, {
    headers: {
      Authorization: "Bearer " + token,
      "ngrok-skip-browser-warning": "true",
    },
  });

  return userProfile;
}

export async function getLoans(token) {
  const loans = await axios.get(`${baseUrl}/api/loans`, {
    headers: {
      Authorization: "Bearer " + token,
      "ngrok-skip-browser-warning": "true",
    },
  });

  return loans;
}

export async function takeLoan(token, payload) {
  const takeLoan = await axios.post(`${baseUrl}/api/loans`, payload, {
    headers: {
      Authorization: "Bearer " + token,
      "ngrok-skip-browser-warning": "true",
    },
  });

  return takeLoan;
}

export async function repayLoan(token, id, amount) {
  const takeLoan = await axios.post(
    `${baseUrl}/api/loans/${id}/repay`,
    amount,
    {
      headers: {
        Authorization: "Bearer " + token,
        "ngrok-skip-browser-warning": "true",
      },
    }
  );

  return takeLoan;
}

export async function payForService(token, payload) {
  const takeLoan = await axios.post(`${baseUrl}/api/pay-service`, payload, {
    headers: {
      Authorization: "Bearer " + token,
      "ngrok-skip-browser-warning": "true",
    },
  });

  return takeLoan;
}
