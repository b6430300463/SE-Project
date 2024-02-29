import './Style/InputStyle.css'
import './Style/DrawerStyle.css'
import './Style/ImportStyle.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import axios from 'axios';

const url = 'http://localhost:3307';

const CheckSubject = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [post, setPost] = useState(null);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedData, setSelectedData] = useState([]);

    const openNav = () => {
        setIsDrawerOpen(true);
    };

    const closeNav = () => {
        setIsDrawerOpen(false);
    };

    useEffect(() => {
        axios.get(`${url}/api/course`).then((response) => {
            setPost(response.data);
            console.log(response.data);
        });
    }, []);

    useEffect(() => {
        if (selectedYear === 'ALL') {
            axios.get(`${url}/api/course`).then((response) => {
                setSelectedData(response.data);
                console.log(response.data);
            });
        } else if (selectedYear === '2560') {
            axios.get(`${url}/api/year60`).then((response) => {
                setSelectedData(response.data);
                console.log(response.data);
            });
        } else if (selectedYear === '2565') {
            axios.get(`${url}/api/year65`).then((response) => {
                setSelectedData(response.data);
                console.log(response.data);
            });
        }
    }, [selectedYear]);

    if (!post) return null;

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
                    <Link to='/input'>กรอกคำร้องขอเปิดรายวิชา</Link>
                    <Link to='/checksubject'>ตรวจสอบรายวิชา</Link>
                    <Link to='/login'>เข้าสู่ระบบ</Link>
                    <Link to='/users'>จัดการการเข้าถึง</Link>
                </div>

                <label id="header-font">ตรวจสอบรายวิชา</label>
                <label id="username"><strong>Username</strong></label>
                <FaRegUserCircle id="user" size={30} />
            </div>
            {/* โค้ดheaderbar */}
            <br></br>
            <div className='lec'>
                <select name='term' id='select-term' onChange={(e) => setSelectedYear(e.target.value)}>
                    <option value='term1'>None</option>
                    <option value='ALL'>ทุกหลักสูตร</option>
                    <option value='2560'>2560</option>
                    <option value='2565'>2565</option>
                </select>


                <label className='checkbox-container'>ขอเปิดรายวิชาแล้ว
                    <input type='checkbox' />
                    <span className='checkbox-checkmark'></span>
                </label>
                <label className='checkbox-container'>ยังไม่ได้ขอเปิดรายวิชาแล้ว
                    <input type='checkbox' />
                    <span className='checkbox-checkmark'></span>
                </label>
            </div>
            {selectedYear !== 'term1' && (
                <div className="scrollv">
                    {selectedData.map((data, index) => (
                        <div id='subject' key={index}>
                            <div id='code'>{data.subject_id}</div>
                            <div id='title'>{data.subject}</div>
                            <div id='credit'>
                                <div id='credit-box'>{data.credit}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}
export default CheckSubject;
