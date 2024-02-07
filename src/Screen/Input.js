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


                <div className="subject-box">
                    <div className="box">
                        <label style={{ display: "flex" , justifyContent:'center' }} for="lec-code">
                        <strong>รหัสวิชา</strong>
                        </label>
                        <select name="subject-id" className="select-box">
                            <option value="none">None</option>
                        </select>
                    </div>

                    <div  className="box" style={{ fontWeight: "bold" }}>
                        <label style={{ display: "flex" , justifyContent:'center' }} for="sub-name">ชื่อวิชา</label>
                        <input type="text" id="sub-name" name="sub-name" />
                        <br />
                    </div>

                    <div  className="box">
                        <label style={{ display: "flex" , justifyContent:'center' }} for="lec-code">
                        <strong>รหัสสาขา</strong>
                        </label>
                        <select name="major-id" className="select-box">
                        <option>None</option>
                        </select>
                    </div>

                    <div  className="box" style={{ fontWeight: "bold" }} >
                        <label style={{ display: "flex" , justifyContent:'center' }} for="number">จำนวน:</label>
                        <input type="text" id="number" name="number" />
                    </div>

                    <div  className="box">
                        <label style={{ display: "flex" , justifyContent:'center' }} for="lec-code">
                        <strong>วัน</strong>
                        </label>
                        
                        <select name="day" className="select-box">
                            <option value='none'>None</option>
                            <option value='day1'>MON</option>
                            <option value='day2'>TUE</option>
                            <option value='day3'>WED</option>
                            <option value='day3'>THU</option>
                            <option value='day3'>FRI</option>
                            <option value='day3'>SAT</option>
                            <option value='day3'>SUN</option>
                        </select>
                    </div>

                    <div  className="box" >
                        <label style={{ display: "flex" , justifyContent:'center' }} for="lec-code" >
                        <strong>เวลา</strong>
                        </label>
                        
                        <select name="Time-in" className="select-box" >
                            <option value='none'>None</option>
                        <option value='t1'>7:00</option>
                        <option value='t2'>7:30</option>
                        <option value='t3'>8:00</option>
                        <option value='t4'>8:30</option>
                        <option value='t5'>9:00</option>
                        <option value='t6'>9:30</option>
                        <option value='t7'>10:00</option>
                        <option value='t8'>10:30</option>
                        <option value='t9'>11:00</option>
                        <option value='t10'>11:30</option>
                        <option value='t11'>12:00</option>
                        <option value='t12'>12:30</option>
                        <option value='t13'>13:00</option>
                        <option value='t14'>13:30</option>
                        <option value='t15'>14:00</option>
                        <option value='t16'>14:30</option>
                        <option value='t17'>15:00</option>
                        <option value='t18'>15:30</option>
                        <option value='t19'>16:00</option>
                        <option value='t20'>16:30</option>
                        <option value='t21'>17:00</option>
                        <option value='t22'>17:30</option>
                        <option value='t23'>18:00</option>
                        <option value='t24'>18:30</option>
                        <option value='t25'>19:00</option>
                        <option value='t26'>19:30</option>
                        <option value='t27'>20:00</option>
                        <option value='t28'>20:30</option>
                        <option value='t29'>21:00</option>
                        <option value='t30'>21:30</option>
                        </select>
                        <strong> - </strong>
                        <select name="Time-out" className="select-box">
                        <option value='none'>None</option>
                        <option value='t2'>7:30</option>
                        <option value='t3'>8:00</option>
                        <option value='t4'>8:30</option>
                        <option value='t5'>9:00</option>
                        <option value='t6'>9:30</option>
                        <option value='t7'>10:00</option>
                        <option value='t8'>10:30</option>
                        <option value='t9'>11:00</option>
                        <option value='t10'>11:30</option>
                        <option value='t11'>12:00</option>
                        <option value='t12'>12:30</option>
                        <option value='t13'>13:00</option>
                        <option value='t14'>13:30</option>
                        <option value='t15'>14:00</option>
                        <option value='t16'>14:30</option>
                        <option value='t17'>15:00</option>
                        <option value='t18'>15:30</option>
                        <option value='t19'>16:00</option>
                        <option value='t20'>16:30</option>
                        <option value='t21'>17:00</option>
                        <option value='t22'>17:30</option>
                        <option value='t23'>18:00</option>
                        <option value='t24'>18:30</option>
                        <option value='t25'>19:00</option>
                        <option value='t26'>19:30</option>
                        <option value='t27'>20:00</option>
                        <option value='t28'>20:30</option>
                        <option value='t29'>21:00</option>
                        <option value='t30'>21:30</option>
                        <option value='t31'>22:00</option>
                        </select>
                    </div>

                    <div  className="box" style={{ fontWeight: "bold" }} >
                        <label style={{color : 'red', display: "flex" , justifyContent:'center'}} for="lname">TEACHER REQUEST:</label>
                        <input type="text" id="T-request" name="T-request" />
                    </div>
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
