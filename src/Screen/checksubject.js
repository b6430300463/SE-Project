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
    const [selectedProcess, setSelectedProcess] = useState(false);
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
        if (selectedYear != "" && selectedProcess != false) {
            switch (selectedProcess) {
                case "open":
                    axios.get(`${url}/api/getopencourse/` + selectedYear).then((response) => {
                        setSelectedData(response.data);
                        console.log(response.data);
                    });
                    break;
                case "close":
                    axios.get(`${url}/api/getclosecourse/` + selectedYear).then((response) => {
                        setSelectedData(response.data);
                        console.log(response.data);
                    });
                    break;
                default:
                    axios.get(`${url}/api/getcourse/` + selectedYear).then((response) => {
                        setSelectedData(response.data);
                        console.log(response.data);
                    });

            }
        }
    }, [selectedYear, selectedProcess]);

    if (!post) return null;

    return (
        <div className='input-container'>
            <div className='header-bar'>
                <div id="main">
                    <span id='span' onClick={openNav}>&#9776;</span>
                </div>
                <div id="mySidenav" className={`sidenav ${isDrawerOpen ? 'open' : ''}`}>
                    <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
                    <Link to='/mainpagetable'>หน้าหลัก</Link>
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
                    <option disabled selected>กรุณาเลือกปี</option>
                    <option value='all'>ทุกหลักสูตร</option>
                    <option value='60'>2560</option>
                    <option value='65'>2565</option>
                </select>

                <label className='checkbox-container'>แสดงหลักสูตร
                    <input type='radio' name='processCheck' value="all" onChange={(e) => setSelectedProcess(e.target.value)} />
                    <span className='checkbox-checkmark'></span>
                </label>
                <label className='checkbox-container'>ขอเปิดรายวิชาแล้ว
                    <input type='radio' name='processCheck' value="open" onChange={(e) => setSelectedProcess(e.target.value)} />
                    <span className='checkbox-checkmark'></span>
                </label>
                <label className='checkbox-container'>ยังไม่ได้ขอเปิดรายวิชาแล้ว
                    <input type='radio' name='processCheck' value="close" onChange={(e) => setSelectedProcess(e.target.value)} />
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
