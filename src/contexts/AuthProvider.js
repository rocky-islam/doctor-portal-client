import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //create user
    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    //signIn
    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // update user name photo url
    const updateUser =(userInfo) => {
        // setLoading(true);
        return updateProfile(user, userInfo);
    }

    // log out
    const logOut = () => {
        setLoading(true);
        return signOut (auth);
    }

    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log('login user is:',currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    },[])

    const authInfo = {
      createUser,
      signIn,
      user,
      logOut,
      updateUser,
      loading,
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;