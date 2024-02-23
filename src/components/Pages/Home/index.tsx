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
import { useContext } from "react";
import { AppContext } from "../../../context/store";
interface HomePageProps {}
const HomePage: React.FC<HomePageProps> = (): JSX.Element => {
  const navigate = useNavigate();
  const { basket, setBasket } = useContext(AppContext);
  const { data: sliderData, isLoading: sliderLoading } = useAxios<
    null,
    GetSliderResponse[],
    null
  >({
    url: API_URL.GetSliders
  });

  const { data: mealData, isLoading: mealLoading } = useAxios<
    null,
    GetMealResponse,
    null
  >({
    url: API_URL.GetMeals
  });

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
    const alreadyExist = basket.find((x) => x.id == arg.id);
    if (alreadyExist) {
      const newBasket = basket.map((item) => {
        // az ghabl dar basket vojood darad
        if (item.id == arg.id) {
          item.Count += 1;
        }
        return item;
      });
      setBasket(newBasket);
    } else {
      setBasket([...basket, { ...arg, Count: 1 }]);
    }
  };

  const handleRemoveFromBasket = (id: number) => {
    const alreadyExist = basket.find((x) => x.id == id);
    if (alreadyExist) {
      const basketWithOutElement = basket.filter((x) => x.id != id);
      if (alreadyExist?.Count > 1) {
        const newBasket = basket.map((item) => {
          // az ghabl dar basket vojood darad
          if (item.id == id) {
            item.Count -= 1;
          }
          return item;
        });
        setBasket(newBasket);
      } else {
        setBasket(basketWithOutElement);
      }
    }
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
