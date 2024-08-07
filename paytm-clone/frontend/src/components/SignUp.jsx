import { useState } from "react";
import { Link } from "react-router-dom";
export default function SignUp() {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  function onclickHandler(e) {
    // e.preventDefault();
    setInput(e.target.value);
    console.log(e.target.value);
    setInput;
  }

  function onSubmit(event) {
    event.preventDefault();
    console.log(event);
  }
  return (
    <div className="bg-gray-400 h-screen w-screen flex flex-row items-center justify-center">
      <div className=" h-[650px] w-[400px] rounded-md bg-[#ffffff] flex flex-col text-center">
        <div className="">
          <h2 className="text-2xl font-bold mt-3 mb-0"> SignUp</h2> <br />
          <h3 className="font-normal text-gray-400">
            Enter your information to create an account
          </h3>
        </div>
        <div className="mt-6 mr-3 ml-3">
          <h2 className="font-bold pb-3 text-left ">First Name </h2>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="John"
              className="rounded-md border-solid border-gray-300 border-[1px] w-full h-[40px] text-[18px]  p-[13px]"
            />
            <h2 className="font-bold text-left mt-6 pb-3 pl-2 pr-2">
              Last Name
            </h2>

            <input
              type="text"
              placeholder="Doe"
              className="rounded-md border-solid border-gray-300 border-[1px] w-full h-[40px] text-[18px]  p-[13px]"
            />
            <h2 className="font-bold text-left mt-6 pb-3 pl-2 pr-2">Email</h2>

            <input
              type="email"
              placeholder="johndoe@gmail.com"
              className="rounded-md border-solid border-gray-300 border-[1px] w-full h-[40px] text-[18px] p-[13px]"
            />
            <h2 className="font-bold text-left mt-6 pb-3 pl-2 pr-2">
              Password
            </h2>

            <input
              type="text"
              className="rounded-md border-solid border-gray-300 border-[1px] w-full h-[40px] text-[18px] p-[13px]"
            />
            <button
              type="submit"
              className="mt-[14px] bg-black text-white w-full h-[40px] text-[18px] rounded-md"
            >
              Submit
            </button>

            <div>
              <p>
                Already have an account?
                <Link to="/signin" className="underline pl-[8px]">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
