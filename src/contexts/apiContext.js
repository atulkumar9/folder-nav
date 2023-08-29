import React, { useContext, useEffect, useState } from "react";
import { fetchData } from "../api";

const ApiContext = React.createContext();

export const useApi = () => {
  const { data, isLoading } = useContext(ApiContext);
  return { data, isLoading };
};

export const useUpdateData = () => {
  const { setData } = useContext(ApiContext);
  return setData;
};

export const ApiProvider = ({ children }) => {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    let res = await fetchData();
    setApiData(res);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("new data", apiData);
  }, [apiData]);

  return (
    <ApiContext.Provider
      value={{ data: apiData, isLoading, setData: setApiData }}
    >
      {children}
    </ApiContext.Provider>
  );
};
