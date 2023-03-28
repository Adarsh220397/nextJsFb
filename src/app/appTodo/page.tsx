'use client'
import React, { useEffect, useState } from "react";
import styles from '../../app/page.module.css'
import { toast } from "react-toastify";
import useAuth from "../../../hooks/userAuth/userAuth";
import { addTodo } from "../../app/api/todo/todo";
import MyComponent from "../modalComponent/page";

import {faker } from '@faker-js/faker';
import {useAuthState} from 'react-firebase-hooks/auth'
import { getApp, initializeApp } from "firebase/app";
import { useRouter } from "next/navigation";
import {auth } from '../../../firebase/page'
const AddTodo = () => {

// const userName: string = 'Ada';
//  const auth = getAuth();
const router = useRouter();
  const [user,loading,] = useAuthState(auth)

  if(loading) {
    return <div>Loading..</div>
  }
  if(!user) {
    router.push('/');
    return <div> Please sign in to continue</div>
  }

  return (
     <>
     <div className="flex flex-col">
     <div className=" text-blue-500 flex flex-col items-start ">
Signed in as: {auth.currentUser?.displayName}
          </div>
          <button className="flex flex-col items-end" onClick={()=>auth.signOut()}>
Sign out
          </button>
     </div>
         <main className={styles.main}>
          
         <div className={styles.container}>
        
  
          {/* <div className='text-3xl text-green-600 p-2'>Left</div>
          <div className="text-3xl font-bold underline" >Right</div> */}
        </div>

        <div>
    <MyComponent/>
    </div>
    </main>
   
     
     </>


  
  );
};

export default AddTodo;