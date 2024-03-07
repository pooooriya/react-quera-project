import { useQuery } from "@tanstack/react-query";
import { AXIOS } from "../../config/axios";
import { API_URL } from "../../constants/apiUrl";
import { QueryKeys } from "../QueryKeys";

const fetcher = () => AXIOS.get(API_URL.GetMeals).then((res) => res.data);

export const useGetFoodList = () => {
  return useQuery({
    queryKey: [QueryKeys.GetFoodList],
    queryFn: fetcher
  });
};
