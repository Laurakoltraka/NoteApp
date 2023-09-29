import React, { useState, useEffect } from "react";
import NotePosts from "./components/NotePosts"
import Auth from "./components/userAuthentication";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./database/firebaseConfig";
import './index.css'

const App = () => {
    const [uid, setUid] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid);
                setLoading(false);
            } else {
                setUid(null);
                setLoading(false);
            }
        });
    }, []);
    if (loading) return <div>Loading...</div>;
    return uid ? <NotePosts uid={uid} /> : <Auth />;
};

export default App;