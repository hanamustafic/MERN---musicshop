import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  // Payment
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="container mx-auto mt-10">
      <ProgressSteps step1 step2 />
      <div className="mt-[10rem] flex justify-around items-center flex-wrap">
        <form onSubmit={submitHandler} className="w-[40rem]">
          <h1 className="text-2xl font-semibold mb-4">Dostava</h1>
          <div className="mb-4">
            <label className="block text-white mb-2">Adresa</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Unesi adresu"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Grad</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Unesi grad"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Poštanski broj</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Unesi poštanski kod"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Zemlja</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Unesi zemlju"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Odaberi</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-pink-500"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />

                <span className="ml-2">PayPal ili Kreditna Kartica</span>
              </label>
            </div>
          </div>

          <button
            className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full"
            type="submit"
          >
            Nastavi
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;