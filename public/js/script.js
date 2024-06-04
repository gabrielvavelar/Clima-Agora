document.querySelector("#search").addEventListener("submit", async (event) => {
  event.preventDefault();

  const cityName = document.querySelector("#city_name").value;

  if (!cityName) {
    document.querySelector("#weather").classList.remove("show");
    showAlert("Você precisa digitar uma cidade...");
    return;
  }

  try {
    const response = await fetch(
      `/routes/get?city=${encodeURIComponent(cityName)}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const json = await response.json();
    if (json) {
      showInfo({
        city: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempMax: json.main.temp_max,
        tempMin: json.main.temp_min,
        description: json.weather[0].description,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        humidity: json.main.humidity,
      });
    } else {
      document.querySelector("#weather").classList.remove("show");
      showAlert(`
                Não foi possível localizar...
                <img src="src/images/404.svg"/>
            `);
    }
  } catch (error) {
    console.error("Erro ao obter dados:", error);
    showAlert("Erro ao obter dados.");
  }
});

function showInfo(json) {
  isday(json.tempIcon);
  const iconUrl = `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`;
  showAlert("");
  document.querySelector("#weather").classList.add("show");
  document.querySelector("#title").innerHTML = `${json.city}, ${json.country}`;
  document.querySelector("#temp_value").innerHTML = `${json.temp
    .toFixed(1)
    .toString()
    .replace(".", ",")} <sup>C°</sup>`;
  document.querySelector("#temp_description").innerHTML = `${json.description}`;
  document.querySelector("#temp_img").setAttribute("src", iconUrl);
  document.querySelector("#temp_max").innerHTML = `${json.tempMax
    .toFixed(1)
    .toString()
    .replace(".", ",")} <sup>C°</sup>`;
  document.querySelector("#temp_min").innerHTML = `${json.tempMin
    .toFixed(1)
    .toString()
    .replace(".", ",")} <sup>C°</sup>`;
  document.querySelector("#humidity").innerHTML = `${json.humidity}%`;
  document.querySelector("#wind").innerHTML = `${json.windSpeed.toFixed(
    1,
  )}km/h`;
}

function showAlert(msg) {
  document.querySelector("#alert").innerHTML = msg;
}

function isday(isday) {
  const color = document.getElementById("temp");
  if (isday[2] === "d") {
    color.style.backgroundColor = "#0284c7";
  } else {
    color.style.backgroundColor = "#000000";
  }
}
