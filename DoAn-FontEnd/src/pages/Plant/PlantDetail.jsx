import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ControlNavbar from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import { getPlantByIdAction } from "../../redux/actions/plantAction";
import { PlantDetailItem } from "../../components/Plant/PlantDetailItem";

export const PlantDetail = () => {
  const dispatch = useDispatch();
  const { plantId } = useParams();
  const plant = useSelector((state) => state.plant.plant);
  // const isLoading = useSelector((state) => state.land.isLoading);

  useEffect(() => {
    dispatch(getPlantByIdAction({ id: plantId }));
  }, [dispatch, plantId]);

  return (
    <>
      <ControlNavbar />

      {plant && <PlantDetailItem item={plant} />}

      <Footer />
    </>
  );
};
