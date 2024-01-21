import React, { useState, useEffect, Fragment } from "react";
import { BASE_URL } from "../urls/baseUrl";
import { Col, Row, Card, Container, Button } from "react-bootstrap";
import { GetAllVideos, DeletePostService } from "../urls/videoService";
import { useCollapse } from "react-collapsed";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ViewPost = () => {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  //Gatting All videos .

  const getAllVideos = async () => {
    try {
      const response = await GetAllVideos();
      setPosts(response.data);
      console.log(response.data);
      console.log(response);
      setLoading(true);
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getAllVideos();
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    if(window.confirm("Are you sure wanted to delete")){
      DeletePostService(id);
    }
  }

  return (
    <div>
      <Container className="mb-2 p-3">
        <Button className="p-4" variant="primary" size="lg" href="/">
          Back to add Video
        </Button>

      </Container>
      <Container className="mb-2 p-3"></Container>
<br/>
      <Container>
        <Card>
          <Row>
            {loading &&
              posts.map((post) => (
                <Col sm={12} md={6} lg={3} key={post.id}>
                  <Card className="my-3 p-3 rounded h-90">
                    <Card.Header></Card.Header>
                    <Card.Body>
                      <div style={{ maxWidth: "40%" }}>
                        <video controls width="250" height="200">
                          <source
                            src={BASE_URL + "/play/" + post.id}
                            type="video/mp4"
                            alt=""
                          />
                        </video>
                      </div>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Subtitle>
                        <Card.Text>
                          <strong style={{ color: "blue" }}>{post.tags}</strong>
                        </Card.Text>
                      </Card.Subtitle>

                      <div style={{ padding: "12px" }}>
                        <p {...getCollapseProps()}>{post.description}</p>
                        <Link
                          size="xs"
                          variant="white"
                          {...getToggleProps({
                            onClick: () =>
                              setExpanded((prevExpanded) => !prevExpanded),
                          })}
                        >
                          {isExpanded ? "Read less" : "Read more"}
                        </Link>
                      </div>
                      <div>
                      <Button color="primary"
              style={{marginRight:"5px"}}
              onClick={() => handleDelete(post.id)}
              >Delete</Button>
               <Link
                      className={"btn btn-outline-primary mx-2"}
                      to={`/edit/${post.id}`}
                    >
                      Edit{" "}
                    </Link></div>
                    <Container>
                    <Link
                      className={"btn btn-primary mx-2"}
                      to={`/viewone/${post.id}`}
                    >
                      View
                    </Link>
                    </Container>
                   
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default ViewPost;