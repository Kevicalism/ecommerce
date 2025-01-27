import { Box, TextField, Button, Typography, Link } from '@mui/material';

const Login = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: '#f9fafb',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Sign in
        </Typography>
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
          color="primary"
        >
          Sign in
        </Button>
        <Typography variant="body2" mb={1}>
          <Link href="#" underline="hover">
            Forgot your password?
          </Link>
        </Typography>
        <Typography variant="body2">
          Don&apos;t have an account?{' '}
          <Link href="/createaccount" underline="hover">
            Create account
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
