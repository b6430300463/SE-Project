import './Style/checkStyle.css'
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import Swal from 'sweetalert2';
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState  } from 'react';
import { useEffect } from 'react';


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
        Swal.fire({
            title:"Added successfully!!",
            icon:"success",
            confirmButtonText:'Okay'
        })
    }
    
    const openNav = () => {
        setIsDrawerOpen(true);
    };

    const closeNav = () => {
        setIsDrawerOpen(false);
    };
    const TableComponent = ({ data }) => {
        return (
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>รหัสวิชา</th>
                            <th>วิชา</th>
                            <th>รหัสสาขา</th>
                            <th>จำนวน</th>
                            <th>วัน</th>
                            <th>เวลา</th>
                            <th>Teacher Request</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((database,index) => (
                            <tr key={index}>
                                <td>{database.selectedSubject}</td>
                                <td>{database.selectedSubjectName}</td>
                                <td>{database.selectedCode}</td>
                                <td>{database.selectednumber}</td>
                                <td>{database.selectedDay}</td>
                                <td>{database.selectedStart}-{database.selectedStop}</td>
                                <td>{database.selectedteacherreq}</td>
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
            <table>
              <thead>
                <tr>
                  <th>รหัสวิชา</th>
                  <th>วิชา</th>
                  <th>รหัสสาขา</th>
                  <th>จำนวน</th>
                  <th>วัน</th>
                  <th>เวลา</th>
                  <th>Teacher Request</th>
                </tr>
              </thead>
              <tbody>
                {data.map(database => (
                  <tr key={index}>
                    <td>{data.selectedSubjectLab}</td>
                    <td>{data.selectedSubjectNameLab}</td>
                    <td>{data.selectedCodeLab}</td>
                    <td>{data.selectednumberLab}</td>
                    <td>{data.selectedDayLab}</td>
                    <td>{database.selectedStartLab}-{database.selectedStopLab}</td>
                    <td>{data.selectedTeacherReqLab}</td>
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
                    <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>&times;</a>
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