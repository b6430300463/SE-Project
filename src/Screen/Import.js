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
import * as XLSX from 'xlsx';

// npm  i sweetalert2 react-icon ด้วย
const Import = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [typeError,setTypeError] = useState(null);
    const [excelData, setExcelData] = useState(null);
    const [excelFile,setExcelFile] = useState(null);
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
    const handleFile = (e) => {
        let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv']
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile&&fileTypes.includes(selectedFile.type)){
                setTypeError(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile)
                reader.onload = (e) => {
                    setExcelFile(e.target.result);
                }
            }else{
                setTypeError('Please select only excel file types')
                setExcelFile(null);
            }
        }else{
            console.log('Please select your file')
        }
    }
    const handleFileSubmit = (e) => {
        e.preventDefault();
        if(excelFile !== null){
            const workbook = XLSX.read(excelFile,{type:'buffer'});
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data.slice(0,10));
        }
    }
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
            <form onSubmit={handleFileSubmit}>
                <div className='input' >
                    <FaSearch id='search-icon'/>
                    <input className="search-box" placeholder="Search..." ></input>
                    <input type="file" className='file-input' onClick={handleFile}/>
                    <button type='submit' id='import-icon'><CiImport  size={30}/></button>
                    <button id='bin-icon'><RiDeleteBin6Fill size={30}/></button>
                </div>
            </form>
            {typeError&&(
                <div role='alert'>{typeError}</div>
            )}
            <div className='scrollv'>
                {excelData?(
                    <div id="subject">
                        <thead>
                            <tr>
                                {Object.keys(excelData[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {excelData.map((individualExcelData,index) => (
                                <tr key={index}>
                                    {Object.keys(individualExcelData).map((key) => (
                                        <td key={key}>{individualExcelData}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </div>
                ):(
                    <div id="subject">No File is uploaded yet!</div>
                )}
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

            </div>
            <div className='submit'>
                <button type='submit' className="submit-btn" onClick={submitAlert}><strong>Submit</strong></button>
            </div>
            
        </div>
    );
}
export default Import