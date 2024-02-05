//React
import { useState,useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

//Firebase
import auth from "./config/firebase";

//Slice
import { SignInDetails, SignOutDetails } from "./Slice/userSlice";

const Container=({ children })=> {
    const [loading, setLoading] = useState(true);
    const dispatch =useDispatch()

    const FetchUserDetails=async(sid)=>
    {
        try
        {
            const { data } = await axios.post("https://drive-easy-host-server.vercel.app/findUser", { sid });
            dispatch(SignInDetails(data))
            setLoading(false);
        }
        catch(error)
        {
            console.log(error)
        }
    }

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
        if (user) {
            console.log("Logged")
            FetchUserDetails(user.uid)
        }
        else {
            console.log("Logged off")
            setLoading(false);
            dispatch(SignOutDetails())
        }
    })
    }, []);

    if (loading) {
        return (
            <h2>Loading</h2>
            )
    }

    return (
        children
    )
}

export default Container;