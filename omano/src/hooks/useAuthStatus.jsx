import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'

export function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const [idd, setIdd] = useState(""); // Use a state variable for idd

    useEffect(()=> {
        const auth = getAuth();
        console.log(auth.currentUser);
        setIdd(auth.currentUser?.email || ""); 
        // Update the idd state variable
        // The use of the ?. operator ensures that the email is 
        //accessed safely even if the currentUser is null.
        console.log(idd);

        onAuthStateChanged(auth, (user)=> {
            if(user){
                setLoggedIn(true);
            }
            setCheckingStatus(false);
        })
    },[]);

  return {loggedIn, checkingStatus, idd};
}
