import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {navigate} from "@reach/router";

const Update = ({id}) => {

    const [name, setName] = useState("");
    const [dbErrors, setDBErrors] = useState([])


    useEffect( () => {
        axios.get("http://localhost:8000/api/authors/" + id)
            .then( res => {
                console.log(res.data);
                // setProductToUpdate(res.data);
                //or
                setName(res.data.name);
            })
            .catch(err => console.log(err))
    }, [id])

    const formUpdate = (e) => {
        e.preventDefault();
        axios.put("http://localhost:8000/api/authors/" + id, {
            name: name,
        })
            .then( updatedAuthor => {
                console.log("SUCCESSFUL UPDATE!!!!! :", updatedAuthor);
                navigate("/");
            })
            .catch( err => {
                console.log("CATCH triggered");
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setDBErrors(errorArr);
            })
    }

    return (
        <div>
            {dbErrors.map((err, index) => <p key={index}>{err}</p>)}
            <form onSubmit={formUpdate}>
                <div>
                    Product Name:<input type="text" value={name} onChange={ e=> setName(e.target.value)}/>
                </div>
                <button> Submit </button>
            </form>
        </div>
    )
}

export default Update