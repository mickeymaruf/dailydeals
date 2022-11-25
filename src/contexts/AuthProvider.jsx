import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithPopup,
    signOut

} from 'firebase/auth';
import app from '../firebase/firebase.config';

const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut = (email, password) => {
        setLoading(true);
        return signOut(auth);
    }
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const providerLogin = (provider) => {
        return signInWithPopup(auth, provider);
    }
    const updateUser = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
        })
    }
    const value = {
        user,
        loading,
        login,
        logOut,
        createUser,
        providerLogin,
        updateUser
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
    }, [])
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;