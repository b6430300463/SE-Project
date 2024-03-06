import './Style/InputStyle.css'
import './Style/DrawerStyle.css'
import './Style/Userdata.css'

import { FaRegUserCircle } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from 'axios';

const Users = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [LabInput, setLabInput] = useState([]);
    const [user, setUser] = useState([]);
    const [priority, setPriority] = useState({});
    const [newEmail,setNewEmail] = useState({});
    const [newPriority,setNewPriority] = useState({});
    const url = 'http://localhost:3307';
    const [selectedPriority, setSelectedPriority] = useState('All');

    useEffect(() => {
        axios.get(`${url}/api/getUser`).then((response) => {

            setUser(response.data);
            console.log(user);
        });
    }, []);
    const getUsers = () => {
        axios.get(`${url}/api/getUser`).then((response) => {

            setUser(response.data);
            console.log(user);
        });
    }
    const openNav = () => {
        setIsDrawerOpen(true);
    };

    const closeNav = () => {
        setIsDrawerOpen(false);
    };
    const submitAlert = () => {
        Swal.fire({
            title: "Added successfully!!",
            icon: "success",
            confirmButtonText: 'Okay'
        })
    }

    const changePriority = (event, email) => {
        setPriority(prevState => ({
            ...prevState,
            [email]: event.target.value, // ใช้ชื่ออีเมลเป็น key เพื่อเก็บค่า priority ของแต่ละอีเมล
        }));
    };

    const updatePriority = async () => {
        for (const email in priority) {
            if (priority.hasOwnProperty(email)) {
                const newPriorityValue = priority[email];
                try {
                    const response = await axios.post(`${url}/api/updatePriority`, { email, priority: newPriorityValue });
                    if (response.data.success) {
                        Swal.fire({
                            title: 'Update Success',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                        // ดึงข้อมูลผู้ใช้ทั้งหมดใหม่หลังจากอัพเดท
                        const updatedUsers = await getUsers(); // สมมติว่ามีฟังก์ชัน getUsers ที่ดึงข้อมูลผู้ใช้ทั้งหมด
                        setUser(updatedUsers);
                    } else {
                        Swal.fire({
                            title: 'Update Failed',
                            text: 'Failed to update priority',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                } catch (error) {
                    console.error('Error updating priority:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to update priority. Please try again later.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        }
    };
    
    
    const addEmailAndPriority = async (email, priority) => {
        // สร้างข้อมูลที่ต้องส่งไปยังเซิร์ฟเวอร์
        const userData = { email, priority };
        console.log(userData)
    
        try {
            const response = await axios.post(`${url}/api/manual_insertUser`, { data: userData });
            // ส่วนการปรับปรุงสถานะหรือการแจ้งเตือนต่างๆ
            if (response.data.message) {
                Swal.fire({
                    title: 'Success',
                    text: response.data.message,
                    icon: 'success',
                    // confirmButtonText: 'OK'
                });
                // อัพเดทข้อมูลที่แสดงบนหน้าเว็บหรือทำอย่างอื่นตามที่ต้องการ
                // setUser(prevUser => [...prevUser, { email, priority }]);
                const updatedUsers = await getUsers(); // สมมติว่ามีฟังก์ชัน getUsers ที่ดึงข้อมูลผู้ใช้ทั้งหมด
                setUser(updatedUsers);
            } else {    
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to insert user',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error inserting user:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to insert user. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };
    
    const deleteUser = (email) => {
        Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: 'คุณจะไม่สามารถกู้คืนผู้ใช้นี้ได้!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ใช่, ลบ!',
            cancelButtonText: 'ไม่, ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${url}/api/deleteusers`, { data: { email } })
                    .then(response => {
                        if (response.data.message) {
                            Swal.fire({
                                title: 'ลบแล้ว!',
                                text: 'ผู้ใช้ถูกลบแล้ว',
                                icon: 'success',
                                confirmButtonText: 'ตกลง'
                            });
                            // อัปเดตสถานะผู้ใช้หลังจากการลบสำเร็จ
                            setUser(user.filter(u => u.email !== email));
                        } else {
                            Swal.fire({
                                title: 'ข้อผิดพลาด',
                                text: 'ลบผู้ใช้ไม่สำเร็จ',
                                icon: 'error',
                                confirmButtonText: 'ตกลง'
                            });
                        }
                    })
                    .catch(error => {
                        console.error('ข้อผิดพลาดในการลบผู้ใช้:', error);
                        Swal.fire({
                            title: 'ข้อผิดพลาด',
                            text: 'ลบผู้ใช้ไม่สำเร็จ กรุณาลองใหม่ในภายหลัง',
                            icon: 'error',
                            confirmButtonText: 'ตกลง'
                        });
                    });
            }
        });
    };

    const getUsersByPriority = () => { 
        if (selectedPriority === 'All') {
          return user;
        } else {
          return user.filter(u => u.priority === parseInt(selectedPriority));
        }
      };
    
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
                <label id="header-font">จัดการการเข้าถึง</label>
                <label id="username"><strong>Username</strong></label>
                <FaRegUserCircle id="user" size={30} />
            </div>

            <div className="function-box scrollview">
                <br />
                <div className="subject-box">
                    <div className="box">
                        <label style={{ display: "flex", justifyContent: 'center' }} for="lec-code">
                            <strong>Sort by Priority</strong>
                        </label>
                        <select name="major-id" className="select-box" value={selectedPriority}onChange={(e) => setSelectedPriority(e.target.value)}> 
                            <option value="All">All</option>
                            <option value="1">Admin</option>
                            <option value="2">Table manager</option>
                            <option value="3">Teacher</option>
                        </select>
                        <br />                        
                        <label style={{ display: "flex", justifyContent: 'center' }} for="lec-code">
                            <strong>เปิด-ปิด ระบบ</strong>
                        </label>
                        <select name="major-id" className="select-box" >
                            <option>เปิดระบบ</option>
                            <option>ปิดระบบ</option>
                        </select>
                    </div>
                    <div className="email-table-container scrolle" >
                        <table className="email-table">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Email</th>
                                    <th>Priority</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getUsersByPriority().map((item, index) => (
                                    <tr key={index} >
                                        <td data-row-number={index + 1}></td>
                                        <td>{item.email}</td>
                                        <td className='priority'>
                                            <div className='c-priority'>
                                                <label name='current' ><strong>
                                                    {item.priority === 0 && "None"}
                                                    {item.priority === 1 && "Admin"}
                                                    {item.priority === 2 && "Table manager"}
                                                    {item.priority === 3 && "Teacher"}
                                                    </strong>
                                                </label>
                                            </div>
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='sub-box' >
                <label style={{ paddingLeft: 20, fontWeight: 'bold' }}>Email : </label>
                <input type="text" id="sub-name" name="sub-name" placeholder='Email' onChange={(e) => setNewEmail(e.target.value)}/>
                <label style={{ paddingLeft: 20, fontWeight: 'bold' }}>Priority : </label>
                <select name="major-id" className="select-box" onChange={(e) => setNewPriority(e.target.value)}>
                    <option value="0">None</option>
                    <option value="1">Admin</option>
                    <option value="2">Table manager</option>
                    <option value="3">Teacher</option>
                </select>
                <button type='submit' className='submit-btn' id='submit-input' onClick={() => {addEmailAndPriority(newEmail,newPriority)}}><strong>ADD</strong></button>
                <button type='submit' className='submit-btn' id='confirm-input' onClick={updatePriority}><strong>Confirm</strong></button>
            </div>
            <div>
            
        </div>
        </div>
    );
}
export default Users
