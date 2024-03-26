import './Style/checkStyle.css'
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import Swal from 'sweetalert2';
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState  } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const url = "http://localhost:3307";

// npm  i sweetalert2 react-icon ด้วย
const CheckPage = () => {
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
    const [lecData, setLecData] = useState([]);
    const [labData, setLabData] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    const submitAlert = () => {
      axios
        .post(`${url}/api/assign_lecture`, lecData)
        .then((response) => {
          console.log(response.data); // เช่น ตัวอย่างการแสดงข้อมูลที่ได้จาก API
          
          console.log(lecData);
        })
        .catch((error) => {
          console.error("Lec:", error);
          console.log(lecData);
        });
        Swal.fire({
          title: "Added successfully!!",
          icon: "success",
          confirmButtonText: "Okay",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/input")
          }
        })
      axios
        .post(`${url}/api/assign_lab`, labData)
        .then((response) => {
          console.log(response.data); // เช่น ตัวอย่างการแสดงข้อมูลที่ได้จาก API
         
          console.log(labData);
        })
        .catch((error) => {
          console.error("Lab:", error);
          console.log(lecData);
        });
        Swal.fire({
          title: "Added successfully!!",
          icon: "success",
          confirmButtonText: "Okay",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/input")
          }
        })
    };
  
    
    const openNav = () => {
        setIsDrawerOpen(true);
    };

    const closeNav = () => {
        setIsDrawerOpen(false);
    };
    const TableComponent = ({ data }) => {
        return (
            <div className="table-container">
                <table className='check-table'>
                    <thead >
                        <tr>
                            <th className='check-head check-compo'>รหัสวิชา</th>
                            <th className='check-head check-compo'>วิชา</th>
                            <th className='check-head check-compo'>รหัสสาขา</th>
                            <th className='check-head check-compo'>จำนวน</th>
                            <th className='check-head check-compo'>วัน</th>
                            <th className='check-head check-compo'>เวลา</th>
                            <th className='check-head check-compo'>Teacher Request</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((database,index) => (
                            <tr key={index}>
                                <td className='check-body'>{database.selectedSubject}</td>
                                <td className='check-body'>{database.selectedSubjectName}</td>
                                <td className='check-body'>{database.selectedCode}</td>
                                <td className='check-body'>{database.selectednumber}</td>
                                <td className='check-body'>{database.selectedDay}</td>
                                <td className='check-body'>{database.selectedStart}-{database.selectedStop}</td>
                                <td className='check-body'>{database.selectedteacherreq}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
    const PracticalTableComponent = ({ data }) => {
        return (
          <div className="table-container">
            <table className='check-table'>
              <thead>
                <tr>
                  <th className='check-head check-compo'>รหัสวิชา</th>
                  <th className='check-head check-compo'>วิชา</th>
                  <th className='check-head check-compo'>รหัสสาขา</th>
                  <th className='check-head check-compo'>จำนวน</th>
                  <th className='check-head check-compo'>วัน</th>
                  <th className='check-head check-compo'>เวลา</th>
                  <th className='check-head check-compo'>Teacher Request</th>
                </tr>
              </thead>
              <tbody>
                {data.map((database,index) => (
                  <tr key={index}>
                    <td>{database.selectedSubjectLab}</td>
                    <td>{database.selectedSubjectNameLab}</td>
                    <td>{database.selectedCodeLab}</td>
                    <td>{database.selectednumberLab}</td>
                    <td>{database.selectedDayLab}</td>
                    <td>{database.selectedStartLab}-{database.selectedStopLab}</td>
                    <td>{database.selectedTeacherReqLab}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      };

    return(
        <div className="check-container">
        
            <div className="header-bar">
                <div id="main">
                    <span id='span' onClick={openNav}>&#9776;</span>
                </div>
                <div id="mySidenav" className={`sidenav ${isDrawerOpen ? 'open' : ''}`}>
                    <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
                    <Link to='/mainpageteacher'>หน้าหลัก</Link>
                    <Link to='/import'>เพิ่มรายวิชา</Link>
                    <Link to='/input'>กรอกคำร้องขอเปิดรายวิชา</Link>
                    <Link to='/checksubject'>ตรวจสอบรายวิชา</Link>                   
                    <Link to='/login'>เข้าสู่ระบบ</Link>
                    <Link to='/users'>จัดการการเข้าถึง</Link>
                </div>
                <label id="header-font">ตรวจสอบคำร้องขอจัดตาราง</label>
                <label id="username"><strong>Username</strong></label>
                <FaRegUserCircle id="user" size={30}/>
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
            
            <div className='scrollv'>
            {
                <TableComponent data={lecData}/>
            }
            </div>
            <div className="scrollv">
                <PracticalTableComponent data={labData} />
            </div>
            <div className='button-sb'>
                <div className='Back'>
                    <button type='submit' className="submit-btn" onClick={goBack}><strong>Back</strong></button> 
                    <button type='submit' className="submit-btn" onClick={submitAlert}><strong>Submit</strong></button>
      
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
    
}
export default CheckPage