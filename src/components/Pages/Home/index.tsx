import { Grid, Skeleton } from "@mui/material";
import { GetMealResponse, GetSliderResponse } from "../../../@types/api.types";
import { API_URL } from "../../../constants/apiUrl";
import { useAxios } from "../../../hook/useAxios";
import { Slider } from "../../Basic/Slider";
import { Card } from "../../Basic/Card";
import { Link } from "react-router-dom";
import Checkout from "../../Basic/Checkout";
interface HomePageProps {}
const HomePage: React.FC<HomePageProps> = (): JSX.Element => {
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
                    <Link to={`items/${food.id}`}>
                      <Card title={food.title} price={food.price.toString()} />
                    </Link>
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
