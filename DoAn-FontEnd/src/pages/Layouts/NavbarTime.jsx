import { useEffect, useState } from "react";

export const NavbarTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const strTime = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")} ${ampm}`;
    return strTime;
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex items-center justify-center">
      <h5 className="mr-2">Ngày giờ:</h5>
      <h5 className="mr-2">{formatDate(time)}</h5>
      <h5 className="">{formatTime(time)}</h5>
    </div>
  );
};
