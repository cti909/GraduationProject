import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { LandSlideItem } from "./LandSlideItem";
import { getAllLandsAction } from "../../redux/actions/landAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1280 },
    items: 4,
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

export const LandSlide = () => {
  const dispatch = useDispatch();
  const landList = useSelector((state) => state.land.lands.data);

  useEffect(() => {
    dispatch(getAllLandsAction());
  }, [dispatch]);

  return (
    <div>
      {landList && (
        <Carousel
          showDots={true}
          responsive={responsive}
          dotListClass="custom-dot-list-style"
        >
          {landList.map((item) => (
            <div className="mx-2 mb-2" key={item.id}>
              <LandSlideItem item={item} />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};
