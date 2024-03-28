import "./Style/ImportStyle.css";
import "./Style/DrawerStyle.css";
import "./Style/RequestStyle.css";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useRouteLoaderData, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import Data from "./DB/database.json";

const Request = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const urlLec = "http://localhost:3307/api/get_problem_lecsubject";
  const urlLab = "http://localhost:3307/api/get_problem_labsubject";
  const boxes = document.querySelectorAll(".box");
  const navigate = useNavigate();
  // const [year,setYear] = useState([]);
  useEffect(() => {
    let storedUsername = localStorage.getItem("Username");
    if (storedUsername) {
      storedUsername = storedUsername.replace(/^"|"$/g, "");
      setUsername(storedUsername);
    }
    let mail = localStorage.getItem("Email");
    console.log("Email", mail);

    const fetchData = async () => {
      try {
        const responseuser = await axios.get(
          "http://localhost:3307/api/showUserdata",
          { params: { email: mail } }
        );
        console.log("Response from API (user):", responseuser.data[0].imageURL);

        if (responseuser.data[0].imageURL) {
          let ImageURL = responseuser.data[0].imageURL;
          setProfileImage(ImageURL);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  boxes.forEach((box) => {
    box.addEventListener("mouseover", () => {
      box.style.transform = "scale(1.1)";
    });

    box.addEventListener("mouseleave", () => {
      box.style.transform = "scale(1)";
    });
  });
  function redirectToPageLec(year) {
    //edit
    // localStorage.removeItem("YearLec");
    // localStorage.setItem("YearLec", JSON.stringify(year));
    // navigate("/manageschedule");
    // console.log(year);
    localStorage.setItem("YearLec", JSON.stringify(year)); // Set year for Lec
    localStorage.setItem("YearLab", JSON.stringify(null)); // Set null for Lab
    navigate("/manageschedule");
    // console.log(year);
  }
  function redirectToPageLab(year) {
    //edit
    // localStorage.removeItem("YearLab");
    // localStorage.setItem("YearLab", JSON.stringify(year));
    // navigate("/manageschedule");
    // // console.log(`${year}`)
    localStorage.setItem("YearLab", JSON.stringify(year));
    localStorage.setItem("YearLec", JSON.stringify(null)); // Set null for Lec
    navigate("/manageschedule");
    // console.log(year);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseLec = await axios.get(urlLec);
        const responseLab = await axios.get(urlLab);
        console.log("Response from API (Lecture):", responseLec.data);
        console.log("Response from API (Lab):", responseLab.data);
        setData({ lecture: responseLec.data, lab: responseLab.data });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openNav = () => {
    setIsDrawerOpen(true);
  };
  const closeNav = () => {
    setIsDrawerOpen(false);
  };
  return (
    <div className="req-container">
      <div className="header-bar">
        <div id="main">
          <span id="span" onClick={openNav}>
            &#9776;
          </span>
        </div>
        <div id="mySidenav" className={`sidenav ${isDrawerOpen ? "open" : ""}`}>
          <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
            &times;
          </a>
          <Link to="/mainpagetable">หน้าหลัก</Link>
          <Link to="/import">เพิ่มรายวิชา</Link>
          <Link to="/request">คำร้องขอเปิดรายวิชา</Link>
          <Link to="/manageschedule">จัดการตารางรายวิชา</Link>
          <Link to="/checksubject">ตรวจสอบรายวิชา</Link>
          <Link to="/export">ส่งออกตาราง</Link>
          <Link to="/login">ออกจากระบบ</Link>
        </div>
        <label id="header-font">คำร้องขอเปิดรายวิชา</label>
        <label id="username">
          <strong>{username || "Username"}</strong>
        </label>
        {profileImage && (
          <img
            src={profileImage}
            alt="Profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginLeft: "10px",
            }}
          />
        )}
      </div>

      <div className="data-container">
        <h2>วิชาที่มีการชนแบบ Lecture:</h2>
        <ul>
          {data.lecture &&
            data.lecture.map((item) => (
              <div
                className="box-request"
                key={item.id}
                onClick={() => redirectToPageLec(item.year)}
              >
                <strong>รหัสวิชา:</strong> {item.subject_id}
                <br />
                <strong>ชื่อวิชา:</strong> {item.subject_name}
                <br />
                <strong>เวลาเรียน:</strong> {item.start_time} -{" "}
                {item.finish_time}
                <br />
                <strong>ห้องเรียน:</strong> {item.room}
                <br />
                <strong>จำนวนนักศึกษา:</strong> {item.total_students}
                <br />
              </div>
            ))}
        </ul>

        <h2>วิชาที่มีการชนแบบ Lab:</h2>
        <ul>
          {data.lab &&
            data.lab.map((item) => (
              <div
                className="box-request"
                key={item.id}
                onClick={() => redirectToPageLab(item.year)}
              >
                <strong>รหัสวิชา:</strong> {item.subject_id}
                <br />
                <strong>ชื่อวิชา:</strong> {item.subject_name}
                <br />
                <strong>เวลาเรียน:</strong> {item.start_time} -{" "}
                {item.finish_time}
                <br />
                <strong>ห้องเรียน:</strong> {item.room}
                <br />
                <strong>จำนวนนักศึกษา:</strong> {item.total_students}
                <br />
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};
export default Request;
