import { useEffect, useState } from "react";
import axios from "axios";
import {  useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../CSS/Orders.css";

const OrderHistory = () => {
  const [orderData, setOrderData] = useState();
  const { userID } = useParams();
 

  useEffect(() => {
    const axiosInstance = axios.create({
      withCredentials: true,
    });

    const cleanedUserID = userID.replace(":", "");
    axiosInstance
      .get(`https://mernbackend-zqf3.onrender.com/api/orders/${cleanedUserID}`)
      .then((res) => {
        setOrderData(res.data);
      })
      .catch((e) => {
        console.log("Error getting Data", e.message);
      });
  }, [userID]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const axiosInstance = axios.create({
  //         withCredentials: true
  //       });
  //       const cleanedUserID = userID.replace(":", "");

  //       const url = `http://localhost:3000/api/orders/${cleanedUserID}`;
  //       // console.log("Requesting URL:", cleanedUserID);

  //       const response = await axiosInstance.get(url);
  //       setOrderData(response.data);
  //     } catch (error) {
  //       console.log('Error getting Data', error.message);
  //     }
  //   };

  //   fetchData();
  // }, [userID]);

  return (
    <>
      <div className='container'>
        {orderData?.length > 0 ? (
          <div>
            <h2 className="userId">Order History for User ID {userID}</h2>
            <div className='titles'>
              <h3 className='product-title'>Product</h3>
              <h3 className='price'>Price</h3>
              <h3 className='quantity'>Quantity</h3>
              <h3 className='total'>Total</h3>
            </div>
            <div className='order-history-grid'>
              {orderData.map((order, index) => (
                <div key={index} className='order-item'>
                  <ul>
                    {order.orders.map((item, itemIndex) => (
                      <li key={itemIndex} className='order-item-details'>
                        <div className='order-img d-flex align-items-center'>
                          <img src={item.images} alt='product-img' />
                          <h5>{item.title}</h5>
                        </div>
                        <h5> ${item.price}</h5>
                        <h5> {item.qty}</h5>
                        <h5>${item.price * item.qty}</h5>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='orders'>
            <h4>You have not Purchased anything yet</h4>
            <Link
              to={"/"}
              className='order-link d-flex justify-content-center gap-1'
            >
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
              <p>Continue Shopping</p>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
export default OrderHistory;
