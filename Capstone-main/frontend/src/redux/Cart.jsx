import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  
 
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].qty ++;
        alert("Increased Product Quantity");
      } else {
        const tempProduct = { ...action.payload };
        state.cartItems.push(tempProduct);
        alert("Added Product to Cart");
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      alert("Cart Cleared Successfully");
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      const nextCartItems = state.cartItems.filter((item) => {
       return  item.id !== action.payload.id;
      });

      state.cartItems = nextCartItems;
      alert("Removed Product Successfully");

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decrement: (state, action) => {
      const Index = state.cartItems.findIndex((item) => {
      return  item.id == action.payload.id;
      });
      
    

      if (state.cartItems[Index].qty > 1) {
        state.cartItems[Index].qty--;
        alert("Decreased Product Quantity");
      } else if (state.cartItems[Index].cartQuantity == 1) {
        const filtered = state.cartItems.filter((item) => {
          item.id !== action.payload.id;
        });
        state.cartItems = filtered;

        alert("Removed Product from the cart");
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increment : (state , action) =>{
      const Index = state.cartItems.findIndex((item)=>{
        return item.id === action.payload.id
      })

      if (state.cartItems[Index].qty >=1) {
        state.cartItems[Index].qty++
        alert('Increased Product Quantity')
      }
      
    } ,

    checkout: (state)=>{
      alert('Yay! Your Orders have been Successfully Placed.')
      state.cartItems = []
      localStorage.setItem('cartItems' , JSON.stringify(state.cartItems))


    }
  },
});

export const { addTocart, removeFromCart, clearCart, decrement , increment, checkout } =
  cartSlice.actions;
export default cartSlice.reducer;

export const selectCart = (state) => {
  return state.cart;
};
