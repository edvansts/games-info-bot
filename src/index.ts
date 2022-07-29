import "dotenv/config";
import { Telegraf } from "telegraf";
import { getGameInfo } from "./GameInfo";

const BOT_TOKEN = process.env.BOT_TOKEN as string;

const bot = new Telegraf(BOT_TOKEN);

bot.help((ctx) => ctx.reply("Envia um nome de algum jogo 😜"));
bot.on("sticker", (ctx) => ctx.reply("🎮"));
bot.hears("hi", (ctx) => ctx.reply("oi"));

bot.start((ctx) =>
  ctx.reply(
    "Opa, quer informações quentes sobre algum jogo? Me manda uma mensagem com o nome do jogo!"
  )
);

bot.on("text", async (ctx) => {
  const gameName = ctx.message.text;
  const gameInfo = await getGameInfo(gameName);

  if (gameInfo) {
    const message = `${gameInfo.name}\nRating: ${gameInfo.rating}\n${gameInfo.descriptionRawTranslated}`;

    ctx.reply(message);
    return;
  }

  ctx.reply("Opa, não encontramos esse jogo 😬!");
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
