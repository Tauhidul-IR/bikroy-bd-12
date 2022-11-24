import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth'

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('user observing');
            setUser(currentUser)
            setLoading(false);
        });
        return () => unsubscribe();
    }, [])


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // LogIn user ----------------------
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    // Logout -----------------------------------
    const logOutUser = () => {
        setLoading(true);
        return signOut(auth)
    }

    //Update user
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    }

    //googleSignIn
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }


    //Reset password
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }


    const authInfo = {
        createUser,
        loginUser,
        logOutUser,
        user,
        updateUser,
        loading,
        googleSignIn,
        resetPassword
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;