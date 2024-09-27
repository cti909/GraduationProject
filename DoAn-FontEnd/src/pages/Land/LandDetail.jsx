import ControlNavbar from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import { getLandByIdAction } from "../../redux/actions/landAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LandDetailItem } from "../../components/Land/LandDetailItem";

export const LandDetail = () => {
  const dispatch = useDispatch();
  const { landId } = useParams();
  const land = useSelector((state) => state.land.land);
  // const isLoading = useSelector((state) => state.land.isLoading);

  useEffect(() => {
    dispatch(getLandByIdAction({ id: landId }));
  }, [dispatch, landId]);

  return (
    <>
      <ControlNavbar />

      {land && land.user && land.landManagement && (
        <LandDetailItem item={land} />
      )}

      <Footer />
    </>
  );
};
