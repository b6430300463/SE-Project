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
import {read, utils, writeFile } from "xlsx"


// npm  i sweetalert2 react-icon ด้วย
const Import = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [users, setUsers] = useState([]);
    
    const submitAlert = () => {
        Swal.fire({
            title:"Added successfully!!",
            icon:"success",
            confirmButtonText:'Okay'
        })
        console.log("checkError",users)
    }
    const openNav = () => {
        setIsDrawerOpen(true);
    };

    const closeNav = () => {
        setIsDrawerOpen(false);
    };
    const handleImport = $event => {
        const files =$event.target.files;
        if (files.length){
            const file =files[0];
            const reader = new FileReader();
            reader.onload = event => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;
                
                if(sheets.length){
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setUsers(rows);

                }
            };
            
            reader.readAsArrayBuffer(file);
            

        }
    };

    // const handleExport = () => {
    //     const headings = [["subject id","year","subject","credit"]];
    //     const wb = utils.book_new();
    //     const wb = utils.json_to_sheet([]);
    //     utils.sheet_add_aoa(we,headings);
    //     utils.sheet_add_json(ws,users,{origin:"A2",skipHeader: true});
    //     utils.book_append_sheet(wb,ws,"Report");
    //     writeFile(wb,"Report.xlsx");
    // };

    // const handleFileSubmit = (e) => {
    //     e.preventDefault();
    //     if(excelFile !== null){
    //         const workbook = XLSX.read(excelFile,{type:'buffer'});
    //         const worksheetName = workbook.SheetNames[0];
    //         const worksheet = workbook.Sheets[worksheetName];
    //         const data = XLSX.utils.sheet_to_json(worksheet);
    //         setExcelData(data.slice(0,10));
    //     }
    // }
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

            {/* เริ่มตั้งแต่ตรงนี้ */}
            <form onSubmit={handleImport}>
                <div className='input row mb-2 mt-5' >
                    <FaSearch id='search-icon'/>
                    <input className="search-box" placeholder="Search..." ></input>
                    {/* <button type='submit' id='import-icon'><CiImport  size={30}/></button> */}
                    <button id='bin-icon'><RiDeleteBin6Fill size={30}/></button>
                
                    <div className ="col-sm-12">
                        <div className ="row">
                            <div className = "col-md-6">
                                <div className = "input-group">
                                    <div className = "custom-file">
                                        <input
                                            type = "file"
                                            name = "file"
                                            className = "custom-file-input"
                                            id = "inputGroupFile"
                                            require
                                            onChange ={handleImport}
                                            accept = ".csv,application/vnd.openxmlformats-officedocument.spreadsheet"
                                            />
                                            <label className = "custom-file-label" htmlFor = "inputGroupFile">
                                                Choose file
                                            </label>
                                    </div>
                                </div>
                            </div>
                            {/* <div className ="col - md -6">
                                <button onClick = {handleExport}
                                className = "btn btn -secondary float-right"
                                >
                                    Export <i className = "fa fa-download"></i>
                                </button>

                            </div> */}
                        </div>
                    </div>
                </div>
            </form>

                        <div className = "scrollv">
                            <div className = "row">
                                <div className = "col-md-12">
                                    <table className ="table">
                                        <thead>
                                            <tr>
                                                <th scope = "col">order</th>
                                                <th scope = "col">subjectID</th>
                                                <th scope = "col">year</th>
                                                <th scope = "col">subject</th>
                                                <th scope = "col">credit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.length ? (
                                                 users.map((user,index) => (
                                                    <tr key ={index}>
                                                        {/* <th scope = "row">{index}</th> */}
                                                        <td>{user.order}</td>
                                                        <td>{user.subjectid}</td>
                                                        <td>{user.year}</td>
                                                        <td>{user.subject}</td>
                                                        <td>{user.credit}</td>

                                                    </tr>
                                                ))
                                        
                                            ):(
                                                <tr>
                                                    <td colSpan="6" className = "text-center">
                                                        No Users Found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                               
                                    </table>
                        
                                </div>
                            </div>

                        </div>
                        {/* <div className = "col-md-6">
                            <button
                            onCLick = {handleExport}
                            className = "btn btn-secondary float-right"
                            >
                                Export<i className = "fa fa-download"></i>
                            </button>
                        </div> */}
                    
            


            
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