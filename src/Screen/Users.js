import './Style/InputStyle.css'
import './Style/DrawerStyle.css'
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { RiDeleteBin6Fill } from "react-icons/ri";
const Users = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [LabInput,setLabInput] = useState([]);

    const openNav = () => {
        setIsDrawerOpen(true);
    };

    const closeNav = () => {
        setIsDrawerOpen(false);
    };
    const addLab = () =>{
        const add=[...LabInput,[]]
        setLabInput(add)
    }
    const submitAlert = () => {
        Swal.fire({
            title:"Added successfully!!",
            icon:"success",
            confirmButtonText:'Okay'
        })
    }
    const HandleDelete = (index) => {
        const deleteIndex = [...LabInput]
        deleteIndex.splice(index,1)
        setLabInput(deleteIndex)
    }
    const HandleInput = (onChangeValue,index) => {
        const inputData = [...LabInput]
        inputData[index] = onChangeValue.target.value;
        setLabInput(inputData)
    }
    return(
        <div className='input-container'>                         
            <div className='header-bar'>
                <div id="main">
                    <span id='span' onClick={openNav}>&#9776;</span>
                </div>
                <div id="mySidenav" className={`sidenav ${isDrawerOpen ? 'open' : ''}`}>
                    <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>&times;</a>
                    <Link to='/mainpage'>หน้าหลัก</Link>
                    <Link to='/users'>จัดการการเข้าถึง</Link>
                    <Link to='/import'>เพิ่มรายวิชา</Link>
                    <Link to='/'>กรอกคำร้องขอเปิดรายวิชา</Link>
                    <Link to='/checksubject'>ตรวจสอบรายวิชา</Link>                   
                    <Link to='/login'>เข้าสู่ระบบ</Link>
                </div>
                <label id="header-font">จัดการการเข้าถึง</label>
                <label id="username"><strong>Username</strong></label>
                <FaRegUserCircle id="user" size={30}/>
            </div>

            <div className="function-box scrollview">
                <br/>
                <div className="subject-box">
                    <div  className="box">
                        <label style={{ display: "flex" , justifyContent:'center' }} for="lec-code">
                        <strong>Sort by Priority</strong>
                        </label>
                        <select name="major-id" className="select-box">
                        <option>All</option>
                        <option>Admin</option>
                        <option>Teacher</option>
                        </select>
                        <br/>
                        <label style={{ display: "flex" , justifyContent:'center' }} for="lec-code">
                        <strong>เปิด-ปิด ระบบ</strong>
                        </label>
                        <select name="major-id" className="select-box" >
                        <option>เปิดระบบ</option>
                        <option>ปิดระบบ</option>
                        </select>
                    </div>               
                </div>
            </div>

            <div className='sub-box' >
                <label style={{paddingLeft:20,fontWeight:'bold'}}>Email : </label>
                <input type="text" id="sub-name" name="sub-name" />
                <label style={{paddingLeft:20,fontWeight:'bold'}}>Priority : </label>
                <select name="major-id" className="select-box">
                <option>None</option>
                <option>Admin</option>
                <option>Teacher</option>
                </select>
                <button type='submit' className='submit-btn' id='submit-input' onClick={submitAlert}><strong>ADD</strong></button>
            </div>
        </div>
    );
}
export default Users
