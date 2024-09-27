import NotFoundImage from "./../../assets/images/404NotFound.jpg";

export const NotFound = () => {
  return (
    <div className="container mx-auto">
      <div className="flex h-dvh items-center justify-center">
        <img
          className="w-2/3 object-contain"
          src={NotFoundImage}
          alt="Not Found"
        />
      </div>
    </div>
  );
};
