
const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const upload = multer({ dest: '../upload/' })
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3308;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// กำหนดค่าการเชื่อมต่อกับ MySQL
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

// สร้าง API endpoint เพื่อดึงข้อมูลจาก MySQL และส่งให้กับ client ในรูปแบบ JSON
app.get('/api/course', (req, res) => {
  const query = 'SELECT * FROM course';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/lecture', (req, res) => {
  const query = 'SELECT * FROM course WHERE subject_type = 0';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/lab', (req, res) => {
  const query = 'SELECT * FROM course WHERE subject_type = 1';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});


// หลังจากเข้าสู่ระบบ ให้เช็คว่าเจอเมลในฐานข้อมูลไหม ถ้าไม่เจอให้สร้างใหม่ ถ้าเจอให้อัพเดท
app.post('/api/login', (req, res) => {
  let request = req.body
  const query = 'SELECT * FROM user WHERE email = "' + request.email + '"';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // ไม่เจอให้สร้างใหม่
      if (!results.length) {
        console.log("Email : " + request.email + " not found in database")
        const query = 'INSERT INTO user (firstname,lastname,googleid,imageURL,email) VALUE ("' + request.givenName + '","' + request.familyName + '","' + request.googleId + '","' + request.imageUrl + '","' + request.email + '")';

        db.query(query, (err, results) => {
          if (err) {
            console.error('Error querying MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            // สร้างใหม่สำเร็จ
            console.log("Email : " + request.email + " import Success")
            res.status(200).json({ success: true });
          }
        });
      } else { // ถ้าเจอให้อัพเดทข้อมูล
        console.log("Email : " + request.email + " found in database")
        const query = 'UPDATE user SET firstname = "' + request.givenName + '", lastname = "' + request.familyName + '", imageURL = "' + request.imageUrl + '" WHERE email = "' + results[0].email + '"';

        db.query(query, (err, results) => {
          if (err) {
            console.error('Error querying MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            // อัพเดทข้อมูลสำเร็จ
            console.log("Email : " + request.email + " update Success")
            res.status(200).json({ success: true });
          }
        });
      }
    }
  });
});

//  update priority
app.post('/api/updatePriority', (req, res) => {
  let request = req.body
  const query = 'SELECT * FROM user WHERE email = "' + request.email + '"';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // ไม่เจอให้สร้างใหม่
      if (!results.length) {
        console.log("Email : " + request.email + " not found in database")
        res.status(500).json({ error: "Email : " + request.email + " not found in database" });
      } else { // ถ้าเจอให้อัพเดทข้อมูล
        console.log("Email : " + request.email + " found in database")
        const query = 'UPDATE user SET priority = "' + request.priority + '" WHERE email = "' + results[0].email + '"';

        db.query(query, (err, results) => {
          if (err) {
            console.error('Error querying MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            // อัพเดทข้อมูลสำเร็จ
            console.log("Email : " + request.email + " update Success")
            res.status(200).json({ success: true });
          }
        });
      }
    }
  });
});

app.post('/api/upload', upload.single('csv_file'), function (req, res) {
  res.send(req.file)
});

app.get('/api/getuser', (req, res) => {
  const query = 'SELECT email FROM user';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/imtoDB',(req,res) => {
  const subject_id = req.body.subject_id;
  const year = req.body.year;
  const subject = req.body.subject;
  const credit = req.body.credit;
  const department = req.body.department;
  const subject_priority = req.body.subject_priority;
  const subject_type = req.body.subject_type;
  const process = req.body.process;

  connection.query("INSET INTO course (subject_id,year,subject,credit,department,subject_priority,subject_type,process) VALUES(?,?,?,?,?,?,?,?)",
    [subject_id,year,subject,credit,department,subject_priority,subject_type,process],
    (err,result) => {
      if(err){
        console.log(err);
      }
      res.send("Import complete")
    }
  );
});
// ให้ server ทำงานที่ port ที่กำหนด
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

