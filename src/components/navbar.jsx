import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added hooks for routing
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const Navbar = ({ cartItems, products, onSearchResults, resetSearch }) => {
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [anchorElAccount, setAnchorElAccount] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation(); // Get current route
  const navigate = useNavigate(); // Navigate between routes

  const handleMenuClick = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };

  const handleAccountClick = (event) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAnchorElAccount(null);
  };

  const handleSearchClick = () => {
    setIsSearchActive(!isSearchActive);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      performSearch();
    }
  };

  const performSearch = () => {
    // Redirect to the homepage if not already there
    if (location.pathname !== "/") {
      navigate("/");
    }

    // Filter products based on the search query
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pass filtered results to the parent component
    onSearchResults(filteredProducts);
  };

  const handleReturnClick = () => {
    setSearchQuery(""); // Clear search query
    resetSearch(); // Reset products to default
  };

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Section */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElMenu}
            open={Boolean(anchorElMenu)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Men&apos;s Casual Shirts</MenuItem>
            <MenuItem onClick={handleMenuClose}>Men&apos;s Shoes</MenuItem>
            <MenuItem onClick={handleMenuClose}>Men&apos;s Jeans</MenuItem>
            <MenuItem onClick={handleMenuClose}>Men&apos;s Leather Jackets</MenuItem>
            <MenuItem onClick={handleMenuClose}>Men&apos;s Watches</MenuItem>
            <MenuItem onClick={handleMenuClose}>Men&apos;s Hats</MenuItem>
          </Menu>

          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              textDecoration: "none",
              color: "inherit",
              ml: 1,
            }}
            onClick={resetSearch}
          >
            KEVIN
          </Typography>
        </Box>

        {/* Center Section */}
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: "inherit"
          }}
        >
          The Store
        </Typography>

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit" onClick={handleSearchClick}>
            <SearchIcon />
          </IconButton>
          {isSearchActive && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyPress}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "0.5rem",
                  width: "200px",
                  outline: "none",
                  marginRight: "8px",
                }}
              />
              <Button
                variant="contained"
                onClick={performSearch}
                sx={{
                  backgroundColor: "#d3d3d3",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#c0c0c0",
                  },
                  marginRight: "8px",
                }}
              >
                Search
              </Button>
              <Button
                variant="outlined"
                onClick={handleReturnClick}
                sx={{
                  borderColor: "#d3d3d3",
                  color: "black",
                  "&:hover": {
                    borderColor: "#c0c0c0",
                  },
                }}
              >
                Return
              </Button>
            </Box>
          )}

          <IconButton color="inherit" onClick={handleAccountClick}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElAccount}
            open={Boolean(anchorElAccount)}
            onClose={handleAccountClose}
          >
            <MenuItem component={Link} to="/createaccount" onClick={handleAccountClose}>
              Create Account
            </MenuItem>
            <MenuItem component={Link} to="/login" onClick={handleAccountClose}>
              Login
            </MenuItem>
          </Menu>

          <IconButton component={Link} to="/cart" color="inherit">
            <Badge badgeContent={cartItems.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.number,
    })
  ),
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.number,
    })
  ).isRequired,
  onSearchResults: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  cartItems: [],
};

export default Navbar;
