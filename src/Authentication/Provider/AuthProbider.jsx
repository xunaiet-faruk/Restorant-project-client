import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import { app } from "../Firabase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    };

    const updateuserProfile = (name, imageURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: imageURL
        });
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("New user here:", currentUser);
            setLoading(false);
        });

        return () => unsubscribe(); 
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logout,
        updateuserProfile
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
