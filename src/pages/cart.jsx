import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  IconButton,
} from '@mui/material'; // Only Material-UI components
import DeleteIcon from '@mui/icons-material/Delete'; // Import delete icon
import PropTypes from 'prop-types'; // For type checking
import { useNavigate } from 'react-router-dom'; // For navigation

const Cart = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4,
        p: 4,
        alignItems: 'flex-start', // Align both sections to the top
      }}
    >
      {/* Left Side: Selected Items */}
      <Box
        sx={{
          flex: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Your Cart
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {cartItems.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            Your cart is currently empty.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {cartItems.map((item, index) => (
              <Card
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between', // Align content evenly
                  gap: 2,
                  p: 2,
                  boxShadow: 'none',
                  border: '1px solid #ddd',
                  borderRadius: 2,
                  height: '100px', // Ensure consistent height
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{ width: 80, height: 80, borderRadius: 2 }}
                  />
                  <CardContent sx={{ padding: 0 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {`Price: $${item.price}`}
                    </Typography>
                  </CardContent>
                </Box>
                <IconButton
                  color="error"
                  onClick={() => removeFromCart(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Card>
            ))}
          </Box>
        )}
      </Box>

      {/* Right Side: Total Price & Checkout */}
      <Box
        sx={{
          flex: 1,
          textAlign: 'center',
          border: '1px solid #ccc',
          borderRadius: 2,
          p: 3,
          backgroundColor: '#f9f9f9',
          maxWidth: '300px',
          alignSelf: 'flex-start', // Align it to the top of the left box
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Cart Total
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6" gutterBottom>{`$${calculateTotal()}`}</Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'black', // Black background
            color: 'white', // White text for contrast
            '&:hover': {
              backgroundColor: '#333', // Darker shade for hover effect
            },
          }}
          size="large"
          onClick={() => navigate('/checkout')}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

// Prop validation
Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default Cart;
