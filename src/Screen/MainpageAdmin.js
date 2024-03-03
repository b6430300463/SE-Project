import React from 'react';
import { useState } from 'react';
import './Style/ImportStyle.css'

import './Style/DrawerStyle.css'
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";

// ระบุพาธของไฟล์รูปที่อยู่ในโฟลเดอร์ 
import exampleImage from './images/promote.png';


const MainPageAdmin = () => {
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
                    <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>&times;</a>
                    <Link to='/mainpageadmin'>หน้าหลัก</Link>
                    <Link to='/users'>จัดการการเข้าถึง</Link>
                    <Link to='/login'>ออกจากระบบ</Link>
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
export default MainPageAdmin