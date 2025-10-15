import React,{ useEffect, useState, useRef} from "react";
import  Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
const UserModal = ({userId, onClose}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const modalRef = useRef();
    useEffect(() => {
        const handleEsc = (e) => e.key === "Escape" && onClose();
 document.addEventListener("keydown", handleEsc);
 modalRef.current?.focus();
 return()=> document.removeEventListener("keydown", handleEsc);
    }, [onClose]);
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((res) => {
            if (res.ok) throw new Error("user not found");
                return res.json();
            })
            .then((data) => setUser(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [userId]); 
    if(loading) return <Loader/>;
    if(error) return <ErrorMessage message={error}/>;
    return(
<div  role="dialog"  aria-modal="true" ref={modalRef} style={{ position:"fixed", top :0, left:0,right:0,bottom:0,background:"white", display:"flex", justifyContent:"center", alignItems:"center",}}>
<div style={{ background:"#fff", padding:"2rem", maxWidth:"500px",width:"100%"}}>
    <button onClick={onClose} style={{float: "right"}}>Close</button>
    <h2>{user.name}</h2>
    <p><b>Username:</b>{user.username}</p>
    <P>Email" {user.email}</P>
    <p><b>Phone:</b>{user.phone}</p>
        <p><b>Website:</b>{user.website}</p>
        <p><b>Company:</b>{'${user.company?.name}(${user.company?>catchPhrase})'}</p> 
    </div>
    </div>
    );
};
    export default UserModal;