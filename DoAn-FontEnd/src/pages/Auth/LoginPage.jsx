import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import loginImage from "./../../assets/images/loginImage.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { useState } from "react";
import { loginAction } from "../../redux/actions/authAction";
import Swal from "sweetalert2";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    if (email !== "" && password !== "")
      dispatch(loginAction({ email: email, password: password }))
        .unwrap()
        .then((response) => {
          console.log(response);
          return navigate("/");
        })
        .catch((error) => {
          Swal.fire({
            title: "Thất bại!",
            text: error.message || "Đã xảy ra lỗi khi đăng nhập.",
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
            <Grid item xs={4} className="flex items-center">
              <div>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    fontSize: "30px",
                  }}
                >
                  Đăng nhập
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    size="small"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    size="small"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Đăng nhập
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Grid item>
                        <Typography
                          onClick={() => {
                            navigate("#");
                          }}
                          fontWeight="500"
                          sx={{
                            textDecoration: "underline",
                            color: "primary.main",
                            cursor: "pointer",
                          }}
                        >
                          Quên mật khẩu?
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography
                        onClick={() => {
                          navigate("/register");
                        }}
                        fontWeight="500"
                        sx={{
                          textDecoration: "underline",
                          color: "primary.main",
                          cursor: "pointer",
                        }}
                      >
                        Đăng kí tại đây!
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};
