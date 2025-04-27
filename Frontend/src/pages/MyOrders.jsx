import React, { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedOrderIndex, setExpandedOrderIndex] = useState(null); // State to track which order is expanded

  const getMyOrders = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummeryApi.getOrders,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setMyOrders(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyOrders();
  }, []);

  // Toggle function to expand or collapse the product details
  const toggleOrderDetails = (index) => {
    setExpandedOrderIndex(expandedOrderIndex === index ? null : index);
  };


  return (
    <div className="p-5">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 mb-5 border border-gray-300"
          >
            {/* Order Summary */}
            <div className="font-semibold text-xl mb-3">
              Order ID: {order.orderId}
            </div>
            <div className="text-sm text-gray-500 mb-3">
              <strong>Status:</strong> {order.payment_status}
            </div>

            <div className="text-sm font-semibold text-gray-800 mb-3">
              <strong>Total Bill : </strong> ₹ {order.totalAmt}
            </div>

            {/* Delivery Address */}
            <div className="text-sm text-gray-500 mb-3">
              <strong>Delivery Address : </strong>
              {order.delivery_address && (
                <>
                  {order.delivery_address.state && (
                    <span>{order.delivery_address.address_line}, </span>
                  )}
                  {order.delivery_address.city && (
                    <span>{order.delivery_address.city}, </span>
                  )}

                  {order.delivery_address.state && (
                    <span>{order.delivery_address.state}, </span>
                  )}
                  {order.delivery_address.zip && (
                    <span>- {order.delivery_address.pincode}</span>
                  )}
                </>
              )}
            </div>

            <div className="text-sm text-gray-500">
              <strong>Contact No : </strong>
              {order.delivery_address && (
                <>
                  {order.delivery_address.state && (
                    <span>{order.delivery_address.mobile} </span>
                  )}
                </>
              )}
            </div>

            {/* Show Details Button */}
            <button
              onClick={() => toggleOrderDetails(index)}
              className="text-blue-600 mt-4 mb-3 cursor-pointer"
            >
              {expandedOrderIndex === index ? "Show Less" : "Show Details"}
            </button>

            {/* Expanded Product Details */}
            {expandedOrderIndex === index && (
              <div className="mt-4 space-y-4">
                {order.products.map((product, productIndex) => (
                  <div
                    key={productIndex}
                    className="flex items-center space-x-4"
                  >
                    <img
                      src={product.productId.image[0]}
                      alt={product.productId.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <div className="font-medium">
                        {product.productId.name}
                      </div>
                      <div className="text-gray-500">
                        <strong>Quantity:</strong> {product.quantity}
                      </div>
                      <div className="text-gray-500">
                        <strong>Price:</strong> ₹{product.productId.price}
                      </div>
                      <div className="text-gray-500">
                        <strong>Total:</strong> ₹
                        {product.productId.price * product.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
