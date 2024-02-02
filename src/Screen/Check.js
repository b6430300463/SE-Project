import './Style/checkStyle.css'
import { FaSearch } from "react-icons/fa";
import DataDB from './DB/database-check.json';
import { FaRegUserCircle } from "react-icons/fa";
import Swal from 'sweetalert2';
import { IoArrowBackCircle } from "react-icons/io5";

// npm  i sweetalert2 react-icon ด้วย
const CheckPage = () => {
    const submitAlert = () => {
        Swal.fire({
            title:"Added successfully!!",
            icon:"success",
            confirmButtonText:'Okay'
        })
    }
    const backAlert = () => {
        Swal.fire({
            title:"back!!",
            icon:"cancel",
            confirmButtonText:'Okay'
        })
    }

    return(
        <div className="check-container">
            <div className="header-bar">
                <label id="header-font">ตรวจสอบคำร้องขอจัดตาราง</label>
                <label id="username"><strong>Username</strong></label>
                <FaRegUserCircle id="user" size={30}/>

            </div>
            <div className="under1-bar">
                <label id="under1-font">ตรวจสอบคำร้องขอจัดตาราง</label>
                <label id="under2-font">ภาค ต้น/ปลาย</label>
            </div>
            <div className="under3-bar">
                <label id="under3-font">ชื่อ - สกุล </label>
                <label id="under3-font">เบอร์ติดต่อ. 0xx-xxx-xxxx</label>
            </div>
            <div className="under4-bar">
                <label id="under4-font">วิชา บังคับ/เสรี</label>
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
                            <div id='major'>
                                {database.major}
                            </div>
                            <div id='people'>
                                {database.people}
                            </div>   
                            <div id='day'>
                                {database.day}
                            </div>   
                            <div id='time'>
                                {database.time}
                            </div>   
                            <div id='request'>
                                {database.request}
                            </div>                      
                        </div>
                    )
                })
            }
            </div>
            <div className='Submit'>
                <button type='submit' className="submit-btn" onClick={submitAlert}><strong>Submit</strong></button>
            </div>
            <div className='Back'>
                <button 
                    type='submit' className="submit-btn" onClick={backAlert}><strong>Back</strong>
                    
                </button> 
                
                
            </div>
            
        </div>
    );
}
export default CheckPage