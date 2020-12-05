import React from "react";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import Posts from "./Posts";
import "./App.css";

const queryCache = new QueryCache();

function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Posts />
    </ReactQueryCacheProvider>
  );
}

export default App;
