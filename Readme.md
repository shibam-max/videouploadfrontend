## Prerequisites
1. Docker should be installed in the system
2. Mysql should be installed

## DB Configurations
1. Login to the MySql console using command "mysql -u root -p"
2. create a database using command "create database <database_name>;"


## Backend installation
1. Clone the repository using the command "git clone https://github.com/shibam-max/videouploadbackend.git
2. cd videouploadbackend/src/main/resources
3. open application.properties file
4. set the properties in the application.properties file
"spring.datasource.url= jdbc:mysql://localhost:3306/<database_name>
spring.datasource.username=<username>
spring.datasource.password=<password>"
5. save and close the file
6. change the directory to "videouploadbackend" directory
7. Build the image using,
sudo docker build -t <Image Name> .
8. Run the image using,
sudo docker run -d --network="host" <Image Name>

## Endpoints created:

1.To save the video in server:
http://localhost:8082/api/save(Post Method)

2. To check the list of the videos saved in the DB:
http://localhost:8082/api/all(GET method)

4. To list the video based on the ID:
http://localhost:8082/api/get/{id}(GET method)

6. To upload the video:
http://localhost:8082/api/upload/{id}(POST method)

8. To play the videos:
http://localhost:8082/api/play/{id}(GET method)

10. To Delete the videos:
http://localhost:8082/api/{id}(Delete method)

12. To update the videos:
http://localhost:8082/api/update/{id}(Update method)

14. To merge the videos:
http://localhost:8082/api/merge-videos(POST method)

16. Test the backend APIS through postman/any other tool.
17. Backend should be up and running and listening on port 8082

## Frontend installation
1. Clone the repository using the command "git clone https://github.com/shibam-max/videouploadfrontend.git"
2. cd videouploadfrontend
3. Run "sudo docker build -t <Image_Name> ."
4. Run "sudo docker run -d --network="host" <Image_Name>"
5. Access the application "http://localhost:3000"

## Features
 
- **Upload Videos:** Add videos with a name, tag, and description.
- **View Videos:** Browse through all uploaded videos.
- **Edit Video Details:** Modify name, tag, or description of a video.
- **Delete Videos:** Remove unwanted videos.
- **Merge Videos:** Combine multiple videos seamlessly.


## Tools used
1. STS
2. VScode
3. Postman
4. Any browser(chrome/firefox etc.)

## Technologies used
1. Java
2. Spring boot
3. React Js
4. MySql
5. Docker
