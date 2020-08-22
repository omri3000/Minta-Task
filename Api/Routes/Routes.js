import { getAllRows, getRowsByYear } from "../Controller/Control";

export default (app) => {
  app.route("/getAllRows").get(getAllRows);
  app.route("/getRowsByYear/:year").get(getRowsByYear);
  app.route("/getRowsByYear/:year/:mass").get(getRowsByYear);
};
