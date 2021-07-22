import React, {useEffect, useState} from 'react'
import axios from "axios"
import {Link} from "@reach/router"

const Main = (props) => {

    const [authors, setAuthors] = useState([])
    const [dbErrors, setDBErrors] = useState([])

    useEffect( ()=> {
        getAuthorsFromDB()
    }, [])

    const getAuthorsFromDB = () => {
        axios.get("http://localhost:8000/api/authors")
            .then(res => {
                console.log(res.data);
                setAuthors(res.data);
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

    const deleteAuthor = (authorID) => {
        console.log(authorID);

        axios.delete("http://localhost:8000/api/authors/" + authorID)
            .then( res => {
                console.log(res.data);
                setAuthors(authors.filter(author => author._id !== authorID))
            })
            .catch (err => console.log(err))
    }

    return (
        <div>
            {dbErrors.map((err, index) => <p key={index}>{err}</p>)}
            <h4>All authors</h4>
            <table>
                <tr>
                    <th>
                        Author:
                    </th>
                    <th> Actions Available

                    </th>
                </tr>
                {
                    authors.map((author, i)=> {
                        return (
                                    <div key ={author._id}> 

                                    <tr>
                                        <td>
                                            <Link to={"/authors/" + author._id}>
                                                <p> {author.name} </p>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={"/authors/update/"+author._id}>
                                                Update
                                            </Link>
                                            <button onClick={ () => deleteAuthor(author._id)}> Delete</button>
                                        </td>
                                    </tr>

                                </div>

                        )
                    })
                }
            </table>
        </div>
    )
}

export default Main