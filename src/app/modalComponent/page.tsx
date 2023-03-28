"use client";
import styles from "../page.module.css";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../../firebase/page";

import Modal from "react-modal";
import Router from "next/router";
import "firebase/auth";
import { useCollection } from "react-firebase-hooks/firestore";
// import initFirebase from '../../../firebase/page';
import {
  getFirestore,
  addDoc,
  collection,
  doc,
  setDoc,
  Timestamp,
  getDoc,
  getDocs,
} from "firebase/firestore";
import Singleton from "../../../cloudFirestore/page";
import MySingleton from "../../../cloudFirestore/page";
// initFirebase();

// const provider = firebase.

const MyComponent = () => {
  let myInstance: MySingleton = MySingleton.getInstance();
  const [isOpen, setIsOpen] = useState(false);
  const [isCardOpen, setIsEditCardOpen] = useState(null);
  const [isDeleteCardOpen, setIsDeleteCardOpen] = useState(null);
  const [isInputVisible, setInputVisible] = useState(false);

  const inputToggle = () => {
    setInputVisible(!isInputVisible);
  };

  var content:any = [];
  const [editTitle, setEditTitle] = useState<any>({
  title:'',
    id:''
  }); // title

  const [deleteTitle, setDeleteTitle] = useState<any>({
    title:'',
      id:''
    }); // title
    const [deleteDescription, setDeleteDescription] = useState<string>(""); // description
  const [editDescription, setEditDescription] = useState<string>(""); // description
  const [id,setEditId] = useState<string>("")

  const [title, setTitle] = useState<string>(""); // title
  const [description, setDescription] = useState<string>(""); // description
  const [error, setError] = useState<string>(""); // error
  const [message, setMessage] = useState<string>(""); // message
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!title || !description) {
      // check for any null value
      return setError("All fields are required");
    } else {
      setIsOpen(false);

      var bValue:any = await myInstance.sendNote( {    title,
        description,
        date: Timestamp.fromDate(new Date()),})
       
 

      // await addDoc(collectionInstance, formContent)
        .then(async () => {
          console.log("Document has been added successfully");
         
        })
        .catch((error) => {
          console.log(error,'----error---');
        });
        console.log('----------${bVal}',bValue)
    }

  };
const handleDeleteFormSubmit = async (e:{preventDefault:()=>void}) => {
  e.preventDefault();

  setIsDeleteCardOpen(null);
       
      var bValue:any = await myInstance.deleteDocument({
id : (isDeleteCardOpen as any).id 
      })
       
        console.log('----------delete',bValue)
}
  const handleEditFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

   
      setIsEditCardOpen(null);

console.log(editTitle,'---editTitle');
console.log(editDescription,'--editDescription')
      
      var bValue:any = await myInstance.updateDocument({
title:editTitle.title,
description:editDescription,
id : editTitle.id
      })
       
        console.log('----------edit',bValue)
    

  };
  

  const [noteList, setNoteList] = useState<any>([]);
  

  useEffect(() => {
    const getNotes = async () => {

      try {
        const docs = await myInstance.getItems();

      setNoteList(docs);

      console.log(docs, "---------docs");
      } catch (error) {
        console.log(error)
      }
      
    };
    getNotes();
  }, []);


  const formContent = {
    title: title,
    description: description,
    date: Timestamp.fromDate(new Date()),
  };
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const customEditFormStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
console.log(isCardOpen,'-----------isCardOpen')
  return (
    <div>
      <div className=" mx-0 flex flex-col items-center py-10 px-10 ">
        <button
          onClick={() => setIsOpen(true)}
          className=" p-3 w-200 h-10 bg-black italic hover:not-italic text-gray-50 rounded-xl text-center flex items-center
                    "
        >
          Add a New Note
        </button>
      </div>
  

      {noteList.map((data: any, index: number) => {
        content.push({
          contentTitle : data.title,
          contentDesc : data.description
        })
         

        return (
          <div key={index} className="container mx-auto py-5 px-5 max-w-xl bg-white rounded-xl shadow-lg flex items-center space-x-4 flex flex-col items-center list-disc   border-2">
            <div className="container flex flex-row">
              <div className="container text-right ">
                <button key={index}className="space-x-4  hover:bg-sky-700"     onClick={(e) => {
                  
                  setIsEditCardOpen(data)
                }}>EDIT</button>
                <div className="flex flex-row space-x-4"></div>
                <button className="space-x-4  hover:bg-sky-700" onClick={(e)=>{ setIsDeleteCardOpen(data)}}>DELETE</button>
              </div>
            </div>
            {data.title}
            <br />

            {data.description}
          </div>


        );
        
      })}

      {
        <Modal isOpen={isDeleteCardOpen !==(null)}
        onRequestClose={()=> setIsDeleteCardOpen(null)}
        style ={customEditFormStyles}
        >
          <form onSubmit={handleDeleteFormSubmit}>
<div className={styles.formGroup}>
            <label>{(isDeleteCardOpen as any)?.title}</label>
          

         
          </div>
          <div className={styles.formGroup}>
            <label>{(isDeleteCardOpen as any)?.description}</label>
       
          </div>
          <div className={styles.formGroup}>
            <button type="submit">Delete</button>
          </div>

</form>

        </Modal>
      }
      {
      
          
<Modal
isOpen = {isCardOpen !== null}
onRequestClose={() => setIsEditCardOpen(null)}
style={customEditFormStyles}

>
<form onSubmit={handleEditFormSubmit}>
<div className={styles.formGroup}>
            <label>Title</label>
            <input
              type="text"
              placeholder={(isCardOpen as any)?.title}

              onChange={(e) => setEditTitle({
            title:    e.target.value,
          id :(isCardOpen as any)?.id
          })}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              placeholder={(isCardOpen as any)?.description}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <button type="submit">Edit</button>
          </div>

</form>
</Modal>
          
      
      }


      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
      >
        <form onSubmit={handleSubmit}>
          {error ? (
            <div className={styles.formGroup}>
              <p className={styles.error}>{error}</p>
            </div>
          ) : null}
          {message ? (
            <div className={styles.formGroup}>
              <p className={styles.success}>
                {message}. Proceed to <a href="/">Home</a>
              </p>
            </div>
          ) : null}
          <div className={styles.formGroup}>
            <label>Title</label>
            <input
              type="text"
              placeholder="Todo title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              placeholder="Todo description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <button type="submit"> Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default MyComponent;
