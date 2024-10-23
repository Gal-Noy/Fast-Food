import axios from "axios";

const getUserMockData = async (gender) =>
  await axios.get(`https://randomuser.me/api/?gender=${gender}`).then((res) => {
    const userData = res.data.results[0];
    return {
      name: `${userData.name.first} ${userData.name.last}`,
      email: userData.email,
      location: `${userData.location.city}, ${userData.location.state}, ${userData.location.country}`,
      phone: userData.phone,
      image: userData.picture.thumbnail,
    };
  });

export default getUserMockData;
