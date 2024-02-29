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

        if(!post) return null;


    return(
        <div className='input-container'>                         
            <div className='header-bar'>
                <div id="main">
                    <span id='span' onClick={openNav}>&#9776;</span>
                </div>
                <div id="mySidenav" className={`sidenav ${isDrawerOpen ? 'open' : ''}`}>
                    <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>&times;</a>
                    <Link to='/import'>เพิ่มรายวิชา</Link>
                    <Link to='/'>กรอกคำร้องขอเปิดรายวิชา</Link>
                    <Link to='/checksubject'>ตรวจสอบรายวิชา</Link>                   
                    <Link to='/login'>เข้าสู่ระบบ</Link>
                </div>

                <label id="header-font">ตรวจสอบรายวิชา</label>
                <label id="username"><strong>Username</strong></label>
                <FaRegUserCircle id="user" size={30}/>
            </div>
            {/* โค้ดheaderbar */}
            <br></br>
                <div className='lec'>
                    <select name='term' id='select-term'>
                        <option value='term1'>หลักสูตรประจำปี</option>
                        <option value='term2'>2565</option>
                        <option value='term2'>2566</option>
                    </select> 
                    
                    <label className='checkbox-container'>ขอเปิดรายวิชาแล้ว
                        <input  type='checkbox'/>
                        <span className='checkbox-checkmark'></span>
                    </label>
                    <label className='checkbox-container'>ยังไม่ได้ขอเปิดรายวิชาแล้ว
                        <input type='checkbox'/>
                        <span className='checkbox-checkmark'></span>
                    </label>
                </div>
            <div className="scrollv">
                {
                    post.map((data, index) => (
                        <div id='subject' key={index}>
                            {/* <th scope = "row">{index}</th> */}
                            <div id='code'>{data.subject_id}</div>
                            <div id='title'>{data.subject}</div>
                            <div id='credit'>
                                <div id='credit-box'>
                                    {data.credit}
                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    );
}
export default CheckSubject