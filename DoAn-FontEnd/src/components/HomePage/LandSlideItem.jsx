import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { API_BASE } from "../../services/api.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const LandSlideItem = ({ item }) => {
  const navigate = useNavigate();

  const handleToLandDetail = () => {
    navigate("/land/" + item.id);
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
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tỉnh: {item.province}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Diện tích: {item.size} (m2)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Đất trồng cây lâu năm:{" "}
          {item.landManagement.isPerennialTree === true ? "Có" : "Không"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Trạng thái:{" "}
          {item.landManagement.isRented === true
            ? "Đã có người thuê"
            : "Chưa thuê"}
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
          onClick={handleToLandDetail}
        >
          Xem chi tiết
        </Button>
        {/* </div> */}
      </CardActions>
    </Card>
  );
};
