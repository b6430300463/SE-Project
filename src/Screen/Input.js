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
                    <Link to='/login'>เข้าสู่ระบบ</Link>
                </div>

                <label id="header-font">กรอกคำร้องขอเปิดรายวิชา</label>
                <label id="username"><strong>Username</strong></label>
                <FaRegUserCircle id="user" size={30}/>
            </div>
            {/* โค้ดheaderbar */}

            <div className="function-box">
                <br/>
                <label><strong>อาจารย์กรอกคำร้องขอเปิดรายวิชา</strong></label>
                <br/><br/>
                <label>วัน/วันที่/เดือน/ปี</label>
                <label style={{paddingLeft:20,color:'red',fontWeight:'bold'}}>ภาคการศึกษา :</label>
                <select name='term' id='select-term'>
                    <option value='term1'>ภาคต้น</option>
                    <option value='term2'>ภาคปลาย</option>
                </select> 
                {/* โค้ดdropdown */}
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
                    <select name='yr1' id='select1'>
                        <option value='none'>None</option>
                        <option value='year1'>T12(1)</option>
                        <option value='year2'>T12(2)</option>
                        <option value='year3'>T12(3)</option>
                        <option value='year4'>T12(4)</option>
                    </select>
                    <label for='yr1' id='year-label'>ชั้นปี</label>
                    <select name='sec' id='sec-select'>
                        <option value='none'>None</option>
                        <option value='sec1'>1</option>
                        <option value='sec2'>2</option>
                        <option value='sec3'>3</option>
                    </select>
                    <label for='yr1' id='year-label'>เซคที่</label>
                </div>
                <div className='subject-box'>
                    <label for='lec-code'><strong>รหัสวิชา</strong></label>
                    <br/>
                    <select name='lec-code' className='select-box'>
                        <option>None</option>
                    </select>
                </div>
                <br/><br/>

                <div className='lab'>
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
                    <select name='yr1' id='select1'>
                        <option value='none'>None</option>
                        <option value='year1'>T12(1)</option>
                        <option value='year2'>T12(2)</option>
                        <option value='year3'>T12(3)</option>
                        <option value='year4'>T12(4)</option>
                    </select>
                    <label for='yr1' id='year-label'>ชั้นปี</label>
                    <select name='sec' id='sec-select'>
                        <option value='none'>None</option>
                        <option value='sec1'>1</option>
                        <option value='sec2'>2</option>
                        <option value='sec3'>3</option>
                    </select>
                    <label for='yr1' id='year-label'>เซคที่</label>
                </div>
            </div>
        </div>
    );
}
export default Input
