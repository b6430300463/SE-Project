import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import "./Style/Schedule.css";
import "./Style/DrawerStyle.css";
import "./Style/Userdata.css";

const Export = () => {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedCon, setSelectedCon] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [getLec, setGetLec] = useState([]);
  const [getLab, setGetLab] = useState([]);
  const [recentSessions, setRecentSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const url = "http://localhost:3307";
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
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const labResponse = await axios.get(`${url}/api/teacherassignmentlab`);
        const lectureResponse = await axios.get(
          `${url}/api/teacherassignmentlec`
        );

        setGetLab(labResponse.data);
        setGetLec(lectureResponse.data);
        setRecentSessions([...labResponse.data, ...lectureResponse.data]);

        const allTeachers = [...labResponse.data, ...lectureResponse.data]
          .map((session) => session.teacher_id)
          .filter(
            (teacherId, index, self) => self.indexOf(teacherId) === index
          );

        setTeachers(allTeachers);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    let filtered = [...getLec, ...getLab];

    if (selectedYear && selectedYear !== "ALL") {
      filtered = filtered.filter(
        (session) => String(session.year) === String(selectedYear)
      );
    }

    if (selectedTeacher) {
      filtered = filtered.filter(
        (session) => String(session.teacher_id) === String(selectedTeacher)
      );
    }

    setFilteredSessions(filtered);
  }, [selectedYear, selectedTeacher, getLec, getLab]);

  const openNav = () => {
    setIsDrawerOpen(true);
  };

  const closeNav = () => {
    setIsDrawerOpen(false);
  };

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };
  const calculateDurationInSlots = (startTime, finishTime) => {
    const startMinutes = timeToMinutes(startTime);
    const finishMinutes = timeToMinutes(finishTime);
    const durationInMinutes = finishMinutes - startMinutes;

    return Math.ceil(durationInMinutes / 30) + 1;
  };

  const timeslots = [];
  for (let hour = 8; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 22 && minute >= 30) break;
      let formattedHour = hour < 10 ? `0${hour}` : hour;
      let formattedMinute = minute === 0 ? "00" : minute;
      timeslots.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  const addSession = (newSession) => {
    setRecentSessions((prevSessions) => [...prevSessions, newSession]);
  };
  const DayperWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <div className="input-container">
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
        <label id="header-font">ส่งออกตาราง</label>
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
      <div className="room">
        <label htmlFor="teacherName" id="select-teacher">
          อาจารย์
        </label>
        <select
          name="teacherName"
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
        >
          <option value="">เลือกอาจารย์</option>
          {teachers.map((teacher) => (
            <option key={teacher} value={teacher}>
              {teacher}
            </option>
          ))}
        </select>
        {/* year */}
        <label for="year" id="select-year" style={{ paddingLeft: 25 }}>
          ชั้นปี
        </label>
        <select
          name="year"
          id="select-year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="ALL">ALL</option>
          <option value="1">T12(1)</option>
          <option value="2">T12(2)</option>
          <option value="3">T12(3)</option>
          <option value="4">T12(4)</option>
        </select>
      </div>
      <div className="box">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Day/time</th> {/* Empty cell for spacing */}
                {timeslots.map((timeSlot, index) => (
                  <th key={index}>{timeSlot}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DayperWeek.map((day, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{day}</td>
                  {timeslots.map((timeslot, timeslotIndex) => {
                    const timeslotStart = timeToMinutes(timeslot);
                    let sessionToDisplay = null;
                    let spanCount = 0;

                    filteredSessions.forEach((session) => {
                      // Use filteredSessions to match timeslots
                      if (
                        session.date === rowIndex + 1 &&
                        timeslotStart >= timeToMinutes(session.start_time) &&
                        timeslotStart < timeToMinutes(session.finish_time)
                      ) {
                        sessionToDisplay = session;
                        spanCount = calculateDurationInSlots(
                          session.start_time,
                          session.finish_time
                        );
                      }
                    });

                    if (
                      sessionToDisplay &&
                      timeslotStart ===
                        timeToMinutes(sessionToDisplay.start_time)
                    ) {
                      // Highlight or mark the matched session in the timeslot
                      return (
                        <td
                          key={timeslotIndex}
                          colSpan={spanCount}
                          style={{ backgroundColor: "#add8e6" }}
                        >
                          {" "}
                          {/* Example: Highlight with color */}
                          {sessionToDisplay.subject_id} -{" "}
                          {sessionToDisplay.subject_name}
                          <br />
                          Time: {sessionToDisplay.start_time} -{" "}
                          {sessionToDisplay.finish_time}
                          <br />
                          Room: {sessionToDisplay.room}
                          <br />
                          Teacher Req: {sessionToDisplay.teacher_request}
                        </td>
                      );
                    } else if (
                      !sessionToDisplay ||
                      spanCount === 0 ||
                      timeslotStart !==
                        timeToMinutes(sessionToDisplay.start_time)
                    ) {
                      // Render empty or non-matched timeslot
                      return spanCount &&
                        timeslotIndex > 0 &&
                        timeslotIndex % spanCount !== 0 ? null : (
                        <td key={timeslotIndex}></td>
                      );
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Export;
