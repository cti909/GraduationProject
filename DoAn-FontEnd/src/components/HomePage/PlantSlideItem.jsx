import { faCircleRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { API_BASE } from "../../services/api.config";
import { useNavigate } from "react-router-dom";

export const PlantSlideItem = ({ item }) => {
  const navigate = useNavigate();

  const handleToPlantDetail = () => {
    navigate("/plant/" + item.id);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        sx={{ height: "200px" }}
        image={`${API_BASE}${item.photos}`}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          // sx={{ textAlign: "center" }}
          className="text-center font-bold"
        >
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between items-center">
        {/* <div className="flex justify-between items-center"> */}
        <IconButton aria-label="add to favorites">
          <FontAwesomeIcon icon={faHeart} className="w-6 h-6" />
        </IconButton>
        <Button
          size="small"
          color="info"
          variant="outlined"
          endIcon={<FontAwesomeIcon icon={faCircleRight} />}
          onClick={handleToPlantDetail}
        >
          Xem chi tiết
        </Button>
        {/* </div> */}
      </CardActions>
    </Card>
  );
};
