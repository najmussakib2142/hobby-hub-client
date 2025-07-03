import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import app from '../firebase/firebase.config';
import { AuthContext } from './AuthContext';

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const[loading, setLoading] = useState(true)
    console.log(user);

    const createUser = (email, password) => {
        
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        // setLoading(true)
        return signOut(auth)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (currentUser)=> {
            setUser(currentUser)
            setLoading(false)
        })
        return()=> {
            unsubscribe()
        }
    },[])

    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        signIn,
        loading,
        setLoading,


    };

    return <AuthContext value={authData}>{children}</AuthContext>
};

// Initialize Firebase Authentication and get a reference to the service

export default AuthProvider;