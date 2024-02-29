import './Style/checkStyle.css'
import { FaSearch } from "react-icons/fa";
import DataDB from './DB/database-check.json';
import { FaRegUserCircle } from "react-icons/fa";
import Swal from 'sweetalert2';
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState  } from 'react';

// npm  i sweetalert2 react-icon ด้วย
const CheckPage = () => {
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

    return(
        <div className="check-container">
            <div className="header-bar">
                <div id="main">
                    <span id='span' onClick={openNav}>&#9776;</span>
                </div>
                <div id="mySidenav" className={`sidenav ${isDrawerOpen ? 'open' : ''}`}>
                    <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>&times;</a>
                    <Link to='/mainpage'>หน้าหลัก</Link>
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
                DataDB.map( database => {
                    return(
                        <div id="subject" key={database.id}>
                            <div id='code'>
                                {database.code}
                            </div>
                            <div id='title'>
                                {database.title}
                            </div>
                            <div id='major'>
                                {database.major}
                            </div>
                            <div id='people'>
                                {database.people}
                            </div>   
                            <div id='day'>
                                {database.day}
                            </div>   
                            <div id='time'>
                                {database.time}
                            </div>   
                            <div id='request'>
                                {database.request}
                            </div>                      
                        </div>
                    )
                })
            }
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