import { Grid, Skeleton } from "@mui/material";
import {
  Food,
  GetMealResponse,
  GetSliderResponse
} from "../../../@types/api.types";
import { API_URL } from "../../../constants/apiUrl";
import { useAxios } from "../../../hook/useAxios";
import { Slider } from "../../Basic/Slider";
import { Card } from "../../Basic/Card";
import { useNavigate } from "react-router-dom";
import Checkout from "../../Basic/Checkout";
import {
  AddToBasket,
  RemoveFromBasket
} from "../../../redux/features/basket/basket.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useGetFoodList } from "../../../services/Quries/useGetFoodList";
import { useGetSliders } from "../../../services/Quries/useGetSliders";

interface HomePageProps {}
const HomePage: React.FC<HomePageProps> = (): JSX.Element => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const basket = useSelector<RootState>((state) => state.basket) as any[];

  const { data: sliderData, isLoading: sliderLoading } = useGetSliders();

  const { data: mealData, isLoading: mealLoading } = useGetFoodList();

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

    console.log(arg);

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

  if (sliderLoading || mealLoading) {
    return <Skeleton animation="wave" height="50vh" />;
  }
  return (
    <>
      <Slider images={sliderData?.map((item) => item.src) as string[]} />
      <Grid container spacing={2}>
        <Grid item xs={0} md={8}>
          <Grid container spacing={1}>
            {mealData?.categories.map((item) =>
              item.sub?.map((sub) =>
                sub.food.map((food) => (
                  <Grid item xs={12} md={6} key={food.id}>
                    <Card
                      showRemoveButton={
                        !!basket.find((x) => x.id == food.id)?.Count
                      }
                      image={food.img.replace("#SIZEOFIMAGE#", "560x350")}
                      title={food.title}
                      price={food.price.toString()}
                      onClick={() => navigate(`items/${food.id}`)}
                      onAddClick={() => handleAddToBasket(food)}
                      onRemoveClick={() => handleRemoveFromBasket(food.id)}
                    />
                  </Grid>
                ))
              )
            )}
          </Grid>
        </Grid>
        <Grid item xs={0} md={4}>
          <Checkout />
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
