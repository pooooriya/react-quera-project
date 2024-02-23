import { Button, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Food } from "../../../@types/api.types";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  AddToBasket,
  RemoveAllBasket,
  RemoveFromBasket
} from "../../../redux/features/basket/basket.slice";
interface CheckoutProps {}
const Checkout: React.FC<CheckoutProps> = (): JSX.Element => {
  // const { state, dispatch } = useContext(AppContext);

  const basket = useSelector<RootState>((state) => state.basket) as any[];
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveBasket = () => {
    dispatch(RemoveAllBasket());
  };

  const handleAddToBasket = (arg: Food) => {
    // ravash 1:
    // 1. age nabuud bayd be list ezafe beshe
    // 2. age ezafe shud byd be count esh ezafe beshe
    // const alreadyExist = basket.find((x) => x.id == arg.id); // undefiend
    // if (alreadyExist) {
    //   // alreadyExist.Count += 1;
    //   // const basketWithOutElement = basket.filter((x) => x.id != arg.id);
    //   // // Bug
    //   // setBasket([...basketWithOutElement, alreadyExist]);
    // } else {
    //   setBasket([...basket, { ...arg, Count: 1 }]);
    // }

    // ravash 2:
    // const alreadyExist = basket.find((x) => x.id == arg.id);
    // if (alreadyExist) {
    //   const newBasket = basket.map((item) => {
    //     // az ghabl dar basket vojood darad
    //     if (item.id == arg.id) {
    //       item.Count += 1;
    //     }
    //     return item;
    //   });
    //   setBasket(newBasket);
    // } else {
    //   setBasket([...basket, { ...arg, Count: 1 }]);
    // }

    // ravash 3.
    dispatch(AddToBasket(arg));
  };

  const handleRemoveFromBasket = (id: number) => {
    // const alreadyExist = basket.find((x) => x.id == id);
    // if (alreadyExist) {
    //   const basketWithOutElement = basket.filter((x) => x.id != id);
    //   if (alreadyExist?.Count > 1) {
    //     const newBasket = basket.map((item) => {
    //       // az ghabl dar basket vojood darad
    //       if (item.id == id) {
    //         item.Count -= 1;
    //       }
    //       return item;
    //     });
    //     setBasket(newBasket);
    //   } else {
    //     setBasket(basketWithOutElement);
    //   }
    // }
    dispatch(RemoveFromBasket(id));
  };
  return (
    <Stack border="2px solid #e7e7e7" borderRadius={5} p={2} spacing={4}>
      <Stack
        borderBottom="1px solid #e7e7e7"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography>
          سبد خرید (
          {basket.reduce((accumlator, currentvalue) => {
            return currentvalue.Count + accumlator;
          }, 0)}
          )
        </Typography>
        <IconButton onClick={handleRemoveBasket}>
          <DeleteIcon />
        </IconButton>
      </Stack>
      <Stack>
        {basket?.map((item) => (
          <Stack flexDirection="row" justifyContent="space-between">
            <Stack>
              <Typography>{item.title}</Typography>
              <Typography>{item.price} تومان</Typography>
            </Stack>
            <Stack>
              <Stack direction="row">
                <IconButton onClick={() => handleAddToBasket(item)}>
                  <AddIcon />
                </IconButton>
                <Typography>{item.Count}</Typography>
                <IconButton onClick={() => handleRemoveFromBasket(item.id)}>
                  <RemoveIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography>هزینه ی کل</Typography>
        <Typography>
          {basket.reduce((accumlator, currentvalue) => {
            return currentvalue.Count * currentvalue.price + accumlator;
          }, 0)}
          تومان
        </Typography>
      </Stack>
      <Stack>
        <Button variant="contained">تکمیل سفارش</Button>
      </Stack>
    </Stack>
  );
};

export default Checkout;
