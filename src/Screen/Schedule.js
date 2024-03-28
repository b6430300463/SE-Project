import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import "./Style/Schedule.css";
import "./Style/DrawerStyle.css";
import "./Style/Userdata.css";

const ManageSchedule = () => {
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
  const [startTimeOptions, setStartTimeOptions] = useState({});
  const [finishTimeOptions, setFinishTimeOptions] = useState({});
  const url = "http://localhost:3307";

  const [selectedStarttime, setSelectedStarttime] = useState("none");
  const [selectedFinishttime, setSelectedFinishtime] = useState("none");

  const [starttime, setStartTime] = useState({});
  const [finishtime, setFinishTime] = useState({});
  const [daychange, setDayChange] = useState({});

  const [selectedDay, setSelectedDay] = useState({});

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
  useEffect(() => {
    // Initialize start time and finish time options based on subject ID
    const initializeOptions = () => {
      const startTimes = {};
      const finishTimes = {};

      if (filteredSessions && filteredSessions.length > 0) {
        filteredSessions.forEach((session) => {
          startTimes[session.subject_id] = session.start_time;
          finishTimes[session.subject_id] = session.finish_time;
        });

        setStartTimeOptions(startTimes);
        setFinishTimeOptions(finishTimes);
      } else {
        console.log("no session");
      }
    };

    initializeOptions();
  }, [filteredSessions]);

  const changeStarttime = async (event, subject_id, section, subjectType) => {
    const startTimeValue = event.target.value;
    setStartTime((prevState) => ({
      ...prevState,
      [`${subject_id}-${section}`]: startTimeValue,
    }));
    await updateAssign(
      subject_id,
      section,
      subjectType,
      selectedDay[`${subject_id}-${section}`],
      startTimeValue,
      finishtime[`${subject_id}-${section}`],
      selectedRoom
    );
  };
  const changeStoptime = async (event, subject_id, section, subjectType) => {
    const finishTimeValue = event.target.value;
    setFinishTime((prevState) => ({
      ...prevState,
      [`${subject_id}-${section}`]: finishTimeValue,
    }));
    await updateAssign(
      subject_id,
      section,
      subjectType,
      selectedDay[`${subject_id}-${section}`],
      starttime[`${subject_id}-${section}`],
      finishTimeValue,
      selectedRoom
    );
  };

  const changeDay = async (event, subject_id, section, subjectType) => {
    const dayValue = event.target.value;
    setSelectedDay((prevState) => ({
      ...prevState,
      [`${subject_id}-${section}`]: dayValue,
    }));
    await updateAssign(
      subject_id,
      section,
      subjectType,
      dayValue,
      starttime[`${subject_id}-${section}`],
      finishtime[`${subject_id}-${section}`],
      selectedRoom
    );
  };
  const handleSubmit = async () => {
    Swal.fire({
      title: "Added successfully!!",
      icon: "success",
      confirmButtonText: "Okay",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
    // เรียกใช้งาน updateAssign เมื่อคลิกปุ่ม Submit
    const updateData = await updateAssign();
    setFilteredSessions(updateData);
  };
  const updateAssign = async (
    subjectId,
    section,
    subjectType,
    date,
    startTime,
    finishTime,
    room
  ) => {
    try {
      let endpoint = "";

      if (subjectType === "บรรยาย") {
        endpoint = "/api/updateLecAssign";
      } else if (subjectType === "ปฏิบัติ") {
        endpoint = "/api/updateLabAssign";
      } else {
        console.error("Invalid subject type");
        return;
      }

      const response = await axios.post(`${url}${endpoint}`, {
        subjectid: subjectId,
        section: section,
        date: date,
        start_time: startTime,
        finish_time: finishTime,
        room: room,
      });

      console.log(response.data); // ตรวจสอบ response จาก API server
      // ต้องการอัพเดท state หรือ render ข้อมูลใหม่หลังจากอัพเดท API สามารถทำต่อได้ตามต้องการ
    } catch (error) {
      console.error("Error updating assignment:", error);
    }
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
        <label id="header-font">จัดการตารางรายวิชา</label>
        <label id="username">
          <strong>Username</strong>
        </label>
        <FaRegUserCircle id="user" size={30} />
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
          {teachers && teachers.length > 0 ? (
            teachers.map((teacher) => (
              <option key={teacher} value={teacher}>
                {teacher}
              </option>
            ))
          ) : (
            <option disabled>No teachers available</option>
          )}
        </select>
        {/* year */}
        <label for="year" id="select-year">
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

        {/* condition */}
        <label for="condition" id="select-condition">
          เงื่อนไขการชน
        </label>
        <select
          name="condition"
          id="select-condition"
          onChange={(e) => setSelectedCon(e.target.value)}
        >
          <option value="none">None</option>
          <option value="c1">วิชาบังคับ ชน วิชาบังคับ</option>
        </select>
        <label>ห้องเรียนชนกัน</label>
        <label className="checkroom-container">
          <input
            type="radio"
            name="roomCheck"
            value="close"
            onChange={(e) => setSelectedRoom(e.target.value)}
          />
          <span className="checkroom-checkmark"></span>
        </label>
        <button type="search" className="search-btn">
          <strong>Search</strong>
        </button>
      </div>
      <div className="box">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th></th> {/* Empty cell for spacing */}
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

                    if (filteredSessions && filteredSessions.length > 0) {
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
                    }

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
      <div className="function-box scrollview">
        <br />
        <table className="schedule-table">
          <thead>
            <tr>
              <th>#</th>
              <th>รหัสวิชา</th>
              <th>ชื่อรายวิชา</th>
              <th>หมู่เรียน</th>
              <th>บังคับ/เสรี</th>
              <th>วัน</th>
              <th>เวลา</th>
              <th>ห้อง</th>
              <th>ผู้สอน</th>
              <th>Note & เบอร์ติดต่อ</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions && filteredSessions.length > 0 ? (
              filteredSessions.map((session, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{session.subject_id}</td>
                  <td>{session.subject_name}</td>
                  <td>{session.section}</td>
                  <td>{session.subject_priority}</td>
                  <td>
                    <div className="schedule-contain">
                      <div className="day-contain">
                        {session.date === 1 && "MON"}
                        {session.date === 2 && "TUE"}
                        {session.date === 3 && "WED"}
                        {session.date === 4 && "THU"}
                        {session.date === 5 && "FRI"}
                        {session.date === 6 && "SAT"}
                        {session.date === 7 && "SUN"}
                      </div>
                      <div className="select-contain">
                        <select
                          className="select-box-schedule"
                          value={
                            selectedDay[
                              `${session.subject_id}-${session.section}`
                            ] ||
                            (daychange[session.subject_id]
                              ? daychange[session.subject_id]
                              : session.date.toString())
                          }
                          onChange={(e) =>
                            changeDay(
                              e,
                              session.subject_id,
                              session.section,
                              session.subject_type
                            )
                          }
                        >
                          <option value="0">None</option>
                          <option value="1">MON</option>
                          <option value="2">TUE</option>
                          <option value="3">WED</option>
                          <option value="4">THU</option>
                          <option value="5">FRI</option>
                          <option value="6">SAT</option>
                          <option value="7">SUN</option>
                        </select>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="schedule-contain">
                      <div className="time-contain">
                        {session.start_time}-{session.finish_time}
                      </div>
                      <div className="select-contain">
                        <select
                          className="select-box-schedule"
                          value={
                            starttime[
                              `${session.subject_id}-${session.section}`
                            ] || session.start_time
                          }
                          onChange={(e) =>
                            changeStarttime(
                              e,
                              session.subject_id,
                              session.section,
                              session.subject_type
                            )
                          }
                        >
                          <option value="None">None</option>
                          <option value="8:00">8:00</option>
                          <option value="8:30">8:30</option>
                          <option value="9:00">9:00</option>
                          <option value="9:30">9:30</option>
                          <option value="10:00">10:00</option>
                          <option value="10:30">10:30</option>
                          <option value="11:00">11:00</option>
                          <option value="11:30">11:30</option>
                          <option value="12:00">12:00</option>
                          <option value="12:30">12:30</option>
                          <option value="13:00">13:00</option>
                          <option value="13:30">13:30</option>
                          <option value="14:00">14:00</option>
                          <option value="14:30">14:30</option>
                          <option value="15:00">15:00</option>
                          <option value="15:30">15:30</option>
                          <option value="16:00">16:00</option>
                          <option value="16:30">16:30</option>
                          <option value="17:00">17:00</option>
                          <option value="17:30">17:30</option>
                          <option value="18:00">18:00</option>
                          <option value="18:30">18:30</option>
                          <option value="19:00">19:00</option>
                          <option value="19:30">19:30</option>
                          <option value="20:00">20:00</option>
                          <option value="20:30">20:30</option>
                          <option value="21:00">21:00</option>
                          <option value="21:30">21:30</option>
                        </select>
                        <label style={{ marginLeft: "5%" }}> - </label>
                        <select
                          className="select-box-schedule"
                          value={
                            finishtime[
                              `${session.subject_id}-${session.section}`
                            ] || session.finish_time
                          }
                          onChange={(e) =>
                            changeStoptime(
                              e,
                              session.subject_id,
                              session.section,
                              session.subject_type
                            )
                          }
                        >
                          <option value="None">None</option>
                          <option value="8:00">8:00</option>
                          <option value="8:30">8:30</option>
                          <option value="9:00">9:00</option>
                          <option value="9:30">9:30</option>
                          <option value="10:00">10:00</option>
                          <option value="10:30">10:30</option>
                          <option value="11:00">11:00</option>
                          <option value="11:30">11:30</option>
                          <option value="12:00">12:00</option>
                          <option value="12:30">12:30</option>
                          <option value="13:00">13:00</option>
                          <option value="13:30">13:30</option>
                          <option value="14:00">14:00</option>
                          <option value="14:30">14:30</option>
                          <option value="15:00">15:00</option>
                          <option value="15:30">15:30</option>
                          <option value="16:00">16:00</option>
                          <option value="16:30">16:30</option>
                          <option value="17:00">17:00</option>
                          <option value="17:30">17:30</option>
                          <option value="18:00">18:00</option>
                          <option value="18:30">18:30</option>
                          <option value="19:00">19:00</option>
                          <option value="19:30">19:30</option>
                          <option value="20:00">20:00</option>
                          <option value="20:30">20:30</option>
                          <option value="21:00">21:00</option>
                          <option value="21:30">21:30</option>
                        </select>
                      </div>
                    </div>
                    {/* <button type='submit' onClick={updatePriority}><strong>Confirm</strong></button> */}
                  </td>

                  <td>{session.room}</td>
                  <td>{session.teacher_id}</td>
                  <td>{session.teacher_request}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No sessions to display</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="submit2">
        <button type="submit2" className="submit2-btn" onClick={handleSubmit}>
          <strong>Submit</strong>
        </button>
      </div>
    </div>
  );
};

export default ManageSchedule;
