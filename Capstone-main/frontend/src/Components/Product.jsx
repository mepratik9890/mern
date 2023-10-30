/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import "../CSS/Product.css";
import { addTocart } from "../redux/Cart";
import { useNavigate } from "react-router-dom";


const Product = ({product}) => {
  const user= JSON.parse(localStorage.getItem('user'))
  const dispatch = useDispatch()
const navigate = useNavigate()
  const handleCart = (product)=>{
    if(user) {
      dispatch(addTocart(product))
      navigate('/cart')
    }

    else {
      navigate('/login')
    }

  }
  return <>
  <div className="product-holder d-flex gap-1">
    <div className="image-holder">
      <img src={product?.images} alt="product-image" />
    </div>
    <div className="details-holder d-flex flex-column gap-2 p-4">
      <div className="name">{product?.title}</div>
      <div className="pricing"> ${product?.price}</div>
      {/* <div className="desc"> {product?.description}</div> */}
      <div className="button"><button className="btn btn-danger" onClick={()=> handleCart(product)} >Add to Cart</button></div>
    </div>
  </div>
  </>
};
export default Product;
