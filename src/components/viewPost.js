import React, { useState, useEffect } from "react";
import { BASE_URL } from "../urls/baseUrl";
import { Col, Row, Card, Container, Button, Form } from "react-bootstrap";
import { GetAllVideos, DeletePostService } from "../urls/videoService";
import { useCollapse } from "react-collapsed";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify

const ViewPost = () => {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [mergeInProgress, setMergeInProgress] = useState(false);

  const getAllVideos = async () => {
    try {
      const response = await GetAllVideos();
      setPosts(response.data);
      setLoading(true);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await DeletePostService(id);
        toast.success("Video deleted successfully.");
        getAllVideos(); // Refresh the video list after deletion
      } catch (error) {
        console.error("Error deleting video:", error);
        toast.error("Error deleting video. Please try again later.");
      }
    }
  };

  const handleSelect = (id) => {
    if (selectedVideos.includes(id)) {
      setSelectedVideos(selectedVideos.filter((videoId) => videoId !== id));
    } else {
      setSelectedVideos([...selectedVideos, id]);
    }
  };

  const handleMerge = async () => {
    if (selectedVideos.length < 2) {
      alert("Please select at least two videos to merge.");
      return;
    }

    try {
      setMergeInProgress(true);

      // Make an API call to trigger video merging
      console.log(JSON.stringify(selectedVideos));
      const response = await axios.post(
        BASE_URL + "/merge-videos",
        JSON.stringify(selectedVideos),  // Pass the array directly
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      

      // Display a success message or handle it appropriately
      toast.success("Videos merged successfully!");

      // Perform any additional actions after merging (e.g., refresh video list)
      getAllVideos();
    } catch (error) {
      console.error("Error merging videos:", error);
      toast.error("Error merging videos. Please try again later.");
    } finally {
      setMergeInProgress(false);
    }
  };

  return (
    <div>
      <Container className="mb-2 p-3">
        <Button className="p-4" variant="primary" size="lg" href="/">
          Back to add Video
        </Button>
      </Container>
      <Container className="mb-2 p-3"></Container>
      <Container>
        <Card>
          <Row>
            {loading &&
              posts.map((post) => (
                <Col sm={12} md={6} lg={3} key={post.id}>
                  <Card className="my-3 p-3 rounded h-90">
                    <Card.Header>
                      <Form.Check
                        type="checkbox"
                        onChange={() => handleSelect(post.id)}
                        checked={selectedVideos.includes(post.id)}
                      />
                    </Card.Header>
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
                        <Button
                          color="primary"
                          style={{ marginRight: "5px" }}
                          onClick={() => handleDelete(post.id)}
                          disabled={mergeInProgress}
                        >
                          Delete
                        </Button>
                        <Link
                          className={"btn btn-outline-primary mx-2"}
                          to={`/edit/${post.id}`}
                        >
                          Edit{" "}
                        </Link>
                      </div>
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
          {selectedVideos.length > 1 && (
            <Container className="text-center p-2">
              <Button
                className="rounded-2 mb-2 "
                color="success"
                onClick={handleMerge}
                disabled={mergeInProgress}
              >
                Merge Selected Videos
              </Button>
            </Container>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default ViewPost;