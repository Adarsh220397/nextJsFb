import { db } from "../firebase/page";
import { collection, addDoc, Timestamp, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

export default class MySingleton {
  static instance: MySingleton;

  private constructor() {
    console.log("constructor called!");
  }

  public static getInstance(): MySingleton {
    if (!MySingleton.instance) {
      MySingleton.instance = new MySingleton();
    }
    return MySingleton.instance;
  }

  public logic() {
    console.log("my logic!");
  }

  public async getItems() {
    var list = <any>[];
    const colRef = collection(db, "data");
    const snapshots = await getDocs(colRef);
    const docs = snapshots.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;

      list.push(data);
    });
    console.log(list, "----list");
    return list;
  }

  public async sendNote({ title, description, date }: any) {
    const colRef = collection(db, "data");
    console.log(title+'...'+description+';;;'+date)
    
    try {
        
 
         await addDoc(colRef, {
        title: title,
        description: description,
        date: date,
      });
      
    
      return  true;
    } catch (error) {
      console.log(error);
      
      return false;
    }
    
   
  }

  public async updateDocument({ title, description ,id}: any) {
    const colRef = doc(db, "data",id);
console.log(title,'----title')
console.log(description,'-----desc')
console.log(id,'------id')
    try {
        await updateDoc(colRef, {
            title: title,
            description: description,
            
          });
          return true;
    } catch (error) {
        console.log(error);
        return false;
    }
  }


  public async deleteDocument({id}: any) {
     const colRef = doc(db, "data",id);

console.log(id,'------id')
    try {
        await deleteDoc(colRef);
          return true;
    } catch (error) {
        console.log(error);
        return false;
    }
  }
}
