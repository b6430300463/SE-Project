import './Style/ImportStyle.css'
import { FaSearch } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { CiImport } from "react-icons/ci";
import DataDB from './DB/database.json';
import { FaRegUserCircle } from "react-icons/fa";
import Swal from 'sweetalert2';

// npm  i sweetalert2 react-icon ด้วย
const Import = () => {
    const submitAlert = () => {
        Swal.fire({
            title:"Added successfully!!",
            icon:"success",
            confirmButtonText:'Okay'
        })
    }
    return(
        <div className="import-container">
            <div className="header-bar">
                <label id="header-font">เพิ่มรายวิชา</label>
                <label id="username"><strong>Username</strong></label>
                <FaRegUserCircle id="user" size={30}/>
            </div>
            <div className='input'>
                <FaSearch id='search-icon'/>
                <input className="search-box" placeholder="Search..." ></input>
                <CiImport id='import-icon' size={30}/>
                <RiDeleteBin6Fill id='bin-icon'size={30}/>
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
                            <div id='credit'>
                                {database.credit}
                            </div>                   
                        </div>
                    )
                })
            }
            </div>
            <div className='submit'>
                <button type='submit' className="submit-btn" onClick={submitAlert}><strong>Submit</strong></button>
            </div>
            
        </div>
    );
}
export default Import