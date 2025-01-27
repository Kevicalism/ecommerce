import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        padding: 2,
        textAlign: 'center',
        borderTop: '1px solid #ddd',
        marginTop: '40px', // Increased margin for space between footer and cards
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2024 Kevin&apos;s Store
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 1 }}>
        <Link
          href="#"
          underline="none"
          color="text.secondary"
          sx={{
            fontWeight: 'normal',
            cursor: 'pointer',
            '&:hover': {
              color: 'text.secondary',
            },
          }}
        >
          Contact Us
        </Link>
        <Link
          href="#"
          underline="none"
          color="text.secondary"
          sx={{
            fontWeight: 'normal',
            cursor: 'pointer',
            '&:hover': {
              color: 'text.secondary',
            },
          }}
        >
          Privacy Policy
        </Link>
        <Link
          href="#"
          underline="none"
          color="text.secondary"
          sx={{
            fontWeight: 'normal',
            cursor: 'pointer',
            '&:hover': {
              color: 'text.secondary',
            },
          }}
        >
          About Us
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
