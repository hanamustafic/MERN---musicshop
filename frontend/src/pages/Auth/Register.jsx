import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [register, { isLoading }] = useRegisterMutation();
  
    const { userInfo } = useSelector((state) => state.auth);
  
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";
  
    useEffect(() => {
      if (userInfo) {
        navigate(redirect);
      }
    }, [navigate, redirect, userInfo]);
  
    const submitHandler = async (e) => {
      e.preventDefault();
  
      if (password !== confirmPassword) {
        toast.error("Šifre se ne slažu");
      } else {
        try {
          const res = await register({ username, email, password }).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate(redirect);
          toast.success("Korisnik uspješno registrovan");
        } catch (err) {
          console.log(err);
          toast.error(err.data.message);
        }
      }
    };
  
    return (
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Registracija</h1>
  
          <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white"
              >
                Ime
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Unesite ime"
                value={username}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
  
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Adresa
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Unesite email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
  
            <div className="my-[2rem]">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Šifra
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Unesite šifru"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
  
            <div className="my-[2rem]">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white"
              >
                Potvrdi šifru
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Potvrdite šifru"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
  
            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
  
            {isLoading && <Loader />}
          </form>
  
          <div className="mt-4">
            <p className="text-white">
              Imate korisnički račun?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-pink-500 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        <img
          src="https://thumbs.dreamstime.com/b/music-shop-vector-glyph-icon-musical-instruments-store-cute-little-storefront-symbol-solid-black-eps-building-263317057.jpg"
          alt=""
          className="h-[48rem] w-[45%] xl:block md:hidden sm:hidden rounded-lg"
        />
      </section>
    );
  };

export default Register;