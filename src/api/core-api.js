import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem("token");

export async function getProfile() {
  const userProfile = await axios.get(`${baseUrl}/api/profile`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return userProfile;
}

export async function getLoans() {
  const loans = await axios.get(`${baseUrl}/api/loans`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return loans;
}

export async function takeLoan(payload) {
  const takeLoan = await axios.post(`${baseUrl}/api/loan`, payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return takeLoan;
}

export async function repayLoan(id, amount) {
  const takeLoan = await axios.post(`${baseUrl}/api/${id}/repay`, amount, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return takeLoan;
}

export async function payForService(payload) {
  const takeLoan = await axios.post(`${baseUrl}/ap/pay-service`, payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return takeLoan;
}
