# SisCoP React
SisCoP React is a React application developed in Typescript, MongoDB with Replication Set and Axios for communicating with REST APIs that are used as microservices. The main objective of SisCoP is to facilitate the generation, storage and management of documentation for contracting processes, also known as bidding processes. Furthermore, it offers resources to monitor and visualize the progress of these processes at different stages.

[![Author](http://img.shields.io/badge/author-@Cardosojl-blue.svg)](https://www.linkedin.com/in/jorge-luiz-cardoso-215914235/) ![GitHub license](https://img.shields.io/github/license/maitraysuthar/rest-api-nodejs-mongodb.svg)

## Features

+ **Document Generation and Storage:** SisCoP enables users to generate, create, and store essential documents related to contract procurement processes. These documents could include official announcements, proposals, and more.

+ **Process Management:** The application offers a user-friendly interface for managing contract procurement processes. Users can create new processes, assign responsibilities, and set milestones.

+ **Process Tracking:** SisCoP provides an overview of the current status of each procurement process. Users can easily identify which stage a process is currently in and access relevant documents.

+ **Replication Set:** SisCoP is built using MongoDB with Replication Set, ensuring data redundancy, high availability, and fault tolerance.

+ **Asynchronous Calls:** The application utilizes asynchronous calls to provide seamless interactions and real-time updates to users. This enhances the user experience by minimizing page reloads.

+  **Communication with REST API's** The application has a microservices structure and is responsible, through **Axios**, for communicating with APIs. Thus enabling greater performance

+  **Responsive Display** The application was designed to adapt to different monitor screens and uses **Bootstrap** to facilitate this task


<hr>

+ **PROCESS MANAGEMENT**
  
<div style="display: inline">
<img src="https://lh3.googleusercontent.com/pw/ADCreHe7c6GlpbMj8dSbzXexGSfy1KhD96YQH26wQAOq8at3wl7ngeyfdbwcmKwKGjQxsZWh-AJ-3nCWXqCK6x3MJe1kqqOblSwq08QaETth3Wi2a7QEu6ppf6-BI8hUebYUtE_El1mkyltPrsPc-yOJBA=w1702-h924-s-no?authuser=1" width="400px" />
<img src="https://lh3.googleusercontent.com/pw/ADCreHcbTV9GkjNUZFm7ZCkotBDlnJWNFP4Qm3mFHB6QMpn7OdhiSAaTLJ8GlFXjeTKmpzXmbEPUsjpKqb7W10R4qW3VM-j9AEtECa9tyccf73hW4wz47Xx7yshgGIB_qhNJkbq0LP5t0fR7dJRr1pRj3w=w1707-h924-s-no?authuser=1" width="400px" />  
</div>
<div style="display: inline">
<img src="https://lh3.googleusercontent.com/pw/ADCreHeZA1IMgydCyVP3RvRG4s3LOWKsazQeIT_7Dz1ev9M25Jg0RG9C-q_eNkdv8VLu8Vr3Lu7UUMExwLfGY0SeDVXEom08ffNksHl5c0OX8C_qt92JJ6l3yD6Owm3WN1zx3w8Q51MlG8TJU4hyPyPqMA=w1698-h924-s-no?authuser=1" width="400px" />
<br>

+ **SENDING MESSAGES AND PROCESSES**

<div style="display: inline">
<img src="https://lh3.googleusercontent.com/pw/ADCreHfYKvMvfAckHGkypTbqI9D2fOUAoAt3YG8K8BCUrJnaPorC1ZT2MxkbcQgmHKdx9bDI4GlYl6xLSq7pW2Gu4Ves2SocXLm7_yY73-L-kJu79Wa_XlThEl9P9QX5SIxijXyVhUlJX-Cdckyf_AHlEg=w1698-h924-s-no?authuser=1" width="400px" />
<img src="https://lh3.googleusercontent.com/pw/ADCreHdm-_p7H00ot5VWAIB3qvqWSCewRNb4m3To9wmxA1wSl3modPKtgToaPvjGYrnsK89ISRh4NhsKgYIzL5mCBI8gIEySa9c9gD-QHHYul2-d6GNmj_fQOzRoRjTZj95Kbnj5hy5Nq8NdSAKt1EZzbw=w1702-h924-s-no?authuser=1" width="400px" />  
</div>
<br>
 
## Requirements

+ Node.js 16+
+ MongoDB 5.0.22+

## How to Install

### Download the Necessary API'S
+ To be able to run correcly the Siscop React version, it is necessary to download the API's responsible for communicating with the database and uploading files. Follow the steps for each API:
     
1. DataBase Communication API: https://github.com/Cardosojl/siscop-API
2. Database Communication Files Upload API: https://github.com/Cardosojl/siscop_Upload_API

  ### Download the SisCoP React
  1.   Clone the project from github. Change "myproject" to your project name or Download using the "Download Zip" button:
  ```bash
  git clone https://github.com/Cardosojl/Siscop-React.git ./myproject
  ```
  ### Download and Uncompress
  1. Donwload the repository.
  2. Uncompress to your desired directory.

  ### Install Dependencies
  1. Start a terminal in the repository folder.
  2. Run npm to install project dependencies:
  ```bash
  npm install
  ```
  ### Prepare the enviroment
  1. Create a file called ***.env*** and type the environment variables:
  ```sh
  REACT_APP_SISCOP_API=[You must insert here the URL of the API responsible for processing the database] Ex: http://127.0.0.1:3999
  REACT_APP_SISCOP_API_UPLOAD=[You must insert here the URL of the API responsible for Upload] http://127.0.0.1:3998
  ```    
## Running
  1. To be albe to run the application you must use:
  ```bash
  npm start
  ```
  + After that it's just access http://[your selected HOST]:[your selected PORT].
  + To login, you can use:  login: "ADM" / password: "123456".