import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import loginImage from "./../../assets/images/loginImage.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerAction } from "../../redux/actions/authAction";
import Swal from "sweetalert2";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression for phone number validation (10 digits)
    const re = /^\d{10}$/;
    return re.test(phoneNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const phoneNumber = e.target.phoneNumber.value;
    const address = e.target.address.value;
    const role = e.target.role.value;

    if (!validateEmail(email)) {
      Swal.fire({
        title: "Lỗi!",
        text: "Email không hợp lệ.",
        icon: "error",
      });
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Swal.fire({
        title: "Lỗi!",
        text: "Số điện thoại phải là 10 chữ số.",
        icon: "error",
      });
      return;
    }

    if (password.length <= 6) {
      Swal.fire({
        title: "Lỗi!",
        text: "Mật khẩu phải dài hơn 6 ký tự.",
        icon: "error",
      });
      return;
    }

    var queryParams = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      phoneNumber: e.target.phoneNumber.value,
      address: e.target.address.value,
      role: e.target.role.value,
    };

    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      phoneNumber !== "" &&
      address !== "" &&
      role !== ""
    )
      dispatch(registerAction(queryParams))
        .unwrap()
        .then((response) => {
          console.log(response);
          Swal.fire({
            title: "Thành công!",
            text: "Bạn đã đăng ký thành công.",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          });
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: "Thất bại!",
            text: error.message || "Đã xảy ra lỗi khi đăng kí.",
            icon: "error",
          });
        });
  };
  return (
    <div className="container mx-auto h-screen">
      <div className="h-full py-4 flex items-center">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            pr: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <img
                className="h-auto w-full rounded border bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
                src={loginImage}
                alt="image description"
              />
            </Grid>
            {/* part2 */}
            <Grid item xs={4} className="flex items-center">
              <form onSubmit={handleSubmit}>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    fontSize: "30px",
                  }}
                >
                  Đăng kí
                </Typography>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Name"
                  label="Họ và tên"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  size="small"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  size="small"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  size="small"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Số điện thoại"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  size="small"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="address"
                  label="Địa chỉ"
                  name="address"
                  autoComplete="address"
                  size="small"
                />
                <FormControl>
                  {/* <FormLabel id="demo-radio-buttons-group-label">
                    Vai trò
                  </FormLabel> */}
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="customer"
                    name="role"
                    className="flex flex-row items-center mt-2"
                  >
                    <FormControlLabel
                      value="customer"
                      control={<Radio />}
                      label="Khách hàng"
                      className="mr-4"
                    />
                    <FormControlLabel
                      value="farmer"
                      control={<Radio />}
                      label="Nông dân"
                      className="mr-4"
                    />
                  </RadioGroup>
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Đăng kí
                </Button>
                <Typography
                  onClick={() => {
                    navigate("/login");
                  }}
                  fontWeight="500"
                  sx={{
                    textAlign: "center",
                    textDecoration: "underline",
                    color: "primary.main",
                    cursor: "pointer",
                  }}
                >
                  Đã có tài khoản, đăng nhập tại đây!
                </Typography>
              </form>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};
