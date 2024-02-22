import { IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
interface CardProps {
  title: string;
  price: string;
}
export const Card: React.FC<CardProps> = ({ title, price }): JSX.Element => {
  return (
    <Stack border="1px solid #e7e7e7" borderRadius={3} overflow="hidden">
      <Stack>
        <img src="https://static.delino.com/Image/Restaurant/Food/f3hfchde.pxv_560x350.jpg" />
      </Stack>
      <Stack p={2} spacing={2}>
        <Stack>
          <Typography
            variant="subtitle1"
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              width: "95%",
              textWrap: "nowrap"
            }}
          >
            {title}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle1" fontWeight={200}>
            {price} تومان
          </Typography>
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
  );
};
