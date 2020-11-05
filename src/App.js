import React, { useState } from "react";
import "./components/styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Mobile from "./components/Map";
import { DataContext } from "./context/DataProvider";

export default function App() {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  return (
    <DataContext.Provider
      value={{
        value,
        setValue,
        search,
        setSearch,
      }}
    >
      <div className="App">
        <Mobile />
      </div>
    </DataContext.Provider>
  );
}
