import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import { AXIOS } from "../../config/axios";
import { API_URL } from "../../constants/apiUrl";

const fetcher = () => AXIOS.get(API_URL.GetSliders).then((res) => res.data);
export const useGetSliders = () => {
  return useQuery({
    queryKey: [QueryKeys.GetSliderList],
    queryFn: fetcher
  });
};
