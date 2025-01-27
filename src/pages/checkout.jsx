import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Divider,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import PropTypes from "prop-types";

const Checkout = ({ cartItems }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [suggestions, setSuggestions] = useState([]); // Address suggestions
  const [loadingLocation, setLoadingLocation] = useState(false); // Loading state
  const [debounceTimeout, setDebounceTimeout] = useState(null); // Debouncing for API calls

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (event) => {
    const query = event.target.value;
    setFormData({ ...formData, address: query });

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    setDebounceTimeout(
      setTimeout(async () => {
        if (query.length > 2) {
          try {
            setLoadingLocation(true);
            const response = await fetch(
              `https://nominatim.openstreetmap.org/search?q=${query}, United States&format=json&addressdetails=1`
            );
            const data = await response.json();
            setSuggestions(data);
          } catch (error) {
            console.error("Error fetching address suggestions:", error);
            setSuggestions([]);
          } finally {
            setLoadingLocation(false);
          }
        } else {
          setSuggestions([]);
        }
      }, 300)
    );
  };

  const handleSuggestionSelect = (suggestion) => {
    const address = suggestion.address;

    const road = address?.road || "";
    const houseNumber = address?.house_number || "";
    const city =
      address?.city || address?.town || address?.village || "";
    const state = address?.state || "";
    const postalCode = address?.postcode || "";

    setFormData({
      ...formData,
      address: `${houseNumber} ${road}`.trim(),
      city: city,
      state: state,
      postalCode: postalCode,
    });
    setSuggestions([]);
  };

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          autofillAddress(latitude, longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          alert("Could not retrieve location. Please enable location services.");
          setLoadingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const autofillAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
      );
      const data = await response.json();
      if (data?.address) {
        const road = data.address?.road || "";
        const houseNumber = data.address?.house_number || "";
        const city =
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          "";
        const state = data.address?.state || "";
        const postalCode = data.address?.postcode || "";

        setFormData({
          ...formData,
          address: `${houseNumber} ${road}`.trim(),
          city: city,
          state: state,
          postalCode: postalCode,
        });
      } else {
        alert("Could not determine address. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching reverse geocode:", error);
      alert("Error fetching your location. Please try again.");
    } finally {
      setLoadingLocation(false);
    }
  };

  const resetAddress = () => {
    setFormData({ ...formData, address: "", city: "", state: "", postalCode: "" });
    setSuggestions([]);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Checkout
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <Box sx={{ position: "relative" }}>
          <TextField
            label="Street Address"
            name="address"
            value={formData.address}
            onChange={handleAddressChange}
            fullWidth
            required
          />
          {loadingLocation && <CircularProgress size={24} sx={{ mt: 2 }} />}
          {suggestions.length > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 999,
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                maxHeight: "200px",
                overflowY: "auto",
                padding: "8px",
              }}
            >
              {suggestions.map((suggestion, index) => {
                const address = suggestion.address;
                const formattedAddress = `${address?.road || "Unknown Street"}, ${
                  address?.city || address?.town || "Unknown City"
                }, ${address?.state || "Unknown State"} ${address?.postcode || ""}`.trim();

                return (
                  <MenuItem
                    key={index}
                    onClick={() => handleSuggestionSelect(suggestion)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      fontSize: "14px",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                  >
                    <span
                      style={{
                        marginRight: "10px",
                        fontSize: "18px",
                        color: "#666",
                      }}
                    >
                      📍
                    </span>
                    {formattedAddress}
                  </MenuItem>
                );
              })}
            </Box>
          )}
        </Box>
        <TextField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Postal Code"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          fullWidth
          required
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleGetLocation}
            disabled={loadingLocation}
          >
            {loadingLocation ? "Fetching Location..." : "Use My Location"}
          </Button>
          <Button variant="contained" color="error" onClick={resetAddress}>
            Reset Address
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" fontWeight="bold">
        Total: ${calculateTotal()}
      </Typography>

      <Button
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: "black",
          color: "white",
          "&:hover": {
            backgroundColor: "#333",
          },
        }}
        fullWidth
        size="large"
        onClick={() => console.log("Checkout triggered")}
      >
        Proceed to Payment
      </Button>
    </Box>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Checkout;
