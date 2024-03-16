import React from "react";

import './Style/Schedule.css'
import './Style/DrawerStyle.css'
import './Style/Userdata.css'

import { FaRegUserCircle } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from 'axios';


const ManageSchedule = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    // const [user, setUser] = useState([]);

    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedCon, setSelectedCon] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(false);
    const [selectedYear, setSelectedYear] = useState('');

    const url = 'http://localhost:3307';
    
    // useEffect(() => {
    //     axios.get(`${url}/api/getUser`).then((response) => {
    //         setUser(response.data);
    //         console.log(user);
    //     });
    // }, []);

    const openNav = () => {
        setIsDrawerOpen(true);
    };
    
    const closeNav = () => {
        setIsDrawerOpen(false);
    };

    const DayperWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const TimeperDay = [
        "7:00-7:30", "7:30-8:00", "8:00-8:30", "8:30-9:00", "9:00-9:30", "9:30-10:00", "10:00-10:30", "10:30-11:00", "11:00-11:30",
        "11:30-12:00", "12:00-12:30", "12:30-13:00", "13:00-13:30", "13:30-14:00", "14:00-14:30", "14:30-15:00", "15:00-15:30", "15:30-16:00", "16:00-16:30",
        "16:30-17:00", "17:00-17:30", "17:30-18:00", "18:00-18:30", "18:30-19:00", "19:00-19:30", "19:30-20:00", "20:00-20:30", "20:30-21:00", "21:30-22:00"
    ];
        
    // Data for the table (excluding the first column and row)
    const data = [
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
    ];
        
        
    return ( 
        <div className='input-container'>
            <div className='header-bar'>
                <div id="main">
                    <span id='span' onClick={openNav}>&#9776;</span>
                </div>
                <div id="mySidenav" className={`sidenav ${isDrawerOpen ? 'open' : ''}`}>
                    <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>&times;</a>
                    <Link to='/mainpage'>หน้าหลัก</Link>
                    <Link to='/import'>เพิ่มรายวิชา</Link>
                    <Link to='/request'>คำร้องขอเปิดรายวิชา</Link>
                    <Link to='/manageSchedule'>จัดการตารางรายวิชา</Link>
                    <Link to='/checksubject'>ตรวจสอบรายวิชา</Link>
                    <Link to='/login'>ออกจากระบบ</Link>
                </div>
                <label id="header-font">จัดการตารางรายวิชา</label>
                <label id="username"><strong>Username</strong></label>
                <FaRegUserCircle id="user" size={30} />
            </div>
            <div className='room'>
                <label for="teacherName" id="select-teacher">
                อาจารย์
                </label>
                <select name='teacherName' id='select-teacher' onChange={(e) => setSelectedTeacher(e.target.value)}>
                    <option disabled selected>None</option>
                    <option value='none'>None</option>
                </select>

                {/* year */}
                <label for="year" id="select-year">
                ชั้นปี
                </label>
                <select name='year' id='select-year' onChange={(e) => setSelectedYear(e.target.value)}>
                    <option value="none">None</option>
                    <option value="1">T12(1)</option>
                    <option value="2">T12(2)</option>
                    <option value="3">T12(3)</option>
                    <option value="4">T12(4)</option>
                </select>

                {/* condition */}
                <label for="condition" id="select-condition">
                เงื่อนไขการชน
                </label>
                <select name='condition' id='select-condition' onChange={(e) => setSelectedCon(e.target.value)}>
                    <option value="none">None</option>
                    <option value="c1">วิชาบังคับ ชน วิชาบังคับ</option>
                </select>
                <label>ห้องเรียนชนกัน</label>
                <label className='checkroom-container'>
                    <input type='radio' name='roomCheck' value="close" onChange={(e) => setSelectedRoom(e.target.value)} />
                    <span className='checkroom-checkmark'></span>
                </label>
                <button type='search' className="search-btn" ><strong>Search</strong></button>
                
            </div>
                        
            <div className="box">
                <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th></th> {/* Empty cell for spacing */}
                            {TimeperDay.map((timeSlot, index) => (
                                <th key={index}>{timeSlot}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {DayperWeek.map((day, rowIndex) => (
                            <tr key={rowIndex}>
                                <td>{day}</td>
                                {data[rowIndex].map((cell, colIndex) => (
                                    <td key={colIndex}>{cell}</td>
                                ))}
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
                                <th>บรรยาย</th>
                                <th>ปฏิบัติ</th>
                                <th>วัน</th>
                                <th>เวลา</th>
                                <th>ห้อง</th>
                                <th>ผู้สอน</th>
                                <th>Note & เบอร์ติดต่อ</th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            {user && user.map((item, index) => (
                                <tr key={index} >
                                    <td data-row-number={index + 1}></td>
                                    <td>{item.email}</td>
                                    <td className='priority'>
                                            <select className='select-box'
                                                value={priority[item.email] || "0"} // ใช้ค่า priority จาก state ใหม่
                                                onChange={(e) => changePriority(e, item.email)} // ส่งอีเมลไปด้วยเพื่อระบุว่าเป็นการเลือกของอีเมลนั้น
                                            >
                                            <option value="0">None</option>
                                            <option value="1">Admin</option>
                                            <option value="2">Table manager</option>
                                            <option value="3">Teacher</option>
                                            </select>
                                                <button 
                                                className='buttondelete'
                                                onClick={() => deleteUser(item.email)}>
                                                Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody> */}
                    </table>
            </div>
            <div className='submit2'>
                <button type='submit2' className="submit2-btn" /*onClick={handleSubmit}*/><strong>Submit</strong></button>
            </div>
        </div>
    );
}
export default ManageSchedule
    
    




