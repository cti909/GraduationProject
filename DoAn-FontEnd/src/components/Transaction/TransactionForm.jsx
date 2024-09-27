import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  FormControl,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createTransactionAction } from "../../redux/actions/transactionAction";
import Swal from "sweetalert2";

export const PaymentForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = localStorage.getItem("userId");
    var queryParams = {
      vnp_Amount: event.target.vnp_Amount.value,
      vnp_BankCode: event.target.vnp_BankCode.value,
      vnp_Locale: event.target.vnp_Locale.value,
      userId: userId,
    };
    console.log(queryParams);

    dispatch(createTransactionAction(queryParams))
      .unwrap()
      .then((response) => {
        // Hành động thành công
        console.log(response);
        window.location.href = response;

        // Swal.fire({
        //   title: "Thành công!",
        //   text: response.predictMessage,
        //   icon: "success",
        // });
      })
      .catch((error) => {
        // Hành động thất bại
        Swal.fire({
          title: "Lỗi!",
          text: error.message || "Đã xảy ra lỗi khi giao dịch.",
          icon: "error",
        });
      });
  };

  return (
    <div className="container mx-auto">
      <form className="" onSubmit={handleSubmit}>
        <div className="flex justify-between w-full">
          <div className="w-2/5">
            <ul className="list-group mb-3">
              <li className="list-group-item lh-condensed">
                <h5 className="text-center text-lg font-bold">
                  Nạp tiền vào tài khoản
                </h5>
              </li>
              <li className="list-group-item flex justify-between items-center">
                <span>Nhập số tiền cần nạp</span>
                <TextField
                  id="outlined-start-adornment"
                  name="vnp_Amount"
                  className="w-3/5"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">đ</InputAdornment>
                    ),
                  }}
                />
              </li>
            </ul>
          </div>
          <div className="w-3/5 pl-20">
            <div>
              <h4 className="text-xl font-bold">
                Chọn phương thức thanh toán:
              </h4>
              <FormControl component="fieldset" className="my-3">
                <RadioGroup defaultValue="vnp_BankCode" name="vnp_BankCode">
                  <FormControlLabel
                    value="VNPAYQR"
                    control={<Radio />}
                    label="Cổng thanh toán VNPAYQR"
                  />
                  <FormControlLabel
                    value="VNBANK"
                    control={<Radio />}
                    label="ATM-Tài khoản ngân hàng nội địa"
                  />
                  <FormControlLabel
                    value="INTCARD"
                    control={<Radio />}
                    label="Thanh toán qua thẻ quốc tế"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div>
              <h4 className="text-xl font-bold">Chọn ngôn ngữ thanh toán:</h4>
              <FormControl component="fieldset" className="my-3">
                <RadioGroup defaultValue="vnp_Locale" name="vnp_Locale">
                  <FormControlLabel
                    value="vn"
                    control={<Radio />}
                    label="Tiếng việt"
                  />
                  <FormControlLabel
                    value="en"
                    control={<Radio />}
                    label="Tiếng anh"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <Button type="submit" variant="contained" color="primary">
              Thanh toán
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
