import './Style/ImportStyle.css'
import './Style/DrawerStyle.css'
import { FaSearch } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import Swal from 'sweetalert2';
import { useState } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { read, utils, writeFile } from "xlsx"


// npm  i sweetalert2 react-icon ด้วย
const Import = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [search,setSearch] = useState("");

    const shuffleArray = (array)  => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }
    const submitAlert = () => {
        Swal.fire({
            title: "Added successfully!!",
            icon: "success",
            confirmButtonText: 'Okay'
        })
        console.log("checkError", users)
    }
    const openNav = () => {
        setIsDrawerOpen(true);
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
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setUsers(rows);

                }
            };
            reader.readAsArrayBuffer(file);
        }
    };
    return (
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
                <FaRegUserCircle id="user" size={30} />
            </div>

            {/* เริ่มตั้งแต่ตรงนี้ */}
            <form onSubmit={handleImport}>
                <div className='input row mb-2 mt-5' >
                    <FaSearch id='search-icon' />
                    <input className="search-box" placeholder="Search..." ></input>
                    {/* <button type='submit' id='import-icon'><CiImport  size={30}/></button> */}
                    <button id='bin-icon'><RiDeleteBin6Fill size={30} /></button>


                    <div className="custom-file">
                        <input
                            type="file"
                            name="file"
                            className="custom-file-input"
                            id="inputGroupFile"
                            require
                            onChange={handleImport}
                            accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheet"
                        />
                        <label className="custom-file-label" htmlFor="inputGroupFile">
                            Choose file
                        </label>
                    </div>

                </div>
            </form>
            <div className="scrollv">
                {users.length ? (
                    users.map((user, index) => (
                        <div id='subject' key={index}>
                            {/* <th scope = "row">{index}</th> */}
                            <div id='code'>{user.subject_id}</div>
                            <div id='title'>{user.subject}</div>
                            <div id='credit'>{user.credit}</div>
                        </div>
                    ))
                ) : (
                    <div id='no-user'>
                        No Users Found.
                    </div>
                )}


            </div>
            {/* {
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
            } */}
            {/* ถึงตรงนี้ */}


            <div className='submit'>
                <button type='submit' className="submit-btn" onClick={submitAlert}><strong>Submit</strong></button>
            </div>

        </div>
    );
}
export default Import