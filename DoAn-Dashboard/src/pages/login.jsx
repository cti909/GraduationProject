import { Helmet } from 'react-helmet-async';

import { LoginView } from 'src/sections/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      {/* title in web tab */}
      <Helmet>
        <title>Login</title>
      </Helmet>

      <LoginView />
    </>
  );
}
