import React from 'react';
import { useState } from 'react';
import './Style/ImportStyle.css'

import './Style/DrawerStyle.css'
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";

import exampleImage from './images/promote.png';
import axios from 'axios';
import { useEffect } from 'react';

const MainpageTable = () => {
    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState('');
    useEffect(() => {
        let storedUsername = localStorage.getItem("Username");
        if (storedUsername) {
            storedUsername = storedUsername.replace(/^"|"$/g, '');
            setUsername(storedUsername);
        }
        let mail=  localStorage.getItem("Email");
        console.log("Email",mail)

        const fetchData = async () => {
              try {
                const responseuser = await axios.get('http://localhost:3307/api/showUserdata', { params: { "email" : mail } });
                console.log('Response from API (user):', responseuser.data[0].imageURL);

                if ( responseuser.data[0].imageURL) {
                    let ImageURL =  responseuser.data[0].imageURL;
                  setProfileImage( ImageURL );
                }
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            };
        fetchData();

    }, []);
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
                    <Link to='/mainpagetable'>หน้าหลัก</Link>
                    <Link to='/import'>เพิ่มรายวิชา</Link>
                    <Link to='/request'>คำร้องขอเปิดรายวิชา</Link>
                    <Link to='/manageschedule'>จัดการตารางรายวิชา</Link>
                    <Link to='/checksubject'>ตรวจสอบรายวิชา</Link>
                    <Link to='/export'>ส่งออกตาราง</Link>
                    <Link to='/login'>ออกจากระบบ</Link>
                </div>
                <label id="header-font">หน้าหลัก</label>
                <label id="username"><strong>{username|| 'Username'}</strong></label>
                {profileImage && <img src={profileImage} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%', marginLeft: '10px' }} />}
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