import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ProductCard from './productcard';
import PropTypes from 'prop-types';

const ProductGrid = ({ products, addToCart }) => {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        {products.map((product, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{
              marginBottom: '20px', // Space between cards
            }}
          >
            <ProductCard
              image={product.image}
              title={product.title}
              price={product.price}
              onAddToCart={() => addToCart(product)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductGrid;
