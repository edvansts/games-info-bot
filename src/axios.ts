import axios from "axios";

export const GAMES_API_TOKEN = process.env.GAMES_API_TOKEN;

const GamesApi = axios.create({
  baseURL: "https://rawg.io/api",
  headers: {
    "Content-Type": "application/json",
    token: `Token ${GAMES_API_TOKEN}`,
  },
});

export { GamesApi };
