import axios from "axios";

const getGender = async (name) =>
  await axios
    .get(`https://api.genderize.io?name=${name}`)
    .then((res) => (res.data.probability > 0.95 ? res.data.gender : "undetermined"))

export default getGender;
