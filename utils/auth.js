const jwtAuth = (axios, message, displayReply = false) => {
  const username = message.from.username;
  const chatId = message.from.id;
  return axios
    .post(`${process.env.URL_API}/auth/telegram`, {
      telegramName: username,
      telegramChat: chatId,
    })
    .then((res) => {
      const code = res.data.code;
      const token = res.data.token;
      if (code === 1 || code === 2) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      }
      if (displayReply) {
        switch (code) {
          case 1:
            return message.reply("Username trovato, registrazione riuscita!");
          case 2:
            return message.reply(
              "Account già registrato, nessuna modifica apportata."
            );
          case 3:
            return message.reply(
              "Username non trovato, registra il tuo username Telegram dalle impostazioni della web-app."
            );
          default:
            break;
        }
      }
    })
    .catch((err) => {
      console.log(err);
      if (displayReply) {
        return message.reply(
          "Errore nel controllo dei dati, prova ad eseguire nuovamente /login o nel caso contatta l'amministrazione."
        );
      }
    });
};
module.exports.jwtAuth = jwtAuth;
