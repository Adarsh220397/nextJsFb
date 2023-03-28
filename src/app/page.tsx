"use client";

import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, increment } from "../../slices/userSlice";
import React, { useEffect, useRef } from "react";

import { Provider } from "react-redux";
import Image from "next/image";
import { Inter } from "next/font/google";
import { initFirebase } from "../../firebase/page";
import Link from "next/link";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { AppDispatch, RootState } from "../../store/page";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const app = initFirebase();
  // console.log(app, "------app----");
  // const authentication = getAuth();
  // const [user, loading] = useAuthState(authentication);
  // const provider = new GoogleAuthProvider();
  // const router = useRouter();

  // onAuthStateChanged(authentication, (user) => {
  //   // Check for user status
  // });

  // if (loading) {
  //   return <div>Loading....</div>;
  // }

  // if (user) {
  //   router.push("/appTodo");
  //   return <div>Loading...</div>; //Welcome {user.displayName}
  // }
  // const signIn = async () => {
  //   const result = await signInWithPopup(authentication, provider);

  //   console.log(result.user, "------");
  // };

  const useReference = useRef(false);
  const { entities, loading ,value} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  console.log(loading,"====loading====");
 console.log(value,"------count------")

  useEffect(() => {
    if (useReference.current === false) {
      dispatch(fetchUsers());
    }

    return () => {
      useReference.current = true;
    };
  }, []);

  return (
    <div>
      <h2>Hello</h2>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {entities?.map((user: any) => {
            // forgot return thats y the data did not display
            return (
              <div>
                <h3 key={user.id}>
                  {" "}
                  {user.name} {user.email}
                </h3>
                <h3 key={user.id}>
                  {" "}
                  {user.name} {user.email}
                </h3>
              </div>
            );
          })}{" "}
        </div>
      )}

      <button  onClick={()=> dispatch(increment())}>

        Click here!

      </button>
     
  {value}
    </div>
  );
  return (
    // <Provider store={store}>
    <section className="h-screen">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput3"
                placeholder="Email address"
              />
              <label
                htmlFor="exampleFormControlInput3"
                className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
              >
                Email address
              </label>
            </div>

            {/* <!-- Password input --> */}
            <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                type="password"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput33"
                placeholder="Password"
              />
              <label
                htmlFor="exampleFormControlInput33"
                className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
              >
                Password
              </label>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <input
                  className="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 dark:border-neutral-600 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary dark:checked:border-primary checked:bg-primary dark:checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                  type="checkbox"
                  value=""
                  id="exampleCheck3"
                  checked
                />
                <label
                  className="inline-block pl-[0.15rem] hover:cursor-pointer"
                  htmlFor="exampleCheck3"
                >
                  Remember me
                </label>
              </div>
              <a
                href="/"
                className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
              >
                Forgot password?
              </a>
            </div>

            {/* <!-- Submit button --> */}

            <div className="text-center flex flex-col gap-4 items-center">
              <div> Please sign in to continue</div>

              {/* <button onClick={signIn}>
                <div className="bg-blue-600 text-white rounded-md p-2 w-48">
                  Google Sign In
                </div>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
    // </Provider>
  );
}
