import './Style/ImportStyle.css'
import './Style/DrawerStyle.css'
import { FaSearch } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { read, utils, writeFile } from "xlsx"


const Import = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [Post, setPost] = useState([]);
    const [subject_id, setSubjectid] = useState([]);
    const [year, setYear] = useState([]);
    const [subject, setSubject] = useState([]);
    const [credit, setCredit] = useState([]);
    const [department, setDepartment] = useState([]);
    const [subject_priority, setSubject_priority] = useState([]);
    const [subject_type, setSubject_type] = useState([]);
    const [process, setProcess] = useState([]);
    const url = 'http://localhost:3307';


    const submitAlert = () => {
        Swal.fire({
            title: "Added successfully!!",
            icon: "success",
            confirmButtonText: 'Okay'
        })
        console.log("checkError", users)
    }
    const getcourse = () => {
        axios.get(`${url}/api/course`).then((response) => {
            setPost(response.data);
        });
    }

    useEffect(() => {
        axios.get(`${url}/api/course`).then((response) => {
            setPost(response.data);
            console.log(response.data);
        });
    }, []);

    const openNav = () => {
        setIsDrawerOpen(true);
    };

    const submitData = async () => {
        console.log(users);
        try {
          // Extract relevant data properties from each user
          const postData = users.map(user => ({
            subject_id: user.subject_id,
            year: user.year,
            subject: user.subject,
            credit: user.credit,
            department: user.department,
            subject_priority: user.subject_priority,
            subject_type: user.subject_type,
            process: user.process,
          }));
      
          console.log('postData:', postData); // Log postData for debugging
      
          // ทำ HTTP POST request ไปยัง API endpoint
          const response = await axios.post(`${url}/api/imtoDB`, { data: postData });
      
          // หลังจากที่ request สำเร็จ
          console.log(response.data); // แสดงข้อมูลที่ได้จาก response
          submitAlert(); // เรียกฟังก์ชันแจ้งเตือนความสำเร็จ
        } catch (error) {
          // จัดการข้อผิดพลาดที่เกิดขึ้นในกรณีที่ไม่สำเร็จ
          console.error(error);
        }
      };
      
      

    



    const closeNav = () => {
        setIsDrawerOpen(false);
    };
    const handleImport = $event => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = event => {
                const wb = read(event.target.result);
                console.log('Workbook:', wb); // Log the workbook object
                const sheets = wb.SheetNames;
    
                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    console.log('Rows:', rows); // Log the rows array
                    setUsers(rows);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };
    const handleSubmit = () => {
        // ตรวจสอบว่ามีข้อมูล users หรือไม่ก่อนที่จะทำการเรียก submitData
        if (users.length > 0) {
            submitData(); // เรียก submitData ในกรณีที่มีข้อมูล
        } else {
            // แสดงการแจ้งเตือนหรือดำเนินการเพิ่มเติมตามความเหมาะสม
            console.warn('No data to submit.');
        }
    };
    // const removeArrayByID = (arr, id, column) => {
    //     arr.forEach((value, index) => {
    //         if(value[column] == id) {
    //             arr.splice(index, 1);
    //             return arr;
    //         }
    //     });
    //     return arr;
    // };
    const removeArrayByID = (arr, id, column) => {
        const filteredArray = arr.filter(value => value[column] !== id);
        return filteredArray;
    };

    return (
        <div className="import-container">
            <div className="header-bar">
                <div id="main">
                    <span id='span' onClick={openNav}>&#9776;</span>
                </div>
                <div id="mySidenav" className={`sidenav ${isDrawerOpen ? 'open' : ''}`}>
                    <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>&times;</a>
                    <Link to='/mainpagetable'>หน้าหลัก</Link>
                    <Link to='/import'>เพิ่มรายวิชา</Link>
                    <Link to='/input'>กรอกคำร้องขอเปิดรายวิชา</Link>
                    <Link to='/checksubject'>ตรวจสอบรายวิชา</Link>
                    <Link to='/login'>เข้าสู่ระบบ</Link>
                    <Link to='/users'>จัดการการเข้าถึง</Link>
                </div>
                <label id="header-font">เพิ่มรายวิชา</label>
                <label id="username"><strong>Username</strong></label>
                <FaRegUserCircle id="user" size={30} />
            </div>

            {/* เริ่มตั้งแต่ตรงนี้ */}
            <form onSubmit={handleImport}>
                    <div className="choosefile">
                        <input
                            type="file"
                            name="file"
                            className="custom-file-input"
                            id="inputGroupFile"
                            require
                            onChange={handleImport}
                            accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheet"
                        />
                    </div>
    
            </form>
            <div className="scrollv">
                {users.length ? (
                    users.map((user, index) => (
                        <div id='subject' key={index}>
                            {/* <th scope = "row">{index}</th> */}
                            <div id='code'>{user.subject_id}</div>
                            <div id='title'>{user.subject}</div>
                            <div id='credit'>
                                <div id='credit-box'>
                                    {user.credit}
                                </div>
                                <button id='bin-icon' onClick={() => setUsers(removeArrayByID(users, user.subject_id, "subject_id"))}><RiDeleteBin6Fill size={15} /></button>
                            </div>

                        </div>
                    ))
                ) : (
                    <div id='no-user'>
                        No Data Found.
                    </div>
                )}
            </div>

            {/* ถึงตรงนี้ */}


            <div className='submit'>
                <button type='submit' className="submit-btn" onClick={handleSubmit}><strong>Submit</strong></button>
            </div>

        </div>
    );
}
export default Import