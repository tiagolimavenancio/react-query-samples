import axios from "axios";
import { useQuery } from "react-query";

export const usePosts = () => {
  return useQuery("posts", async () => {
    const { data } = await axios.get(
      "http://jsonplaceholder.typicode.com/posts"
    );
    return data;
  });
};

export const createPosts = () => {};

export const updatePosts = () => {};

export const deletePosts = () => {};
