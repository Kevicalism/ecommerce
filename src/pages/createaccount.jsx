import { Box, TextField, Button, Typography, Link } from '@mui/material';

const CreateAccount = () => {
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
          Create new account
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
          Create account
        </Button>
        <Typography variant="body2" color="text.secondary" mb={2}>
          By clicking &quot;Create account,&quot; you agree to our{' '}
          <Link href="#" underline="hover">
            Terms of service
          </Link>{' '}
          and{' '}
          <Link href="#" underline="hover">
            Privacy policy
          </Link>.
        </Typography>
        <Typography variant="body2">
          Already have an account?{' '}
          <Link href="/login" underline="hover">
            Sign in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default CreateAccount;
