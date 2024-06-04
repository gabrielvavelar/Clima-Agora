//Contém a lógica para para a chamada da API open weather e processar os dados retornados
const access_key = "55b29b8d621215a01d17d0e1039cf110";

async function getWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${access_key}&lang=pt_br`,
  );
  const data = await response.json();
  return data;
}

module.exports = {
  getWeather,
};
