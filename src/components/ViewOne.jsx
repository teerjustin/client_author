import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios"

const ViewOne = (props) => {
    console.log(props);

    const [thisAuthor, setThisAuthor] = useState({});

    useEffect( () => {
        axios.get("http://localhost:8000/api/authors/" + props.id)
            .then( res => {
                console.log(res.data);
                setThisAuthor(res.data);
            })
            .catch()
    }, [props.id])


    return (
        <div>
            <div>
                {thisAuthor.name}
            </div>
        </div>
    )
}

export default ViewOne