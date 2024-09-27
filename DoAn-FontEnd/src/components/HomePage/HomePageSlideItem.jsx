import { Box, Typography } from "@mui/material";

export default function HomePageSlideItem({ item }) {
  return (
    <>
      <Box className="relative">
        <img
          src={item.image_url}
          alt={item.title}
          className="w-full"
          style={{ height: "500px" }}
        />

        <Box className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-50 p-4">
          <Typography variant="h5" className="text-white">
            {item.title}
          </Typography>
          <Typography variant="body1" className="text-white">
            {item.description}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
