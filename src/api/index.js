import axios from "axios";
const url = "http://localhost:3000/";

export const apiPost = async (endpoint, body) => {
  try {
    const response = await axios.post(`${url}${endpoint}`, body, {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    });
    if (response) {
      return response;
    }
  } catch (error) {
    return error.response;
  }
};
