import "./Style/ImportStyle.css";
import "./Style/DrawerStyle.css";
import "./Style/RequestStyle.css";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useRouteLoaderData } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import Data from './DB/database.json'

const Request = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const openNav = () => {
    setIsDrawerOpen(true);
  };
  const closeNav = () => {
    setIsDrawerOpen(false);
  };
  return (
    <div className="req-container">
      <div className="header-bar">
        <div id="main">
          <span id="span" onClick={openNav}>
            &#9776;
          </span>
        </div>
        <div id="mySidenav" className={`sidenav ${isDrawerOpen ? "open" : ""}`}>
          <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>
            &times;
          </a>
          <Link to="/mainpagetable">หน้าหลัก</Link>
          <Link to="/import">เพิ่มรายวิชา</Link>
          <Link to="/input">กรอกคำร้องขอเปิดรายวิชา</Link>
          <Link to="/checksubject">ตรวจสอบรายวิชา</Link>
          <Link to="/login">เข้าสู่ระบบ</Link>
          <Link to="/users">จัดการการเข้าถึง</Link>
        </div>
        <label id="header-font">คำร้องขอเปิดรายวิชา</label>
        <label id="username">
          <strong>Username</strong>
        </label>
        <FaRegUserCircle id="user" size={30} />
      </div>

      <div className="filter">
        <label className="select-req">อาจารย์</label>
        <select className="select-r teacher-opt-req">
          <option value="none">None</option>
        </select>

        <label className="select-req">วัน</label>
        <select className="select-r">
          <option value="none">None</option>
        </select>

        <label className="select-req">เวลา</label>
        <select className="select-r">
          <option value="None">None</option>
          <option value="7:00">7:00</option>
          <option value="7:30">7:30</option>
          <option value="8:00">8:00</option>
          <option value="8:30">8:30</option>
          <option value="9:00">9:00</option>
          <option value="9:30">9:30</option>
          <option value="10:00">10:00</option>
          <option value="10:30">10:30</option>
          <option value="11:00">11:00</option>
          <option value="11:30">11:30</option>
          <option value="12:00">12:00</option>
          <option value="12:30">12:30</option>
          <option value="13:00">13:00</option>
          <option value="13:30">13:30</option>
          <option value="14:00">14:00</option>
          <option value="14:30">14:30</option>
          <option value="15:00">15:00</option>
          <option value="15:30">15:30</option>
          <option value="16:00">16:00</option>
          <option value="16:30">16:30</option>
          <option value="17:00">17:00</option>
          <option value="17:30">17:30</option>
          <option value="18:00">18:00</option>
          <option value="18:30">18:30</option>
          <option value="19:00">19:00</option>
          <option value="19:30">19:30</option>
          <option value="20:00">20:00</option>
          <option value="20:30">20:30</option>
          <option value="21:00">21:00</option>
          <option value="21:30">21:30</option>
        </select>

        <label className="select-req">เงื่อนไขการชน</label>
        <select className="select-r condition-opt-req">
          <option value="none">None</option>
        </select>
      </div>
      <div className="user-req scrollv">
        {
        Data.map((data, index) => {
            <div key={index}>
                <label>
                    {data[index]}
                </label>
            </div>
      })}
      </div>
    </div>
  );
};
export default Request;
