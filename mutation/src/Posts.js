import React, { useState } from "react";
import axios from "axios";
import { useQueryCache, useMutation } from "react-query";
import { usePosts } from "./api";

function Posts() {
  const cache = useQueryCache();
  const [post, setPost] = useState({
    id: Math.floor(Math.random() * 10000),
    title: "",
    body: "",
  });
  const { status, data, error, isFetching } = usePosts();

  const [mutatePost] = useMutation(
    (post) =>
      axios.post("https://jsonplaceholder.typicode.com/posts", {
        post,
      }),
    {
      onMutate: (post) => {
        setPost({
          title: "",
          body: "",
        });
        cache.cancelQueries("posts");
        const previousValue = cache.getQueryData("posts");
        cache.setQueryData("posts", (old) => [{ ...post }, ...old]);
        return previousValue;
      },
      onError: (err, variables, previousValue) =>
        cache.setQueryData("posts", previousValue),
      onSettled: () => {
        cache.invalidateQueries("posts");
      },
    }
  );

  return (
    <div>
      <p>
        In this example, new items can be created using a mutation. The new item
        will be optimistically added to the list in hopes that the server
        accepts the item. If it does, the list is refetched with the true items
        from the list. Every now and then, the mutation may fail though. When
        that happens, the previous list of items is restored and the list is
        again refetched from the server.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutatePost(post);
        }}
      >
        <div>
          <input
            type="text"
            onChange={(event) =>
              setPost({
                ...post,
                title: event.target.value,
              })
            }
            value={post.title}
          />
        </div>
        <div>
          <input
            type="text"
            onChange={(event) =>
              setPost({
                ...post,
                body: event.target.value,
              })
            }
            value={post.body}
          />
        </div>
        <button>Create</button>
      </form>
      <br />
      {status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <spen>Error: {error.message}</spen>
      ) : (
        <>
          <ul>
            {data.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
          <div>{isFetching ? "Updating in background..." : " "}</div>
        </>
      )}
    </div>
  );
}

export default Posts;
