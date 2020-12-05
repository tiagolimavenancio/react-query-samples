import axios from "axios";
import { useQuery } from "react-query";

export const usePosts = () => {
  return useQuery("posts", async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return data;
  });
};

const getPostById = async (key, id) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return data;
};

export const usePost = (postId) => {
  return useQuery(["post", postId], getPostById, {
    enabled: postId,
  });
};
