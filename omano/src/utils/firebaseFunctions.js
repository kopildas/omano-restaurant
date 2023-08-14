import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const saveItem = async (data) => {
  await setDoc(doc(db, "foodItems", `${Date.now()}`), data, { merge: true });

  console.log("holo up");
};

// geting alll food items
export const getAllFoodItems = async () => {
//   const items = await getDocs(
//     query(collection(db, "foodItems"), orderBy("id", "desc"))
//   );
  
//   console.log(items);
let newData = null;

await getDocs(collection(db, "foodItems"), orderBy("id", "desc"))
  .then((querySnapshot) => {
    newData = querySnapshot.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .sort((a, b) => b.id - a.id); // Sort the array in descending order by id

    console.log(newData);
  });

return newData;


};
