import axios from "axios";

export const fetchPassengers = async (key, page = 0) => {
  const { data } = await axios.get(
    `https://api.instantwebtools.net/v1/passenger?page=${page}&size=100`
  );
  return data;
};
