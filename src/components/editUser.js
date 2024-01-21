import React, {useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Card, Container, Button } from "react-bootstrap";
import { GetAllVideos, UpdatePost ,loadUser} from "../urls/videoService";
import {useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../urls/baseUrl";
import { toast } from "react-toastify";
const Edit = () => {
    let {id} = useParams();
    let navigate = useNavigate();
    // we want to access the parameters of the current route
    const [user, setUser] = useState({
        id: " ",
        title: "",
        tags: "",
        description: " "
    });
    const { title, tags , description  } = user;
 
    const onInputChange = (e) => {
        //spread operator (since we are giving only name field)
        //new update will keep on adding
        setUser({ ...user, [e.target.name]: e.target.value });
        //check in components
    };
  
    const onSubmit = async (e) => {
        e.preventDefault();
        //backtick character (template character)
        await axios.put(BASE_URL+`/update/${id}`, user).then((res)=>{
            toast.success("user updated successfully!!!")
            console.log(res.data);
            toast.success("Video Uploaded with Information!!")
            alert("user updated");
            navigate("/view");
        }).catch((error)=> {
            toast.error("cant update user")
            alert("Error occured while updating user")
        });
    
        
       
    };
    useEffect(()=> {
        loadUser(id).then((resp)=>{
            console.log("response" ,resp.data);
        })
        console.log(id);
    },[]);
    
   
 
 
    return (
        <div className="container">
             <Button className="p-4" variant="primary" size="lg" href="/view">
          Back to view
        </Button>
            <div className="row">
                {/*col-md-6 : colums of medium size with 6 span */}
                <div
                    className={"col-md-6 offset-md-3 border rounded p-4 mt-2 shadow"}>
                    <h2 className={"text-center m-4"}>Edit User</h2>
                    <form onSubmit={onSubmit}>
                        <div className={"mb-3"}>
                            <label htmlFor={"title"} className={"form-label"}>
                                Title
                            </label>
                            <input
                                type={"text"}
                                className={"form-control"}
                                placeholder={"Enter your title"}
                                name={"title"}
                                value={title}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className={"mb-3"}>
                            <label htmlFor={"Name"} className={"form-label"}>
                                Tags
                            </label>
                            <input
                                type={"text"}
                                className={"form-control"}
                                placeholder={"Enter Tags"}
                                name={"tags"}
                                value={tags}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className={"mb-3"}>
              <label htmlFor={"Name"} className={"form-label"}>
                Description
              </label>
              <input
                type={"text"}
                className={"form-control"}
                placeholder={"Enter post Description"}
                name={"description"}
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>
           <br />
                        <button type={"submit"} className={"btn btn-success"}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};export default Edit;