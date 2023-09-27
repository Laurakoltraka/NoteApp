import React, { useState, useEffect } from "react";
import Notebook from "./components/Notebook";
import Auth from "./components/Auth";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./database/firebase";
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
    return uid ? <Notebook uid={uid} /> : <Auth />;
};

export default App;