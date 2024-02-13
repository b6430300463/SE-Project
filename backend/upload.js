const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2');

let results = []

require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,//เปลี่ยนทุกครั้งที่เปิด DTB
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

// เชื่อมต่อกับ MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});
  

fs.createReadStream('../upload/Laboratory-Subject.csv')
    .pipe(csv({
        headers: false
    }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        if(results[0][0] == "order" || results[0][0] == undefined || results[0][0] == null) { // ตัดหัวตารางเมื่อ A1 == order หรือ ว่างเปล่า หรือ ไม่มีค่า
            results = results.slice(1)
        }
        importDatabase(results); // ส่งข้อมูลตัวแปล results ที่ตัดหัวตารางออกแล้วไปที่ function importDatabase
    });

function importDatabase(import_data) {
    import_data.forEach((data, i) => {
        // if(i >= 1) { // กำหนดจำนวน Array ที่จะ Import
        //     return;
        // }
        if(data[2] == 60) { // เลือกแสดงแค่ปี == 60
            // console.log(data) // แสดงผลข้อมูลทั้ง Array
            // Database command example
            db.execute("INSERT INTO course (Subject_id, subject, credit) VALUE (%s, %s, %s)" % (data[1], data[3], data[5]))
        }
    });
}