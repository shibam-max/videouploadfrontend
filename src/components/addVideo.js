import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Container, Card, CardBody, Input, Form, Label, Button, } from 'reactstrap';
import { SaveVideoInfo, UplaodVideo } from '../urls/videoService';
import {ProgressBar} from 'react-bootstrap';

import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';


const AddVideo = () => {
    const [video, setVideo] = useState({
        title: "",
        tags: "",
        description: "",
    });
    const [progress,setProgress] = useState(0)
    const [videos, setVideos] = useState(null);
    const [loading,setLoading] =useState(true);
    const [singleProgress, setSingleProgress] = useState(0);
    const singleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setSingleProgress(percentage);
        }
    }



    //fields change handle function .
    const fieldChangeHandle = (event) => {
        setVideo({ ...video, [event.target.name]: event.target.value });
    };
    //handling file change event  .
    const handleFileChange = (event) => {
        console.log(event.target.files[0]);
        setVideos(event.target.files[0]);
    }

    //Upload videos function with title,description,tags .
    const createVideo = (event) => {
        event.preventDefault();
        console.log(video);
        if (video.title.trim() === "") {
            toast.error("please enter title"); return;
        }
        if (video.description.trim() === "") {
            toast.error("Enter some description below 500 character");
            return;
        }
        //submit call starts here .
        SaveVideoInfo(video).then((data) => {
            console.log(data);
            UplaodVideo(videos, data.id,singleFileOptions).then((data) => {
                setLoading(true)
                alert(" wait video is Uploading");
                console.log(data);
                setVideos(event.target.files[0])
            }).catch((error) => {
                console.log(error);
            });
            toast.success("Video Uploaded with Information!!")
            console.log(video);
            setVideo({
                title: "", description: "", tags: "",
            });
        }).catch((error) => {
            alert("upload failed")
        });
    }
    return (
        <div className='wrapper'>
            <Container>
                <Container className="mb-2 p-4">
                    <Button color="primary" size="lg" href="/view">Click to Watch Videos</Button>
                </Container>
                <Card className="shadow-sm border-1 mt-2 border-radius-2">
                    <CardBody>
                        <h3><strong>Form for Uploading Video</strong></h3>
                        <Form onSubmit={createVideo}>
                            <div>
                                <Label for="title">Video Title</Label>
                                <Input type="text" id="title"
                                    placeholder="Enter title here"
                                    className="rounded-2"
                                    name="title"
                                    onChange={fieldChangeHandle}
                                />
                            </div>
                            <div>
                                <Label for="tags">Video Tags</Label>
                                <Input type="text" id="tags"
                                    placeholder="mention tags"
                                    className="rounded-2"
                                    name="tags"
                                    onChange={fieldChangeHandle}
                                />
                            </div>
                            <div>
                                <Label for="description">Video Description</Label>
                                <Input type="text" id="description"
                                    placeholder="mention tags"
                                    className="rounded-2"
                                    name="description"
                                    onChange={fieldChangeHandle}
                                />
                            </div>
                            <div>
                                <Label for="video">Select video to post</Label>
                                <Input id="videoName" type="file"
                                    onChange={handleFileChange} />
                            </div>
                            <div  style={{ width: 150, height: 150 }}>
                        <CircularProgressbar
                        
                        strokeWidth={10}
                            value={singleProgress}
                            text={`${singleProgress}%`}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: 'butt',
                                textSize: '6px',
                                size:"4px",
                                pathTransitionDuration: 0.5,
                                pathColor: `rgba(255, 136, 136, ${singleProgress / 100})`,
                                textColor: '#f88',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                                height:"100px"
                            })}
                        />
                    </div>
                
                            <Container className='text-center p-2'>
                                <Button className="rounded-2 mb-2 " color="primary">Upload Video</Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
}

export default AddVideo