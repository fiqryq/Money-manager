import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import LoginButton from "../components/LoginButton";
import { auth } from "../firebase/firebase-config";
import hero from "../assets/hero.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((response) => {
        localStorage.setItem("token", response.user.uid);
        localStorage.setItem("profile", JSON.stringify(response.user));
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="bg-slate-100 h-screen">
      <div className="container mx-auto p-6">
        <section>
          <div className="flex space-x-5 font-lg cursor-pointer text-md">
            <p>Home</p>
            <p>About</p>
          </div>
        </section>
        <section>
          <div className="flex my-24 items-center">
            <div className="space-y-5">
              <h1 className="text-5xl font-bold">
                Track your money with Money Manager.
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
                necessitatibus.
              </p>
              <LoginButton Login={signInWithGoogle} />
            </div>
            <div>
              <img src={hero} alt="hero" width={1000} height={1000} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
