import "./Style/checkStyle.css";
import { FaSearch } from "react-icons/fa";
import DataDB from "./DB/database-check.json";
import { FaRegUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const url = "http://localhost:3307";
// npm  i sweetalert2 react-icon ด้วย
const CheckPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lecData, setLecData] = useState([]);
  const [labData, setLabData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const lecDataFromLocalStorage = localStorage.getItem("lecData");
    if (lecDataFromLocalStorage) {
      // แปลงข้อมูลกลับเป็นอาร์เรย์
      setLecData(JSON.parse(lecDataFromLocalStorage));
      // ทำสิ่งที่ต้องการกับข้อมูลที่ได้
      console.log(lecData);
    } else {
      console.log("ไม่พบข้อมูลใน Local Storage");
    }

    const labDataFromLocalStorage = localStorage.getItem("labData");
    if (labDataFromLocalStorage) {
      // แปลงข้อมูลกลับเป็นอาร์เรย์
      setLabData(JSON.parse(labDataFromLocalStorage));
      // ทำสิ่งที่ต้องการกับข้อมูลที่ได้
      console.log(labData);
    } else {
      console.log("ไม่พบข้อมูลใน Local Storage");
    }
  }, []);
  const goBack = () => {
    navigate(-1);
  };
  const submitAlert = () => {
    axios
      .post(`${url}/api/assign_lecture`, lecData)
      .then((response) => {
        console.log(response.data); // เช่น ตัวอย่างการแสดงข้อมูลที่ได้จาก API
        Swal.fire({
          title: "Added successfully!!",
          icon: "success",
          confirmButtonText: "Okay",
        });
        console.log(lecData);
      })
      .catch((error) => {
        console.error("Lec:", error);
        console.log(lecData);
      });
    axios
      .post(`${url}/api/assign_lab`, labData)
      .then((response) => {
        console.log(response.data); // เช่น ตัวอย่างการแสดงข้อมูลที่ได้จาก API
        Swal.fire({
          title: "Added successfully!!",
          icon: "success",
          confirmButtonText: "Okay",
        });
        console.log(labData);
      })
      .catch((error) => {
        console.error("Lab:", error);
        console.log(lecData);
      });
  };

  const openNav = () => {
    setIsDrawerOpen(true);
  };

  const closeNav = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="check-container">
      <div className="header-bar">
        <div id="main">
          <span id="span" onClick={openNav}>
            &#9776;
          </span>
        </div>
        <div id="mySidenav" className={`sidenav ${isDrawerOpen ? "open" : ""}`}>
          <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>
            &times;
          </a>
          <Link to="/mainpageteacher">หน้าหลัก</Link>
          <Link to="/import">เพิ่มรายวิชา</Link>
          <Link to="/input">กรอกคำร้องขอเปิดรายวิชา</Link>
          <Link to="/checksubject">ตรวจสอบรายวิชา</Link>
          <Link to="/login">เข้าสู่ระบบ</Link>
          <Link to="/users">จัดการการเข้าถึง</Link>
        </div>
        <label id="header-font">ตรวจสอบคำร้องขอจัดตาราง</label>
        <label id="username">
          <strong>Username</strong>
        </label>
        <FaRegUserCircle id="user" size={30} />
      </div>
      <div className="under1-bar">
        <label id="under1-font">ตรวจสอบคำร้องขอจัดตาราง</label>
        <label id="under2-font">ภาค ต้น/ปลาย</label>
      </div>
      <div className="under3-bar">
        <label id="under3-font">ชื่อ - สกุล </label>
        <label id="under3-font">เบอร์ติดต่อ. 0xx-xxx-xxxx</label>
      </div>
      <div className="under4-bar">
        <label id="under4-font">วิชา บังคับ/เสรี</label>
      </div>

      <div className="scrollv">
        {lecData.map((data, index) => {
          return (
            <div id="subject" key={index}>
              <div id="code">{data.selectedSubject}</div>
              <div id="title">{data.selectedSubjectName}</div>
              <div id="major">
                {data.selectedCode}({data.selectedYear})
              </div>
              <div id="people">{data.selectednumber}</div>
              <div id="day">
                {data.selectedDay === 1 && "MON"}
                {data.selectedDay === 2 && "TUE"}
                {data.selectedDay === 3 && "WED"}
                {data.selectedDay === 4 && "THU"}
                {data.selectedDay === 5 && "FRI"}
                {data.selectedDay === 6 && "SAT"}
                {data.selectedDay === 7 && "SUN"}
              </div>
              <div id="time">
                {data.selectedStart}-{data.selectedStop}
              </div>
              <div id="request">{data.selectedteacherreq}</div>
            </div>
          );
        })}
      </div>
      <div className="scrollv">
        {labData.map((data, index) => {
          return (
            <div id="subject" key={index}>
              <div id="code">{data.selectedSubjectLab}</div>
              <div id="title">{data.selectedSubjectNameLab}</div>
              <div id="major">
                {data.selectedCodeLab}({data.selectedYearLab})
              </div>
              <div id="people">{data.selectednumberLab}</div>
              <div id="day">
                {data.selectedDayLab === 1 && "MON"}
                {data.selectedDayLab === 2 && "TUE"}
                {data.selectedDayLab === 3 && "WED"}
                {data.selectedDayLab === 4 && "THU"}
                {data.selectedDayLab === 5 && "FRI"}
                {data.selectedDayLab === 6 && "SAT"}
                {data.selectedDayLab === 7 && "SUN"}
              </div>

              <div id="time">
                {data.selectedStartLab}-{data.selectedStopLab}
              </div>
              <div id="request">{data.selectedTeacherReqLab}</div>
            </div>
          );
        })}
      </div>
      <div className="button-sb">
        <div className="Back">
          <button type="submit" className="submit-btn" onClick={goBack}>
            <strong>Back</strong>
          </button>
          <button type="submit" className="submit-btn" onClick={submitAlert}>
            <strong>Submit</strong>
          </button>
        </div>
      </div>
      {/* <div className='Submit'>
                <button type='submit' className="submit-btn" onClick={submitAlert}><strong>Submit</strong></button>
            </div>
            <div className='Back'>
                <button 
                    type='submit' className="submit-btn" onClick={backAlert}><strong>Back</strong>
                    
                </button> 
                
                
            </div> */}
    </div>
  );
};
export default CheckPage;
