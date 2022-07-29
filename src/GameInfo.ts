import { GamesApi, GAMES_API_TOKEN } from "./axios";
import translate from "@vitalets/google-translate-api";

const getGameInfo = async (gameName: string) => {
  try {
    const response = await GamesApi.get(
      `/games/${gameName}?key=${GAMES_API_TOKEN}`
    );
    const data = response.data;

    const { text } = await translate(data.description_raw, {
      from: "en",
      to: "pt",
    });

    const gameInfo = {
      id: data.id,
      name: data.name,
      rating: data.rating,
      description: data.description,
      descriptionRaw: data.description_raw,
      descriptionRawTranslated: text,
    };

    return gameInfo;
  } catch (err) {
    console.log(err);
    return;
  }
};

export { getGameInfo };
