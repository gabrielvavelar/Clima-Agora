// Lida com a lógica de entrada/saída. Recebe as requisições HTTP, chama os serviços apropriados e envia as respostas.
const weatherService = require("../services/weatherService");

exports.getWeather = async (req, res) => {
  const city = req.query.city;

  try {
    const data = await weatherService.getWeather(city);
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
