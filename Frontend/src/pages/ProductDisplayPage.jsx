import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import Loading from "../components/Loading";
import AddToCartButtonDispley from "../components/AddToCartButtonDispley";
import CartMobileLink from "../components/CartMobileLink";

const ProductDisplayPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState(0);

  const productId = params.product.split("-").slice(-1).toString();

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummeryApi.getSingleProductWithId,
        data: {
          productId: productId,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setProduct(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [params]);

  return (
    <section>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto p-4 grid lg:grid-cols-4 bg-blue-50">
          <div className="col-span-2">
            <div className="bg-white rounded lg:min-h-[70vh] lg:max-h-[70vh] min-h-56 max-h-56 h-full w-full">
              <img
                src={product?.image?.[image]}
                alt=""
                className="w-full h-full object-scale-down"
              />
            </div>

            <div className="grid mt-5">
              <div className="flex flex-wrap gap-3 w-full overflow-x-auto">
                {product?.image?.map((img, index) => {
                  return (
                    <div
                      className="w-20 h-20 shadow-md cursor-pointer"
                      key={index}
                    >
                      <img
                        src={img}
                        alt={"min-image"}
                        onClick={() => setImage(index)}
                        className="h-full w-full object-scale-down"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-4 lg:pl-7 col-span-2">
            <p className="bg-green-300 w-fit py-1 px-4 rounded-full text-xs">
              10 MIN
            </p>
            <h2 className="text-xl font-semibold lg:text-4xl mt-5">
              {product.name}
            </h2>
            <p className="mt-5 text-gray-600 font-bold">{product.unit}</p>

            <hr className="h-[1px] mt-5 bg-gray-300" />

            <p className="mt-5 text-xl font-semibold text-gray-700">Price</p>

            <div className="mt-5 w-fit px-8 py-2 font-bold rounded border-green-600 border-[2px] tracking-normal text-xl text-gray-700">
              ₹ {product.price}
            </div>

            {product?.stock == 0 ? (
              <button className="bg-green-500 text-white font-semibold rounded mt-5 px-10 py-3 cursor-crosshair">
                OUT OF STOCK
              </button>
            ) : (
              <div className="mt-10 w-fit">
                <AddToCartButtonDispley product={product} />
              </div>
            )}
          </div>
        </div>
      )}

      <CartMobileLink />
    </section>
  );
};

export default ProductDisplayPage;
