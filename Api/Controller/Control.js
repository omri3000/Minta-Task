import fs from "fs";
import axios from "axios";

let json = {};

fs.readFile("./json/Meteor-landing.json", "utf8", function (err, data) {
  if (err) throw err;
  json = JSON.parse(data);
});

export const getAllRows = (req, res) => {
  res.json(json);
};

export const getRowsByYear = (req, res) => {
  let returnJson = {};
  let newList = [];
  const mass = req.params.mass ? req.params.mass : 0;
  const year = req.params.year;
  if (isNaN(year)) {
    throw new Error("Year : Invalid number");
  } else if (mass < 0) {
    throw new Error("Year cannot be negative");
  }

  if (isNaN(mass)) {
    throw new Error("Mass : Invalid number");
  } else if (mass < 0) {
    throw new Error("Mass cannot be negative");
  }
  json.forEach((element) => {
    let date = new Date(element.year);
    if (year == date.getFullYear()) {
      if (parseInt(element.mass) >= mass) {
        newList.push(element);
      }
    }
  });
  const mars = addWeatherOnMars().then((data) => {
    returnJson.HWS = data;

    returnJson.data = newList;
    res.json(returnJson);
  });
};

async function addWeatherOnMars() {
  let data;
  await axios
    .get(
      "https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0"
    )
    .then((res) => {
      const lastDate = res.data["sol_keys"][6];
      data = res.data[lastDate].HWS.mn;
    })
    .catch((res) => {
      console.log(res.response.data.error.message);
      throw new Error(res.response.data.error.message);
    });
  return data;
}
