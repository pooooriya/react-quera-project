import { useEffect, useState } from "react";
import { AXIOS } from "../config/axios";
import { AxiosRequestConfig } from "axios";

export const useAxios = <TRequest = any, TResponse = any, TError = any>({
  ...rest
}: AxiosRequestConfig<TRequest>) => {
  const [data, setData] = useState<TResponse>();
  const [error, setError] = useState<TError>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    handleRequest();
  }, []);

  const handleRequest = () => {
    AXIOS.request({
      ...rest
    })
      .then((res) => setData(res.data))
      .catch((error) => {
        setError(error);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  };

  return { data, error, isError, isLoading };
};
