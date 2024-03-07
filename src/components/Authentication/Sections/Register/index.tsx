import { Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRegister } from "../../../../services/Mutations/useRegister";
import { useLogin } from "../../../../services/Mutations/useLogin";

type FormProps = {
  email: string;
  password: string;
  username: string;
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("ایمیل وارد شده معتبر نمیباشد")
    .required("وارد کردن ایمیل الزامی است"),
  password: yup
    .string()
    .min(8, "رمز عبور شما حداقل 8 کارکتر باید باشد")
    .required("وارد کردن رمزعبور الزامی است"),
  username: yup
    .string()
    .min(3, "نام کاربری شما حداقل 3 کارکتر باید باشد")
    .required("وارد کردن نام کاربری الزامی است")
});

interface RegisterSectionProps {
  onClose: () => void;
}

export const RegisterSection: React.FC<RegisterSectionProps> = ({
  onClose
}): JSX.Element => {
  const mutation = useRegister();
  const formik = useFormik<FormProps>({
    initialValues: {
      email: "",
      username: "",
      password: ""
    },
    validationSchema,
    onSubmit: (data) => {
      // request mizani be server
      if (mutation.isPending) return;
      mutation.mutate(data, {
        onSuccess: (res) => {
          console.log(res);
        }
      });
    }
  });
  return (
    <Stack component="form" onSubmit={formik.handleSubmit} spacing={4}>
      <Stack spacing={2}>
        <TextField
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.touched.username && !!formik.errors.username}
          helperText={formik.touched.username && formik.errors.username}
          label="نام کاربری"
        />
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
          ثبت نام
        </Button>
        <Button onClick={onClose}>خروج</Button>
      </Stack>
    </Stack>
  );
};
