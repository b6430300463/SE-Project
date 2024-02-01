import './Style/ImportStyle.css'
import './Style/DrawerStyle.css'
import { FaSearch } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { CiImport } from "react-icons/ci";
import DataDB from './DB/database.json';
import { FaRegUserCircle } from "react-icons/fa";
import Swal from 'sweetalert2';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// npm  i sweetalert2 react-icon ด้วย
const Import = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    
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
        <div className="import-container">
            <div className="header-bar">
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
                <label id="header-font">เพิ่มรายวิชา</label>
                <label id="username"><strong>Username</strong></label>
                <FaRegUserCircle id="user" size={30}/>
            </div>
            <div className='input'>
                <FaSearch id='search-icon'/>
                <input className="search-box" placeholder="Search..." ></input>
                <CiImport id='import-icon' size={30}/>
                <RiDeleteBin6Fill id='bin-icon'size={30}/>
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
                            <div id='credit'>
                                {database.credit}
                            </div>                   
                        </div>
                    )
                })
            }
            </div>
            <div className='submit'>
                <button type='submit' className="submit-btn" onClick={submitAlert}><strong>Submit</strong></button>
            </div>
            
        </div>
    );
}
export default Import