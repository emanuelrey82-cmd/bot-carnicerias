const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

let carnicerias = [
  { id: 1, nombre: "Carniceria 1", estado: "PENDIENTE" },
  { id: 2, nombre: "Carniceria 2", estado: "PENDIENTE" },
  { id: 3, nombre: "Carniceria 3", estado: "PENDIENTE" }
];

bot.on('message', (msg) => {
  const texto = msg.text;

  const match = texto.match(/^(\d+)\s*-\s*(.+)$/);

  if (match) {
    const id = parseInt(match[1]);
    const comentario = match[2];

    const carni = carnicerias.find(c => c.id === id);

    if (!carni) {
      bot.sendMessage(msg.chat.id, "Ese número no existe");
      return;
    }

    if (carni.estado === "COMPLETADO") {
      bot.sendMessage(msg.chat.id, "Esa ya fue visitada");
      return;
    }

    carni.estado = "COMPLETADO";

    const pendientes = carnicerias.filter(c => c.estado === "PENDIENTE").length;

    bot.sendMessage(msg.chat.id, `Listo. Quedan ${pendientes}`);
  }
});
