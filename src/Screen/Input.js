import './Style/InputStyle.css'
import './Style/DrawerStyle.css'
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { RiDeleteBin6Fill } from "react-icons/ri";
const Input = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [LabInput,setLabInput] = useState([]);
    const [LectureInput,setlectureInput] = useState([]);


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
    const addlecture = () =>{
        const add=[...LectureInput,[]]
        setlectureInput(add)
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
    const HandleDelete2 = (index) => {
        const deleteIndex = [...LectureInput]
        deleteIndex.splice(index,1)
        setlectureInput(deleteIndex)
    }
    const HandleInput2 = (onChangeValue,index) => {
        const inputData = [...LectureInput]
        inputData[index] = onChangeValue.target.value;
        setlectureInput(inputData)
    }
    
    return(
        <div className='input-container'>                         
            <div className='header-bar'>
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
                <label id="header-font">กรอกคำร้องขอเปิดรายวิชา</label>
                <label id="username"><strong>Username</strong></label>
                <FaRegUserCircle id="user" size={30}/>
            </div>
            {/* โค้ดheaderbar */}

            <div className="function-box scrollview">
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
                <br/><hr style={{background:'#344e41',height:'5px'}}/>
                <div className='lab'>
                    <label className='checkbox-container2'>ปฏิบัติ
                        <input type='checkbox' />
                        <span className='checkbox-checkmark'></span>
                    </label>
                    <label className='radiobox-container'>บังคับ
                        <input type='radio' name="radio2" />
                        <span className='radiobox-checkmark'></span>
                    </label>
                    <label className='radiobox-container'>เสรี
                        <input type='radio' name="radio2" />
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
                <div className='subject-code'>
                    <label className='lec-code2'><strong>รหัสวิชา</strong></label>
                    <label className='lec-name2'><strong>ชื่อวิชา</strong></label>
                    <label className='year-code2'><strong>รหัสสาขา</strong></label>
                    <label className='people2'><strong>จำนวน</strong></label>
                    <label className='day2'><strong>วัน</strong></label>
                    <label className='time2'><strong>เวลา</strong></label>
                    <label className='room2'><strong>ห้อง</strong></label>
                    <label className='rq2'><strong>Teacher request</strong></label>
                </div>
                <div className='subject-layer'>
                    <select name='lec-code2' className='select-box'>
                        <option value='none'>None</option>
                        <option value='math I'>math I </option>
                        <option value='math II'>math II </option>
                        <option value='math III'>math III </option>
                    </select>
                    <input type="text" id="lec-name2" name="lec-name"></input>
                    <input type="text" id="year-code2" name="year-code2"></input>
                    <input type="text" id="people2" name="people2"></input>
                    <input type="text" id="day2" name="day2"></input>
                    <select name='time2-1' id='time2-1'>
                        <option value='None'>None</option>
                        <option value='08.00'>08.00 </option>
                        <option value='08.30'>08.30 </option>
                        <option value='09.00'>09.00 </option>
                    </select>
                    <label className='ke2'>  - </label>
                    <select name='time2-2' id='time2-2'>
                        <option value='none'>None</option>
                        <option value='08.00'>08.00 </option>
                        <option value='08.30'>08.30 </option>
                        <option value='09.00'>09.00 </option>
                    </select>
                    <input type="text" id="room2" name="room2"></input>
                    <input type="text" id="rq2" name="rq2"></input>
                </div>
                <br/><hr/>
                {LabInput.map((data, index) => {
                    return(
                        <>
                            <div key={index} className='lab'>
                                <label className='checkbox-container2'>ปฏิบัติ
                                    <input type='checkbox' onChange={e => HandleInput(e,index)} />
                                    <span className='checkbox-checkmark'></span>
                                </label>
                                <label className='radiobox-container'>บังคับ
                                    <input type='radio' name={"radio"[index]} onChange={e => HandleInput(e,index)}/>
                                    <span className='radiobox-checkmark'></span>
                                </label>
                                <label className='radiobox-container'>เสรี
                                    <input type='radio' name={"radio"[index]} onChange={e => HandleInput(e,index)}/>
                                    <span className='radiobox-checkmark'></span>
                                </label>
                                <select name='yr1' id='select1' onChange={e => HandleInput(e,index)}>
                                    <option value='none'>None</option>
                                    <option value='year1'>T12(1)</option>
                                    <option value='year2'>T12(2)</option>
                                    <option value='year3'>T12(3)</option>
                                    <option value='year4'>T12(4)</option>
                                </select>
                                <label for='yr1' id='year-label'>ชั้นปี</label>
                                <select name='sec' id='sec-select' onChange={e => HandleInput(e,index)}>
                                    <option value='none'>None</option>
                                    <option value='sec1'>1</option>
                                    <option value='sec2'>2</option>
                                    <option value='sec3'>3</option>
                                </select>
                                <label for='yr1' id='year-label'>เซคที่</label>
                                <button id='bin' onClick={() => HandleDelete(index)}><RiDeleteBin6Fill size={20}/></button>
                            </div>
                            <div className='subject-code'>
                                <label className='lec-code2'><strong>รหัสวิชา</strong></label>
                                <label className='lec-name2'><strong>ชื่อวิชา</strong></label>
                                <label className='year-code2'><strong>รหัสสาขา</strong></label>
                                <label className='people2'><strong>จำนวน</strong></label>
                                <label className='day2'><strong>วัน</strong></label>
                                <label className='time2'><strong>เวลา</strong></label>
                                <label className='room2'><strong>ห้อง</strong></label>
                                <label className='rq2'><strong>Teacher request</strong></label>
                            </div>
                            <div className='subject-layer'>
                                <select name='lec-code2' className='select-box'>
                                    <option value='none'>None</option>
                                    <option value='math I'>math I </option>
                                    <option value='math II'>math II </option>
                                    <option value='math III'>math III </option>
                                </select>
                                <input type="text" id="lec-name2" name="lec-name"></input>
                                <input type="text" id="year-code2" name="year-code2"></input>
                                <input type="text" id="people2" name="people2"></input>
                                <input type="text" id="day2" name="day2"></input>
                                <select name='time2-1' id='time2-1'>
                                    <option value='None'>None</option>
                                    <option value='08.00'>08.00 </option>
                                    <option value='08.30'>08.30 </option>
                                    <option value='09.00'>09.00 </option>
                                </select>
                                <label className='ke2'>  - </label>
                                <select name='time2-2' id='time2-2'>
                                    <option value='none'>None</option>
                                    <option value='08.00'>08.00 </option>
                                    <option value='08.30'>08.30 </option>
                                    <option value='09.00'>09.00 </option>
                                </select>
                                <input type="text" id="room2" name="room2"></input>
                                <input type="text" id="rq2" name="rq2"></input>
                            </div>
                            <br/><hr/>
                        </>
                    );
                })}
                <div className='add-lab'>
                    <button type='button' onClick={() => addLab()}>+</button>
                </div>
            </div>

            <div className='sub-box'>
                <button type='submit' className='submit-btn' id='submit-input' onClick={submitAlert}><strong>Submit</strong></button>
            </div>
        </div>
    );
}
export default Input
