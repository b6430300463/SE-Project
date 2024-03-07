import "./Style/InputStyle.css";
import "./Style/DrawerStyle.css";
import { FaRegUserCircle } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from "axios";

const url = "http://localhost:3307";
const Input = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  //=====================Lecture========================
  const [LectureInput, setlectureInput] = useState([]);
  const [lectureOptions, setLectureOptions] = useState([]);
  const [selectedSubjectName, setSelectedSubjectName] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSec, setSelectedSec] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedStart, setSelectedStart] = useState("");
  const [selectedStop, setSelectedStop] = useState("");
  const [selectedlecture, setSelectedLecture] = useState("");
  const [selectedgroup, setSelectedGroup] = useState("");
  const [selectednumber, setSelectedNumber] = useState("");
  const [selectedteacherreq, setSelectedTeacherReq] = useState("");
  const [getCredit, setgetCredit] = useState([]);
  //====================Lab=========================
  const [LabInput, setLabInput] = useState([]);
  const [labOptions, setlabOptions] = useState([]);
  const [selectedSubjectNameLab, setSelectedSubjectNameLab] = useState("");
  const [selectedYearLab, setSelectedYearLab] = useState("");
  const [selectedSecLab, setSelectedSecLab] = useState("");
  const [selectedCodeLab, setSelectedCodeLab] = useState("");
  const [selectedSubjectLab, setSelectedSubjectLab] = useState("");
  const [selectedDayLab, setSelectedDayLab] = useState("");
  const [selectedStartLab, setSelectedStartLab] = useState("");
  const [selectedStopLab, setSelectedStopLab] = useState("");
  const [selectedLab, setSelectedLab] = useState("");
  const [selectedgroupLab, setSelectedGroupLab] = useState("");
  const [selectednumberLab, setSelectedNumberLab] = useState("");
  const [selectedTeacherReqLab, setSelectedTeacherReqLab] = useState("");
  const [getCreditLab, setgetCreditLab] = useState([]);

  useEffect(() => {
    axios.get(`${url}/api/lecture`).then((response) => {
      setLectureOptions(response.data);
      const credits = response.data.map((lecture) => lecture.credit);
      setgetCredit(credits);
      // console.log(response.data);
    });
    axios.get(`${url}/api/lab`).then((response) => {
      setlabOptions(response.data);
      const credits = response.data.map((lab) => lab.credit);
      setgetCreditLab(credits);
      // console.log(response.data);
    });
  }, []);

  const openNav = () => {
    setIsDrawerOpen(true);
  };

  const closeNav = () => {
    setIsDrawerOpen(false);
  };

  const navigate = useNavigate();

  const submitAlertMyself = () => {
    Swal.fire({
      title:
        "วัน.. เวลา ... <br> คุณได้ทำการลงทะเบียนไปแล้ว <br> ในรายวิชา.... <br> กรุณาเลือกวันหรือเวลาอื่น",
      icon: "error",
      confirmButtonText: "Okay",
      showCancelButton: false,
      // cancelButtonText: 'Cancel',
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn-red",
        // cancelButton: 'btn-blue'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // กระทำเมื่อคลิกปุ่ม "Submit"
        // ตรวจสอบว่าผู้ใช้ได้คลิกปุ่ม "Submit" หรือไม่
      }
    });
  };
  const submitAlertFriend = () => {
    Swal.fire({
      title:
        "มีอาจารย์ท่านอื่นได้ทำการลงทะเบียนวันเวลาดังกล่าวแล้ว <br> คุณยังต้องการลงทะเบียนใน วัน เวลา ดังกล่าวหรือไม่",
      icon: "warning",
      confirmButtonText: "Submit",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn-red",
        cancelButton: "btn-blue",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // กระทำเมื่อคลิกปุ่ม "Submit"
        // ตรวจสอบว่าผู้ใช้ได้คลิกปุ่ม "Submit" หรือไม่
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // กระทำเมื่อคลิกปุ่ม "Cancel"
        // ตรวจสอบว่าผู้ใช้ได้คลิกปุ่ม "Cancel" หรือไม่
      }
    });
  };

  //เงื่อไขการ Alert
  // const HandleButtonClick = () => {
  //     if (selectedSubjectName === '') {
  //         submitAlert(); // แสดงแจ้งบอก ว่าทำการลงรายวิชาแล้ว
  //     } else if (selectedSubjectName === '') {
  //         submitAlertMyself(); // แสดง alert สำหรับกรณีที่รายวิชาถูลงซำ้(โดยตนเอง)
  //     } else {
  //         submitAlertFriend(); // แสดง alert สำหรับกรณีที่รายวิชาถูกลงเวลาซำ้กับอาจารย์ท่านอื่น
  //     }
  // }
  // ==========================Lecture=======================
  const addlecture = () => {
    const add = [...LectureInput, []];
    setlectureInput(add);
  };
  const submitAlert = () => {
    const lecData = [];

    LectureInput.forEach((_, index) => {
      lecData[index] = {
        "selectedSubject": selectedSubject[index],
        "selectedYear": selectedYear[index],
        "selectedSubjectName": selectedSubjectName[index],
        "selectedCode": selectedCode[index],
        "selectedSec": selectedSec[index],
        "selectedDay": selectedDay[index],
        "selectedStart": selectedStart[index],
        "selectedStop": selectedStop[index],
        // selectedlecture: selectedlecture[index],
        // selectedgroup: selectedgroup[index],
        "selectednumber": selectednumber[index],
        "selectedteacherreq": selectedteacherreq[index],
        "getCredit":
          lectureOptions.find(
            (lecture) => lecture.subject_id === selectedSubject[index]
          )?.credit || 0,
        "teacher_id": 7,
      };
    });
    localStorage.setItem("lecData", JSON.stringify(lecData));
    // axios
    //   .post(`${url}/api/assign_lecture`, {
    //     lecData: lecData,
    //   })
    //   .then((response) => {
    //     console.log(response.data); // เช่น ตัวอย่างการแสดงข้อมูลที่ได้จาก API
    //     Swal.fire({
    //       title: "Added successfully!!",
    //       icon: "success",
    //       confirmButtonText: "Okay",
    //     });
    //   })
    //   .catch((error) => {
    //     console.error("Lec:", error);
    //   });
    const labData = [];
    LabInput.forEach((_, index) => {
      labData[index] = {
        "selectedSubjectLab": selectedSubjectLab[index],
        "selectedYearLab": selectedYearLab[index],
        "selectedSubjectNameLab": selectedSubjectNameLab[index],
        "selectedCodeLab": selectedCodeLab[index],
        "selectedSecLab": selectedSecLab[index],
        "selectedDayLab": selectedDayLab[index],
        "selectedStartLab": selectedStartLab[index],
        "selectedStopLab": selectedStopLab[index],
        // selectedLab: selectedLab[index],
        // selectedgroupLab: selectedgroupLab[index],
        "room": 2333,
        "selectednumberLab": selectednumberLab[index],
        "selectedTeacherReqLab": selectedTeacherReqLab[index],
        "getCreditLab":
          labOptions.find((lab) => lab.subject_id === selectedSubjectLab[index])
            ?.credit || 0,
        "teacher_id": 7,
      };
    });
    localStorage.setItem("labData", JSON.stringify(labData));
    // axios
    //   .post(`${url}/api/assign_lab`, {
    //     subject_id: labData.selectedSubjectLab,
    //     year: labData.selectedYearLab,
    //     subject_name: labData.selectedSubjectNameLab,
    //     credit: labData.getCreditLab,
    //     department: labData.selectedCodeLab, // You may need to adjust this value based on your system
    //     section: labData.selectedSecLab,
    //     total_students: labData.selectednumberLab,
    //     date: labData.selectedDayLab,
    //     start_time: labData.selectedStartLab,
    //     finish_time: labData.selectedStopLab,
    //     room: "None",
    //     teacher_request: labData.selectedTeacherReqLab,
    //     teacher_id: 7,
    //   })
    //   .then((response) => {
    //     console.log(response.data); // เช่น ตัวอย่างการแสดงข้อมูลที่ได้จาก API
    //   })
    //   .catch((error) => {
    //     console.error("Lab:", error);
    //   });
    // เช่น ตัวอย่างการแสดงข้อมูลที่ได้จาก API
    console.log(localStorage.getItem("lecData"));
    console.log(localStorage.getItem("labData"));
    Swal.fire({
      title: "Added successfully!!",
      icon: "success",
      confirmButtonText: "Okay",
    });
    navigate("/check");
  };

  const HandleDeleteLec = (index) => {
    const deleteIndex = [...LectureInput];
    deleteIndex.splice(index, 1);
    setlectureInput(deleteIndex);
    setSelectedSubject((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedYear((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedSubjectName((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedCode((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedSec((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedDay((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedStart((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedStop((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedLecture((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedGroup((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedNumber((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedTeacherReq((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
  };

  const getSubjectNameById = (subjectId) => {
    const selectedSubject = lectureOptions.find(
      (lecture) => lecture.subject_id === subjectId
    );
    return selectedSubject ? selectedSubject.subject : "";
  };
  const handleYearChange = (e, index) => {
    const { value } = e.target;
    setSelectedYear((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };
  const handleSecChange = (e, index) => {
    const { value } = e.target;
    setSelectedSec((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };
  const handleCodeChange = (e, index) => {
    const { value } = e.target;
    setSelectedCode((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };
  const handleSubjectChange = (e, index) => {
    const { value } = e.target;
    const subjectName = getSubjectNameById(value);
    setSelectedSubjectName((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = subjectName;
      return updatedOptions;
    });
    setSelectedSubject((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };

  const handleDayChange = (e, index) => {
    const { value } = e.target;
    setSelectedDay((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };
  const handleStartChange = (e, index) => {
    const { value } = e.target;
    setSelectedStart((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };
  const handleStopChange = (e, index) => {
    const { value } = e.target;
    setSelectedStop((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };
  const handleLectureChange = (e, index) => {
    const { checked } = e.target;
    setSelectedLecture((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = checked ? "บรรยาย" : "";
      return updatedOptions;
    });
  };
  const handleGroupChange = (e, index) => {
    const { value } = e.target;
    setSelectedGroup((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };
  const handleNumberChange = (e, index) => {
    const { value } = e.target;
    setSelectedNumber((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };
  const handleTeacherChange = (e, index) => {
    const { value } = e.target;
    setSelectedTeacherReq((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };
  //=========================Lab===========================
  const addLab = () => {
    const add = [...LabInput, []];
    setLabInput(add);
  };
  const getLabSubjectNameById = (subjectId) => {
    const selectedlabSubject = labOptions.find(
      (lab) => lab.subject_id === subjectId
    );
    return selectedlabSubject ? selectedlabSubject.subject : "";
  };
  const handleYearChangeLab = (e, index) => {
    const { value } = e.target;
    setSelectedYearLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };
  const handleSecChangeLab = (e, index) => {
    const { value } = e.target;
    setSelectedSecLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };
  const handleCodeChangeLab = (e, index) => {
    const { value } = e.target;
    setSelectedCodeLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };
  const handleSubjectChangeLab = (e, index) => {
    const { value } = e.target;
    const subjectName = getLabSubjectNameById(value);
    setSelectedSubjectNameLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = subjectName;
      return updatedOptions;
    });
    setSelectedSubjectLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };

  const handleDayChangeLab = (e, index) => {
    const { value } = e.target;
    setSelectedDayLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };
  const handleStartChangeLab = (e, index) => {
    const { value } = e.target;
    setSelectedStartLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };
  const handleStopChangeLab = (e, index) => {
    const { value } = e.target;
    setSelectedStopLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };
  const handleLabChange = (e, index) => {
    const { checked } = e.target;
    setSelectedLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = checked ? "ปฏิบัติ" : "";
      return updatedOptions;
    });
  };
  const handleGroupChangeLab = (e, index) => {
    const { value } = e.target;
    setSelectedGroupLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };
  const handleNumberChangeLab = (e, index) => {
    const { value } = e.target;
    setSelectedNumberLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };
  const handleTeacherChangeLab = (e, index) => {
    const { value } = e.target;
    setSelectedTeacherReqLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value.trim() !== "" ? value : "none";
      return updatedOptions;
    });
  };
  const HandleDeleteLab = (index) => {
    const deleteIndex = [...LabInput];
    deleteIndex.splice(index, 1);
    setLabInput(deleteIndex);
    setSelectedSubjectLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedYearLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedSubjectNameLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedCodeLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedSecLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedDayLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedStartLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedStopLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedGroupLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedNumberLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
    setSelectedTeacherReqLab((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
  };
  return (
    <div className="input-container">
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
          <Link to="/input">กรอกคำร้องขอเปิดรายวิชา</Link>
          <Link to="/check">ตรวจสอบคำร้องขอจัดตาราง</Link>
          <Link to="/login">ออกจากระบบ</Link>
        </div>
        <label id="header-font">กรอกคำร้องขอเปิดรายวิชา</label>
        <label id="username">
          <strong>Username</strong>
        </label>
        <FaRegUserCircle id="user" size={30} />
      </div>
      {/* โค้ดheaderbar */}

      <div className="function-box scrollview">
        <br />
        <label>
          <strong>อาจารย์กรอกคำร้องขอเปิดรายวิชา</strong>
        </label>
        <br />
        <br />
        <label style={{ paddingLeft: 20, color: "red", fontWeight: "bold" }}>
          ภาคการศึกษา :
        </label>
        <select name="term" id="select-term">
          <option value="term1">ภาคต้น</option>
          <option value="term2">ภาคปลาย</option>
        </select>
        {/* โค้ดdropdown */}
        <br />
        <br />
        {/* ====================Lecture====================== */}
        <label>บรรยาย</label>
        {LectureInput.map((data, index) => {
          return (
            <>
              <div className="lec">
                <label className="checkbox-container">
                  บรรยาย
                  <input
                    type="checkbox"
                    checked={selectedlecture[index] === "บรรยาย"}
                    onChange={(e) => handleLectureChange(e, index)}
                  />
                  <span className="checkbox-checkmark"></span>
                </label>
                <label className="radiobox-container">
                  บังคับ
                  <input
                    type="radio"
                    name={"radio"[index]}
                    value="บังคับ"
                    checked={selectedgroup[index] === "บังคับ"}
                    onChange={(e) => handleGroupChange(e, index)}
                  />
                  <span className="radiobox-checkmark"></span>
                </label>
                <label className="radiobox-container">
                  เสรี
                  <input
                    type="radio"
                    name={"radio"[index]}
                    value="เสรี"
                    checked={selectedgroup[index] === "เสรี"}
                    onChange={(e) => handleGroupChange(e, index)}
                  />
                  <span className="radiobox-checkmark"></span>
                </label>
                <select
                  name="yr1"
                  id="select1"
                  value={selectedYear[index]}
                  onChange={(e) => handleYearChange(e, index)}
                >
                  <option value="none">None</option>
                  <option value="1">T12(1)</option>
                  <option value="2">T12(2)</option>
                  <option value="3">T12(3)</option>
                  <option value="4">T12(4)</option>
                </select>
                <label for="yr1" id="year-label">
                  ชั้นปี
                </label>
                <select
                  name="sec"
                  id="sec-select"
                  value={selectedSec[index]}
                  onChange={(e) => handleSecChange(e, index)}
                >
                  <option value="none">None</option>
                  <option value="800">800</option>
                  <option value="801">801</option>
                  <option value="802">802</option>
                  <option value="803">803</option>
                </select>
                <label for="yr1" id="year-label">
                  เซคที่
                </label>
                <button id="bin" onClick={() => HandleDeleteLec(index)}>
                  <RiDeleteBin6Fill size={20} />
                </button>
              </div>

              <div className="subject-box">
                <div className="box">
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    for="lec-code"
                  >
                    <strong>รหัสวิชา</strong>
                  </label>
                  <select
                    name={"subject-id"[index]}
                    className="select-box"
                    value={selectedSubject[index]}
                    onChange={(e) => {
                      handleSubjectChange(e, index);
                    }}
                  >
                    <option value="none">None</option>
                    {lectureOptions.map((lecture) => (
                      <option key={lecture.order} value={lecture.subject_id}>
                        {`${lecture.subject_id}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="box" style={{ fontWeight: "bold" }}>
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    for={"sub-name" + index}
                  >
                    ชื่อวิชา
                  </label>
                  <input
                    type="text"
                    id={"sub-name" + index}
                    name={"sub-name" + index}
                    value={getSubjectNameById(selectedSubject[index])}
                    onChange={() =>
                      setSelectedSubjectName(
                        getSubjectNameById(selectedSubject[index])
                      )
                    }
                  />

                  <br />
                </div>

                <div className="box">
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    for="lec-code"
                  >
                    <strong>รหัสสาขา</strong>
                  </label>
                  <select
                    name="major-id"
                    className="select-box"
                    value={selectedCode[index]}
                    onChange={(e) => handleCodeChange(e, index)}
                  >
                    <option value="none">None</option>
                    <option value="T12">T12</option>
                  </select>
                </div>

                <div className="box" style={{ fontWeight: "bold" }}>
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    htmlFor="number"
                  >
                    จำนวน:
                  </label>
                  <input
                    type="text"
                    id="number"
                    name="number"
                    value={selectednumber[index]}
                    onChange={(e) => handleNumberChange(e, index)}
                    required
                  />
                </div>

                <div className="box">
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    for="lec-code"
                  >
                    <strong>วัน</strong>
                  </label>

                  <select
                    name="day"
                    className="select-box"
                    value={selectedDay[index]}
                    onChange={(e) => handleDayChange(e, index)}
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

                <div className="box">
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    for="lec-code"
                  >
                    <strong>เวลา</strong>
                  </label>

                  <select
                    name="Time-in"
                    className="select-box"
                    value={selectedStart[index]}
                    onChange={(e) => handleStartChange(e, index)}
                  >
                    <option value="None">None</option>
                    <option value="7:00">7:00</option>
                    <option value="7:30">7:30</option>
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
                  <strong> - </strong>
                  <select
                    name="Time-out"
                    className="select-box"
                    value={selectedStop[index]}
                    onChange={(e) => handleStopChange(e, index)}
                  >
                    <option value="None">None</option>
                    <option value="7:00">7:00</option>
                    <option value="7:30">7:30</option>
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

                <div className="box" style={{ fontWeight: "bold" }}>
                  <label
                    style={{
                      color: "red",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    for={"T-request"[index]}
                  >
                    TEACHER REQUEST:
                  </label>
                  <input
                    type="text"
                    id="T-request"
                    name={"T-request"[index]}
                    value={selectedteacherreq[index]}
                    onChange={(e) => handleTeacherChange(e, index)}
                  />
                </div>
              </div>
              <br />
              <hr />
            </>
          );
        })}

        <div className="add-lecture">
          <button type="button" onClick={() => addlecture()}>
            +
          </button>
        </div>

        <br />
        <hr style={{ background: "#344e41", height: "5px" }} />
        {/* =====================================Lab======================================= */}
        <label>ปฏิบัติ</label>
        {LabInput.map((data, index) => {
          return (
            <>
              <div key={index} className="lab">
                <label className="checkbox-container2">
                  ปฏิบัติ
                  <input
                    type="checkbox"
                    checked={selectedLab[index] === "ปฏิบัติ"}
                    onChange={(e) => handleLabChange(e, index)}
                  />
                  <span className="checkbox-checkmark"></span>
                </label>
                <label className="radiobox-container">
                  บังคับ
                  <input
                    type="radio"
                    value="บังคับ"
                    checked={selectedgroupLab[index] === "บังคับ"}
                    onChange={(e) => handleGroupChangeLab(e, index)}
                  />
                  <span className="radiobox-checkmark"></span>
                </label>
                <label className="radiobox-container">
                  เสรี
                  <input
                    type="radio"
                    value="เสรี"
                    checked={selectedgroupLab[index] === "เสรี"}
                    onChange={(e) => handleGroupChangeLab(e, index)}
                  />
                  <span className="radiobox-checkmark"></span>
                </label>
                <select
                  name="yr1"
                  id="select1"
                  value={selectedYearLab[index]}
                  onChange={(e) => handleYearChangeLab(e, index)}
                >
                  <option value="none">None</option>
                  <option value="1">T12(1)</option>
                  <option value="2">T12(2)</option>
                  <option value="3">T12(3)</option>
                  <option value="4">T12(4)</option>
                </select>
                <label for="yr1" id="year-label">
                  ชั้นปี
                </label>
                <select
                  name="sec"
                  id="sec-select"
                  value={selectedSecLab[index]}
                  onChange={(e) => handleSecChangeLab(e, index)}
                >
                  <option value="none">None</option>
                  <option value="830">830</option>
                  <option value="831">831</option>
                  <option value="832">832</option>
                  <option value="833">833</option>
                </select>
                <label for="yr1" id="year-label">
                  เซคที่
                </label>
                <button id="bin" onClick={() => HandleDeleteLab(index)}>
                  <RiDeleteBin6Fill size={20} />
                </button>
              </div>

              <div className="subject-box">
                <div className="box">
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    for="lec-code"
                  >
                    <strong>รหัสวิชา</strong>
                  </label>
                  <select
                    name={"subject-id"[index]}
                    className="select-box"
                    value={selectedSubjectLab[index]}
                    onChange={(e) => {
                      handleSubjectChangeLab(e, index);
                    }}
                  >
                    <option value="none">None</option>
                    {labOptions.map((lab) => (
                      <option key={lab.order} value={lab.subject_id}>
                        {`${lab.subject_id}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="box" style={{ fontWeight: "bold" }}>
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    for={"sub-name" + index}
                  >
                    ชื่อวิชา
                  </label>
                  <input
                    type="text"
                    id={"sub-name" + index}
                    name={"sub-name" + index}
                    value={getLabSubjectNameById(selectedSubjectLab[index])}
                    onChange={() =>
                      setSelectedSubjectNameLab(
                        getLabSubjectNameById(selectedSubjectLab[index])
                      )
                    }
                  />

                  <br />
                </div>

                <div className="box">
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    for="lec-code"
                  >
                    <strong>รหัสสาขา</strong>
                  </label>
                  <select
                    name="major-id"
                    className="select-box"
                    value={selectedCodeLab[index]}
                    onChange={(e) => handleCodeChangeLab(e, index)}
                  >
                    <option value="none">None</option>
                    <option value="T12">T12</option>
                  </select>
                </div>

                <div className="box" style={{ fontWeight: "bold" }}>
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    for="number"
                  >
                    จำนวน:
                  </label>
                  <input
                    type="text"
                    id="number"
                    name="number"
                    value={selectednumberLab[index]}
                    onChange={(e) => handleNumberChangeLab(e, index)}
                    required
                  />
                </div>

                <div className="box">
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    for="lec-code"
                  >
                    <strong>วัน</strong>
                  </label>

                  <select
                    name="day"
                    className="select-box"
                    value={selectedDayLab[index]}
                    onChange={(e) => handleDayChangeLab(e, index)}
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
                <div className="box">
                  <label
                    style={{ display: "flex", justifyContent: "center" }}
                    for="lec-code"
                  >
                    <strong>เวลา</strong>
                  </label>

                  <select
                    name="Time-in"
                    className="select-box"
                    value={selectedStartLab[index]}
                    onChange={(e) => handleStartChangeLab(e, index)}
                  >
                    <option value="None">None</option>
                    <option value="7:00">7:00</option>
                    <option value="7:30">7:30</option>
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
                  <strong> - </strong>
                  <select
                    name="Time-out"
                    className="select-box"
                    value={selectedStopLab[index]}
                    onChange={(e) => handleStopChangeLab(e, index)}
                  >
                    <option value="None">None</option>
                    <option value="7:00">7:00</option>
                    <option value="7:30">7:30</option>
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

                <div className="box" style={{ fontWeight: "bold" }}>
                  <label
                    style={{
                      color: "red",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    for={"T-request"[index]}
                  >
                    TEACHER REQUEST:
                  </label>
                  <input
                    type="text"
                    id="T-request"
                    name={"T-request"[index]}
                    value={selectedTeacherReqLab[index]}
                    onChange={(e) => handleTeacherChangeLab(e, index)}
                  />
                </div>
              </div>
              <br />
              <hr />
            </>
          );
        })}
        <div className="add-lab">
          <button type="button" onClick={() => addLab()}>
            +
          </button>
        </div>
      </div>

      <div className="sub-box">
        <button
          type="submit"
          className="submit-btn"
          id="submit-input"
          onClick={submitAlert}
        >
          <strong>Submit</strong>
        </button>
      </div>
    </div>
  );
};
export default Input;
