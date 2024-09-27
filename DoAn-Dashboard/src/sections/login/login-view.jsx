import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import authService from '../../_mock/user';
import loginImage from '../../../public/assets/loginImage.jpg';

export default function LoginView() {
  const navigate = useNavigate();
  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (email !== '' && password !== '') {
      try {
        const loginResponse = await authService.login({
          email: e.target.email.value,
          password: e.target.password.value,
        });

        console.log(loginResponse);
        // navigate(from, { replace: true });
        navigate('/');
      } catch (error) {
        if (error.response) {
          Swal.fire({
            title: 'Lỗi!',
            text: error.response.data.message || 'Bạn cần nhập thông tin',
            icon: 'error',
          });
        }
      }
    }
  };

  return (
    <div className="container mx-auto h-screen">
      <div className="h-full py-4 flex items-center">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            pr: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <img
                className="h-auto w-full rounded border bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
                src={loginImage}
                alt="description"
              />
            </Grid>
            <Grid item xs={4} className="flex items-center">
              <div>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    textAlign: 'center',
                    fontSize: '30px',
                  }}
                >
                  Đăng nhập Admin
                </Typography>
                {/* form */}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Đăng nhập
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Grid item>
                        <Typography
                          onClick={() => {
                            navigate('#');
                          }}
                          fontWeight="500"
                          sx={{
                            textDecoration: 'underline',
                            color: 'primary.main',
                            cursor: 'pointer',
                          }}
                        >
                          Quên mật khẩu?
                        </Typography>
                      </Grid>
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
}
