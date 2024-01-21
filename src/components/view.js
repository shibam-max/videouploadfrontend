import React,{useState,useEffect} from 'react'
import { BASE_URL } from '../urls/baseUrl';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const SeeOne = () => {

    const [user, setUser] = useState({
        id: " ",
        title: "" ,
        description: "",
        tags: "",
      });
      const {id} = useParams();
      useEffect(() => {
        loadUser();
      },[]);
      const loadUser =  async () => {
        const result = await axios.get(BASE_URL+`/get/${id}`);
         setUser( result.data);
           console.log("something wrong")
         setUser(result.data);
       };



  return (
    <div>
        <div className="row">
        <div
          className={ "col-md-6 offset-md-3 border rounded p-4 mt-2 shadow" } >
          <h2 className={"text-center m-4"}>Post Detail</h2>
          <div className="card">
            <div className="card-header">
            <div style={{ maxWidth: "40%" }}>
                        <video controls width="250" height="200">
                          <source
                            src={BASE_URL + "/play/" + id}
                            type="video/mp4"
                            alt=""
                          />
                        </video>
                      </div>
              Details of User id : {user.id}
              <ul className={"list-group list-group-flush"}>
                <li className="list-group-item">
                  <b>Title: </b>
                  {user.title}
                </li>
                <li className="list-group-item">
                  <b>Description: </b>
                  {user.description}
                </li>
               
                <li className="list-group-item">
                  <b>Tags: </b>
                  {user.tags}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeeOne ;