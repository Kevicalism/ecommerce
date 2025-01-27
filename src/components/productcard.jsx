import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ProductCard = ({ image, title, price, onAddToCart }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'center',
        padding: 2,
        backgroundColor: '#f5f5f5',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <Box>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{ objectFit: 'cover', borderRadius: '8px' }}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {`$${price}`}
          </Typography>
        </CardContent>
      </Box>
      <Button
        variant="contained"
        sx={{
          background: '#e0e0e0', // Light gray background
          color: '#000', // Black text
          '&:hover': {
            background: '#d6d6d6', // Slightly darker on hover
          },
        }}
        onClick={onAddToCart}
      >
        Add to Cart
      </Button>
    </Card>
  );
};

// Prop validation
ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
