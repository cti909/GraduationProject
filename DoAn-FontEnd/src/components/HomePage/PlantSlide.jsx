import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlantsAction } from "../../redux/actions/plantAction";
import { PlantSlideItem } from "./PlantSlideItem";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1280 },
    items: 5,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1280, min: 768 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export const PlantSlide = () => {
  const dispatch = useDispatch();
  const plantList = useSelector((state) => state.plant.plants.data);
  const [queryParams, setQueryParams] = useState({
    topSelect: 6,
    page: 1,
    pageSize: 8,
    searchValue: "",
    sortBy: "CreatedAt",
    sortType: "asc",
  });

  useEffect(() => {
    dispatch(getAllPlantsAction(queryParams));
  }, [dispatch]);

  return (
    <div>
      {plantList && (
        <Carousel
          showDots={true}
          responsive={responsive}
          dotListClass="custom-dot-list-style"
        >
          {plantList.map((item) => (
            <div className="mx-2 mb-2" key={item.id}>
              <PlantSlideItem item={item} />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};
