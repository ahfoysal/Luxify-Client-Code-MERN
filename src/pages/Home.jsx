import { useLoaderData } from "react-router-dom";

import Banner from "../components/home/Banner";
import BrandsSlider from "../components/home/Slider";
import Featured from "../components/home/Featured";
import Promo from "../components/home/Promo";

const Home = () => {
  const items = useLoaderData();

  return (
    <div>
      <Banner />
      <BrandsSlider items={items} />
      <Featured items={items} />
      <Promo />
    </div>
  );
};

export default Home;
