import { Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLogin } from "../../../../services/Mutations/useLogin";

type FormProps = {
  email: string;
  password: string;
};
const validationSchema = yup.object({
  email: yup
    .string()
    .email("ایمیل وارد شده معتبر نمیباشد")
    .required("وارد کردن ایمیل الزامی است"),
  password: yup
    .string()
    .min(8, "رمز عبور شما حداقل 8 کارکتر باید باشد")
    .required("وارد کردن رمزعبور الزامی است")
});

interface LoginSectionProps {
  onClose: () => void;
}

export const LoginSection: React.FC<LoginSectionProps> = ({
  onClose
}): JSX.Element => {
  const mutation = useLogin();

  const formik = useFormik<FormProps>({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: (data) => {
      if (mutation.isPending) return;
      mutation.mutate(data, {
        onSuccess: () => {
          onClose();
          // ////
          // token set
          // gsm
        }
      });
    }
  });

  return (
    <Stack component="form" onSubmit={formik.handleSubmit} spacing={4}>
      <Stack spacing={2}>
        <TextField
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          label="ایمیل"
          error={formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
          label="رمز عبور"
        />
      </Stack>
      <Stack
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        width="100%"
        gap={1}
      >
        <Button type="submit" variant="contained" color="primary">
          ورود
        </Button>
        <Button onClick={onClose}>خروج</Button>
      </Stack>
    </Stack>
  );
};
