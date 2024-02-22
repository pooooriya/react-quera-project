import { Button, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface CheckoutProps {}
const Checkout: React.FC<CheckoutProps> = (): JSX.Element => {
  return (
    <Stack border="2px solid #e7e7e7" borderRadius={5} p={2} spacing={4}>
      <Stack
        borderBottom="1px solid #e7e7e7"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography>سبد خرید</Typography>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Stack>
      <Stack>
        <Stack flexDirection="row" justifyContent="space-between">
          <Stack>
            <Typography>بستنی فلان</Typography>
            <Typography>250.000 تومان</Typography>
          </Stack>
          <Stack>
            <Stack direction="row">
              <IconButton>
                <AddIcon />
              </IconButton>
              <IconButton>
                <RemoveIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography>هزینه ی کل</Typography>
        <Typography>250.000 تومان</Typography>
      </Stack>
      <Stack>
        <Button variant="contained">تکمیل سفارش</Button>
      </Stack>
    </Stack>
  );
};

export default Checkout;
