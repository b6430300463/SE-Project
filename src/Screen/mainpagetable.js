import React from 'react';
import { useState } from 'react';
import './Style/ImportStyle.css'

import './Style/DrawerStyle.css'
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";

import exampleImage from './images/promote.png';


const MainpageTable = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const openNav = () => {
        setIsDrawerOpen(true);
    };

    const closeNav = () => {
        setIsDrawerOpen(false);
    };
    return(
        <div className="import-container">
            <div className="header-bar" style={{ marginBottom: '50px' }}>
                <div id="main">
                    <span id='span' onClick={openNav}>&#9776;</span>
                </div>
                <div id="mySidenav" className={`sidenav ${isDrawerOpen ? 'open' : ''}`}>
                    <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
                    <Link to='/mainpage'>หน้าหลัก</Link>
                    <Link to='/import'>เพิ่มรายวิชา</Link>
                    <Link to='/input'>กรอกคำร้องขอเปิดรายวิชา</Link>
                    <Link to='/checksubject'>ตรวจสอบรายวิชา</Link>
                    <Link to='/login'>เข้าสู่ระบบ</Link>
                    <Link to='/users'>จัดการการเข้าถึง</Link>
                </div>
                <label id="header-font">หน้าหลัก</label>
                <label id="username"><strong>Username</strong></label>
                <FaRegUserCircle id="user" size={30}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img
                src={exampleImage}
                alt="Example"
                style={{ width: '70%', height: '70%', objectFit: 'cover' }}
                />
            </div>
        </div>
    );
}
export default MainpageTable