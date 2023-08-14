import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

export default function OAuth() {
  const navigate = useNavigate();

  const [{}, dispatch] = useStateValue();
  async function byGoogle() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const { displayName, email, uid, photoURL, providerData } = user;

      dispatch({
        type: actionType.SET_USER,
        user: {
          displayName,
          email,
          uid,
          photoURL,
          providerData: providerData[0],
        },
      });
      // svaing into loacal storage
      localStorage.setItem("user", JSON.stringify(providerData[0]))

      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: displayName,
          email,
          timestamp: serverTimestamp(),
        });
      }
      console.log('outh');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Could not authorize with Google');
    }
  }

  return (
    <button
      type='button'
      onClick={byGoogle}
      className='flex items-center justify-center w-full py-3 text-sm font-medium text-white uppercase transition duration-150 ease-in-out bg-red-700 rounded shadow-md px-7 hover:bg-red-800 active:bg-red-900 hover:shadow-lg'
    >
      <FcGoogle className='mx-1 text-2xl bg-white rounded' /> continue with Google account
    </button>
  );
}
