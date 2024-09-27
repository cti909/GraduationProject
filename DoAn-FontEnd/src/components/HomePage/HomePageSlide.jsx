import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import homepage1 from "./../../assets/images/homepage1.png";
import homepage2 from "./../../assets/images/homepage2.jpg";
import homepage3 from "./../../assets/images/homepage3.jpg";
import HomePageSlideItem from "./HomePageSlideItem";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1280 },
    items: 1,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1280, min: 768 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const slideData = [
  {
    id: 1,
    title: "Nông Nghiệp Thông Minh",
    description:
      "Ứng dụng công nghệ cao để tối ưu hóa quá trình sản xuất nông nghiệp.",
    image_url: homepage1,
  },
  {
    id: 2,
    title: "Kết Nối Nông Dân Với Khách Hàng",
    description:
      "Tạo cầu nối giữa nông dân và người tiêu dùng để đảm bảo chất lượng sản phẩm.",
    image_url: homepage2,
  },
  {
    id: 3,
    title: "Rau Củ Quả Hữu Cơ An Toàn",
    description:
      "Cung cấp rau củ quả hữu cơ, đảm bảo an toàn và dinh dưỡng cho mọi gia đình.",
    image_url: homepage3,
  },
];

const slideHomePage = slideData.map((item) => (
  <div key={item.id}>
    <HomePageSlideItem item={item} />
  </div>
));

export const HomePageSlide = () => {
  return (
    <div>
      <Carousel
        showDots={true}
        responsive={responsive}
        // infinite={true}
        autoPlaySpeed={1}
        // customTransition="all 2"
        transitionDuration={1}
        dotListClass="custom-dot-list-style"
      >
        {slideHomePage}
      </Carousel>
    </div>
  );
};
