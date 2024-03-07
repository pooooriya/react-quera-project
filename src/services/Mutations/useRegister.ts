import { useMutation } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import { AXIOS } from "../../config/axios";

const mutationFn = (data) =>
  AXIOS.post("http://localhost:5173/api/register/", data).then(
    (res) => res.data
  );

export const useRegister = () => {
  return useMutation({
    mutationKey: [QueryKeys.Register],
    mutationFn
  });
};
