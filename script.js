function getRandomFloat(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

function updateDateTime() {
  const now = new Date();
  const dateOptions = { weekday: "long", day: "numeric", month: "long" };
  const date = now.toLocaleDateString("en-US", dateOptions);

  // Add the "th" to the day (e.g., 12th)
  const day = now.getDate();
  const dayWithSuffix =
    day +
    (["th", "st", "nd", "rd"][
      day % 10 > 3 || ~~((day % 100) / 10) == 1 ? 0 : day % 10
    ] || "th");

  // Format time to "12:45:34 PM"
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const time = now.toLocaleTimeString("en-US", timeOptions);

  // Combine everything
  const formattedDateTime = `${now.toLocaleDateString("en-US", {
    weekday: "long",
  })}, ${dayWithSuffix} ${now.toLocaleDateString("en-US", {
    month: "long",
  })}. ${time}`;

  return formattedDateTime;
}

// Simulate sensor data that changes based on time of day
function simulateSensorData() {
  const now = new Date();
  const hours = now.getHours();

  let ambientTemperature,
    factor,
    predictedTemperature,
    solarIntensity,
    waterTemperature;

  // Morning (6 AM to 12 AM)
  if (hours >= 6 && hours <= 11) {
    factor = hours - 5;
    ambientTemperature = 20 + getRandomFloat(factor * 1, factor * 1.5);
    solarIntensity = getRandomFloat(
      ambientTemperature * 2.3,
      ambientTemperature * 2.8
    );
    waterTemperature = parseFloat(
      (ambientTemperature + getRandomFloat(7, 9)).toFixed(1)
    );
    predictedTemperature = (
      waterTemperature +
      waterTemperature * (solarIntensity / 100)
    ).toFixed(1);
  }

  // Daytime (12 PM to 3 PM)
  else if (hours >= 12 && hours <= 15) {
    factor = hours - 5;
    ambientTemperature = 15 + getRandomFloat(factor * 1, factor * 1.5);
    solarIntensity = getRandomFloat(
      ambientTemperature * 2.3,
      ambientTemperature * 2.8
    );
    waterTemperature = parseFloat(
      (ambientTemperature + getRandomFloat(7, 9)).toFixed(1)
    );
    predictedTemperature = (
      waterTemperature +
      waterTemperature * (solarIntensity / 100)
    ).toFixed(1);
  }

  // Nighttime (7 PM to 6 AM)
  else {
    factor = 1;
    ambientTemperature = 10 + getRandomFloat(factor * 10, factor * 12);
    solarIntensity = 1.1;
    waterTemperature = parseFloat(
      (ambientTemperature + getRandomFloat(7, 9)).toFixed(1)
    );
    let sc = parseFloat(waterTemperature * (solarIntensity / 100));
    predictedTemperature = (waterTemperature + sc).toFixed(1);
  }

  // Return simulated data
  return {
    dateTime: updateDateTime(),
    ambientTemperature: ambientTemperature,
    predictedTemperature: predictedTemperature,
    solarIntensity: solarIntensity,
    waterTemperature: waterTemperature,
  };
}

// Function to display data on the webpage
function displayData(data) {
  document.getElementById("datetime").innerText = data.dateTime;
  // document.getElementById('ambientTemp').innerText = data.ambientTemperature;
  document.getElementById("predictedTemp").innerText =
    data.predictedTemperature;
  document.getElementById("solarIntensity").innerText = data.solarIntensity;
  document.getElementById("waterTemp").innerText = data.waterTemperature;
}

function updatePage() {
  const sensorData = simulateSensorData();
  displayData(sensorData);
}

// Refresh the data when the page loads
window.onload = function () {
  updatePage();
  setInterval(updatePage, 30000);
};
