import { ReactQueryCacheProvider, QueryCache } from "react-query";
import Pagination from "./Pagination";
import "./App.css";

const queryCache = new QueryCache();

function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <div className="App">
        <Pagination />
      </div>
    </ReactQueryCacheProvider>
  );
}

export default App;
