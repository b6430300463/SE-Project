import './Style/InputStyle.css'
import './Style/DrawerStyle.css'
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Input = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openNav = () => {
        setIsDrawerOpen(true);
    };

    const closeNav = () => {
        setIsDrawerOpen(false);
    };
    return(
        <div className='input-container'>
            <div className='header-bar'>
                <div id="main">
                    <span id='span' onClick={openNav}>&#9776;</span>
                </div>
                <div id="mySidenav" className={`sidenav ${isDrawerOpen ? 'open' : ''}`}>
                    <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>&times;</a>
                    <Link to='/import'>เพิ่มรายวิชา</Link>
                </div>

                <label id="header-font">กรอกคำร้องขอเปิดรายวิชา</label>
                <label id="username"><strong>Username</strong></label>
                <FaRegUserCircle id="user" size={30}/>
            </div>
            <div className="function-box">
                <br/>
                <label><strong>อาจารย์กรอกคำร้องขอเปิดรายวิชา</strong></label>
                <br/><br/>
                <label>วัน/วันที่/เดือน/ปี</label>
                <label style={{paddingLeft:20,color:'red',fontWeight:'bold'}}>ภาคการศึกษา</label>
                <br/><br/>
                <div className='lec'>
                    <label className='checkbox-container'>บรรยาย
                        <input type='checkbox'/>
                        <span className='checkbox-checkmark'></span>
                    </label>
                    <label className='radiobox-container'>บังคับ
                        <input type='radio' name="radio1"/>
                        <span className='radiobox-checkmark'></span>
                    </label>
                    <label className='radiobox-container'>เสรี
                        <input type='radio' name="radio1"/>
                        <span className='radiobox-checkmark'></span>
                    </label>
                </div>
                <br/><br/>
                <div className='lec'>
                    <label className='checkbox-container2'>ปฏิบัติ
                        <input type='checkbox'/>
                        <span className='checkbox-checkmark'></span>
                    </label>
                    <label className='radiobox-container'>บังคับ
                        <input type='radio' name="radio2"/>
                        <span className='radiobox-checkmark'></span>
                    </label>
                    <label className='radiobox-container'>เสรี
                        <input type='radio' name="radio2"/>
                        <span className='radiobox-checkmark'></span>
                    </label>
                </div>
            </div>
        </div>
    );
}
export default Input