import React from "react";
import './Style/Schedule.css'
import './Style/InputStyle.css'
import './Style/DrawerStyle.css'
import './Style/Userdata.css'

import { FaRegUserCircle } from "react-icons/fa";
import { useState} from 'react';
import { Link } from 'react-router-dom';

const ManageSchedule = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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

            <div>
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
        </div>
    );
}
export default ManageSchedule
    
    






