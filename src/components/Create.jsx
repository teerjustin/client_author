import React, {useState} from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';

const Create = (props) => {

    const [name, setName] = useState("");
    const [dbErrors, setDBErrors] = useState([])

    const formCreate = (e) => {
        e.preventDefault();
        console.log("Submit!!!!!")

        const newAuthor = {
            name: name,
        }

        axios.post("http://localhost:8000/api/authors", newAuthor)
            .then( res => {
                console.log(res);
                setName("");
                navigate("/")
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


            <form onSubmit={formCreate}>
                <div>
                    Author Name:<input type="text" value={name} onChange={ e=> setName(e.target.value)}/>
                </div>
                <button> Submit </button>
            </form>
        </div>
    )
}

export default Create