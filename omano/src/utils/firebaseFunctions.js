import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDocs,
  orderBy,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebase";

export const saveItem = async (data) => {
  await setDoc(doc(db, "foodItems", `${Date.now()}`), data, { merge: true });

  console.log("holo up");
};

// export const saveTableResrv = async (data,date,time) => {
//   await setDoc(doc(db, "Reservation", `${date}${time}`), data, { merge: true });

//   console.log("holo up data");
// };

export const saveTableResrv = async (data, user, table) => {
  console.log("holo up data");
  const reservationRef = doc(db, "reservation", `${user}${table}`); // Create a DocumentReference

  try {
    await setDoc(reservationRef, data, { merge: true });
    console.log("Reservation data saved successfully");
  } catch (error) {
    console.error("Error saving reservation data: ", error);
  }
}


export const getAllReservationData = async () => {
  //   const items = await getDocs(
  //     query(collection(db, "foodItems"), orderBy("id", "desc"))
  //   );
    
  //   console.log(items);
  let newData = null;
  
  await getDocs(collection(db, "reservation"), orderBy("id", "desc"))
    .then((querySnapshot) => {
      newData = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => b.id - a.id); // Sort the array in descending order by id
  
      // console.log(newData);
    });
  
  return newData;
  
  
  };



// export const editItem = (data,userId) => {
//   set(ref(db, 'foodItems/' + userId), data)
//   .then(() => {
//     // Data saved successfully!
//     console.log("Data saved successfully!");
//   })
//   .catch((error) => {
//     // The write failed...
//     console.log("The write failed...");
//   });
// }

export const editItem =  ( updatedData,itemId) => {
  const docRef = doc(db, "foodItems", itemId);
  
  updateDoc(docRef, updatedData)
  .then(docRef => {
      console.log("A New Document Field has been added to an existing document");
  })
  .catch(error => {
      console.log(error);
  })
};




export const deleteItem = (itemID) => {
  const docRef = doc(db, "foodItems", itemID);

deleteDoc(docRef)
.then(() => {
    console.log("Entire Document has been deleted successfully.")
})
.catch(error => {
    console.log(error);
})

}




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

    // console.log(newData);
  });

return newData;


};
