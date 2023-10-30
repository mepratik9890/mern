import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decrement,
  removeFromCart,
  selectCart,
  increment, 
  checkout
} from "../redux/Cart";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/CartPage.css";
import axios from "axios";
const user = JSON.parse(localStorage.getItem('user'))

const CartPage = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveProduct = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleDecrement = (product)=>{
    dispatch(decrement(product))
  }

  const handleIncrement = (product)=>{
    dispatch(increment(product))
  }


  const handleCheckout = ()=>{
    const orders = {
      orders: cart.cartItems ,
      user : user.id
    }
    

      const axiosInstance = axios.create({
        withCredentials: true
      })
  
      axiosInstance.post('https://mernbackend-zqf3.onrender.com/api/orders' , orders)
      .then((res)=> {
        dispatch(checkout())
        navigate('/')
    })
      .catch((error)=> console.log('Error Occurred' , error.message))
  
  }
  // calculating subtotal

  const subtotal = cart.cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.price * cartItem.qty;
  }, 0);

  // Posting Orders Data to Database 


  

  return (
    <div className='cart-container'>
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className='cart-empty'>
          <p>Your cart is currently empty</p>
          <div className='start-shopping'>
            <Link to='/'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='currentColor'
                className='bi bi-arrow-left'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className='titles'>
            <h3 className='product-title'>Product</h3>
            <h3 className='price'>Price</h3>
            <h3 className='quantity'>Quantity</h3>
            <h3 className='total'>Total</h3>
          </div>
          <div className='cart-items'>
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div className='cart-item' key={cartItem.id}>
                  <div className='cart-product'>
                    <img src={cartItem.images} alt={cartItem.name} />
                    <div>
                      <h3>{cartItem.title}</h3>
                      <p>{cartItem.desc}</p>
                      <button onClick={() => handleRemoveProduct(cartItem)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className='cart-product-price'>${cartItem.price}</div>
                  <div className='cart-product-quantity'>
                    <button onClick={()=> handleDecrement(cartItem)}>-</button>
                    <div className='count'>{cartItem.qty}</div>
                    <button onClick={()=>handleIncrement(cartItem)}>+</button>
                  </div>
                  <div className='cart-product-total-price'>
                    ${cartItem.price * cartItem.qty}
                  </div>
                </div>
              ))}
          </div>
          <div className='cart-summary'>
            <button className='clear-btn' onClick={() => handleClearCart()}>
              Clear Cart
            </button>
            <div className='cart-checkout'>
              <div className='subtotal'>
                <span>Subtotal</span>
                <span className='amount'>${subtotal}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button onClick={()=> handleCheckout()}>Check out</button>
              <div className='continue-shopping'>
                <Link to='/'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    fill='currentColor'
                    className='bi bi-arrow-left'
                    viewBox='0 0 16 16'
                  >
                    <path
                      fillRule='evenodd'
                      d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CartPage;
