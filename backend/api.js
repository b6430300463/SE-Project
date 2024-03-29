const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const upload = multer({ dest: "../upload/" });
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3307;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// กำหนดค่าการเชื่อมต่อกับ MySQL
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST, //เปลี่ยนทุกครั้งที่เปิด DTB
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// เชื่อมต่อกับ MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// สร้าง API endpoint เพื่อดึงข้อมูลจาก MySQL และส่งให้กับ client ในรูปแบบ JSON
app.get("/api/course", (req, res) => {
  const query = "SELECT * FROM course";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/lecture", (req, res) => {
  const query = "SELECT * FROM course WHERE subject_type = 0";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/lab", (req, res) => {
  const query = "SELECT * FROM course WHERE subject_type = 1";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});



// หลังจากเข้าสู่ระบบ ให้เช็คว่าเจอเมลในฐานข้อมูลไหม ถ้าไม่เจอให้สร้างใหม่ ถ้าเจอให้อัพเดท
app.post("/api/login", (req, res) => {
  let request = req.body;
  const query = 'SELECT * FROM user WHERE email = "' + request.email + '"';

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // ไม่เจอให้สร้างใหม่
      if (!results.length) {
        console.log("Email : " + request.email + " not found in database");
        const query =
          'INSERT INTO user (firstname,lastname,googleid,imageURL,email) VALUE ("' +
          request.givenName +
          '","' +
          request.familyName +
          '","' +
          request.googleId +
          '","' +
          request.imageUrl +
          '","' +
          request.email +
          '")';

        db.query(query, (err, results) => {
          if (err) {
            console.error("Error querying MySQL:", err);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            // สร้างใหม่สำเร็จ
            console.log("Email : " + request.email + " import Success");
            res.status(200).json({ success: true });
          }
        });
      } else {
        // ถ้าเจอให้อัพเดทข้อมูล
        console.log("Email : " + request.email + " found in database");
        const query =
          'UPDATE user SET firstname = "' +
          request.givenName +
          '", lastname = "' +
          request.familyName +
          '", imageURL = "' +
          request.imageUrl +
          '" WHERE email = "' +
          results[0].email +
          '"';

        db.query(query, (err, results) => {
          if (err) {
            console.error("Error querying MySQL:", err);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            // อัพเดทข้อมูลสำเร็จ
            console.log("Email : " + request.email + " update Success");
            res.status(200).json({ success: true });
          }
        });
      }
    }
  });
});

//  update priority
app.post("/api/updatePriority", (req, res) => {
  let request = req.body;
  const query = 'SELECT * FROM user WHERE email = "' + request.email + '"';

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // ไม่เจอให้สร้างใหม่
      if (!results.length) {
        console.log("Email : " + request.email + " not found in database");
        res.status(500).json({
          error: "Email : " + request.email + " not found in database",
        });
      } else {
        // ถ้าเจอให้อัพเดทข้อมูล
        console.log("Email : " + request.email + " found in database");
        const query =
          'UPDATE user SET priority = "' +
          request.priority +
          '" WHERE email = "' +
          results[0].email +
          '"';

        db.query(query, (err, results) => {
          if (err) {
            console.error("Error querying MySQL:", err);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            // อัพเดทข้อมูลสำเร็จ
            console.log("Email : " + request.email + " update Success");
            res.status(200).json({ success: true });
          }
        });
      }
    }
  });
});

app.get("/api/getuser", (req, res) => {
  const query = "SELECT id,email,priority FROM user";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/getcourse/:year", (req, res) => {
  const year = req.params.year;
  let query = "";
  if (year != "all") {
    query = 'SELECT * FROM course WHERE year = "' + year + '"';
  } else {
    query = "SELECT * FROM course";
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/getopencourse/:year", (req, res) => {
  const year = req.params.year;
  let query = "";
  if (year != "all") {
    query = 'SELECT * FROM course WHERE process = 1 AND year = "' + year + '"';
  } else {
    query = "SELECT * FROM course WHERE process = 1";
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/getclosecourse/:year", (req, res) => {
  const year = req.params.year;
  let query = "";
  if (year != "all") {
    query = 'SELECT * FROM course WHERE process = 0 AND year = "' + year + '"';
  } else {
    query = "SELECT * FROM course WHERE process = 0";
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.post("/api/assign_lab", (req, res) => {
  const receivedData = req.body;
  console.log("Received Data:", receivedData);
  if (!receivedData.selectedTeacherReqLab) {
    receivedData.selectedTeacherReqLab = "-";
  }

  const sql =
    "INSERT INTO lab_assign (subject_id, year, subject_name, credit, department, section, total_students, date, start_time, finish_time, room, teacher_request, subject_type,subject_priority, teacher_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

  const values = receivedData.map(data => [
    data.selectedSubjectLab,
    data.selectedYearLab,
    data.selectedSubjectNameLab,
    data.getCreditLab,
    data.selectedCodeLab,
    data.selectedSecLab,
    data.selectednumberLab,
    data.selectedDayLab,
    data.selectedStartLab,
    data.selectedStopLab,
    data.selectedRoomLab,
    data.selectedTeacherReqLab,
    data.selectedLab,
    data.selectedgroupLab,
    data.teacher_id,
  ]);

  console.log("hello", values);

  values.forEach((value, index) => {
    db.query(sql, value, (error, results) => {
      if (error) {
        console.error("Error inserting into database:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      console.log(`Inserted into database at index ${index}:`, results);
      // ตรวจสอบว่าเป็นการแทรกข้อมูลลงในฐานข้อมูลสำเร็จหรือไม่ หากทั้งหมดเสร็จสมบูรณ์ก็ส่งข้อความกลับไปยัง client
      if (index === values.length - 1) {
        // Once all data inserted, initiate the process update
        updateProcess(values.map(data => ({ subject_id: data[0] })), res);
      }
    });
  });
});

app.post("/api/assign_lecture", (req, res) => {
  const receivedData = req.body;
  console.log("Received Data:", receivedData);
  if (!receivedData.selectedteacherreq) {
    receivedData.selectedteacherreq = "-";
  }

  const room = receivedData.room !== undefined ? receivedData.room : "None";
  const sql =
    "INSERT INTO lecture_assign (subject_id, year, subject_name, credit, department, section, total_students, date, start_time, finish_time, room, teacher_request, subject_type, subject_priority, teacher_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

  const values = receivedData.map(data => [
    data.selectedSubject,
    data.selectedYear,
    data.selectedSubjectName,
    data.getCredit,
    data.selectedCode,
    data.selectedSec,
    data.selectednumber,
    data.selectedDay,
    data.selectedStart,
    data.selectedStop,
    room,
    data.selectedteacherreq,
    data.selectedlecture,
    data.selectedgroup,
    data.teacher_id,
  ]);

  console.log("hello", values);

  // วนลูปผ่าน values เพื่อแทรกข้อมูลลงในฐานข้อมูลโดยแยกตาม index
  values.forEach((value, index) => {
    db.query(sql, value, (error, results) => {
      if (error) {
        console.error("Error inserting into database:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      console.log(`Inserted into database at index ${index}:`, results);
      // ตรวจสอบว่าเป็นการแทรกข้อมูลลงในฐานข้อมูลสำเร็จหรือไม่ หากทั้งหมดเสร็จสมบูรณ์ก็ส่งข้อความกลับไปยัง client
      if (index === values.length - 1) {
        // Once all data inserted, initiate the process update
        updateProcess(values.map(data => ({ subject_id: data[0] })), res);
      }
    });
  });
});

function updateProcess(dataArray, res) {
  dataArray.forEach(data => {
    const courseData = 'SELECT * FROM course WHERE subject_id = "' + data.subject_id + '"';

    db.query(courseData, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      } else {
        if (results.length > 0 && results[0].process !== 1) {
          const update = 'UPDATE course SET process = 1 WHERE subject_id = "' + data.subject_id + '"';

          db.query(update, (err, updateResults) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal server error' });
            } else {
              console.log("Update results", updateResults);
            }
          });
        } else {
          console.log("No data found or process already set to 1 for subject_id:", data.subject_id);
        }
      }
    });
  });

  res.status(200).json({ message: "process update initiated" });
}

app.get("/api/teacherassignmentlab", (req, res) => {
  const lab_assign = "SELECT * FROM lab_assign";

  db.query(lab_assign, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});
app.get("/api/teacherassignmentlec", (req, res) => {
  const lecture_assign = "SELECT * FROM lecture_assign";

  db.query(lecture_assign, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});
app.post("/api/upload", upload.single("csv_file"), function (req, res) {
  res.send(req.file);
});

app.post("/api/manual_insertUser", (req, res) => {
  const receivedData = req.body.data;

  console.log("Received Data:", receivedData);

  // Check if receivedData is an object
  if (typeof receivedData !== "object" || receivedData === null) {
    console.error("Received data is not an object");
    return res.status(400).json({ error: "Received data is not an object" });
  }

  // Convert receivedData to an array with a single object if it's not already an array
  const dataArray = Array.isArray(receivedData) ? receivedData : [receivedData];

  // Fix the data for firstname, lastname, googleid, and imageURL
  const fixedData = dataArray.map((user) => {
    const firstname =
      user.firstname !== undefined ? user.firstname : "WaitForUpdate";
    const lastname =
      user.lastname !== undefined ? user.lastname : "WaitForUpdate";
    const googleid = user.googleid !== undefined ? user.googleid : 0;
    const imageURL = user.imageURL !== undefined ? user.imageURL : "None";

    return [
      user.id,
      firstname,
      lastname,
      googleid,
      imageURL,
      user.email,
      user.priority,
    ];
  });

  // Sample insertion code (you might need to adjust it based on your database schema)
  const sql =
    "INSERT INTO user (id, firstname, lastname, googleid, imageURL, email, priority) VALUES ?";

  db.query(sql, [fixedData], (error, results) => {
    if (error) {
      console.error("Error inserting into database:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Inserted into database:", results);
    res.status(200).json({ message: "Data inserted successfully" });
  });
});

app.get("/api/year60", (req, res) => {
  const query = "SELECT * FROM course WHERE year = 60";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/year65", (req, res) => {
  const query = "SELECT * FROM course WHERE year = 65";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});
app.delete("/api/deleteusers", (req, res) => {
  const email = req.body.email;
  const query = "DELETE FROM user WHERE email = ?";

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows > 0) {
        res.json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    }
  });
});

// ให้ server ทำงานที่ port ที่กำหนด

app.post("/api/imtoDB", (req, res) => {
  const receivedData = req.body.data; // Assuming data is sent as an array

  console.log("Received Data:", receivedData);

  // Delete old data first
  const deleteSql = "DELETE FROM course"; // Modify this according to your table name
  db.query(deleteSql, (deleteError, deleteResults) => {
    if (deleteError) {
      console.error("Error deleting old data:", deleteError);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Old data deleted successfully.");

    // Now, you can proceed with inserting new data
    const insertSql =
      "INSERT INTO course (subject_id, year, subject, credit, department, subject_priority, subject_type, process) VALUES ?";
    const values = receivedData.map((user) => [
      user.subject_id,
      user.year,
      user.subject,
      user.credit,
      user.department,
      user.subject_priority,
      user.subject_type,
      user.process,
    ]);

    db.query(insertSql, [values], (insertError, insertResults) => {
      if (insertError) {
        console.error("Error inserting into database:", insertError);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      console.log("Inserted into database:", insertResults);
      res.status(200).json({ message: "Data inserted successfully" });
    });
  });
});



//all_data ของตารางสอนทั้งหมด
app.get("/api/exportall_to_excel", async (req, res) => {
  try {
    const [lecrows, lecfields] = await db.query("SELECT * FROM lecture_assign");
    const [labrows, labfields] = await db.query("SELECT * FROM lab_assign");

    objects;
    const mergedRows = [...lecrows, ...labrows];

    const heading = [
      [
        "subject_id",
        "year",
        "subject_name",
        "credit",
        "department",
        "section",
        "total_students",
        "date",
        "start_time",
        "finish_time",
        "room",
        "subject_type",
        "subject_priority",
      ],
    ];
    const workbook = XLSX.utils.book_new();

    // Create worksheet with merged data
    const mergedWorksheet = XLSX.utils.json_to_sheet(mergedRows);

    XLSX.utils.sheet_add_aoa(mergedWorksheet, heading);

    XLSX.utils.book_append_sheet(workbook, mergedWorksheet, "merged_assign");

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    res.attachment("course.xlsx");
    return res.send(buffer);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while exporting to Excel" });
  }
});
app.get("/api/export_to_excel_eachteacher", async (req, res) => {
  try {
    const [lecrows, lecfields] = await db.query(
      "SELECT subject_id,year,subject_name,credit,department,section,total_students,date,start_time,finish_time,room,subject_type,subject_priority FROM lecture_assign WHERE teacher_id = ?",
      [req.query.teacher_id]
    );
    const [labrows, labfields] = await db.query(
      "SELECT subject_id,year,subject_name,credit,department,section,total_students,date,start_time,finish_time,room,subject_type,subject_priority FROM lab_assign WHERE teacher_id = ?",
      [req.query.teacher_id]
    );

    const lecData = Array.isArray(lecrows) ? lecrows : [];
    const labData = Array.isArray(labrows) ? labrows : [];

    const mergedRows = [...lecData, ...labData];

    const heading = [
      [
        "subject_id",
        "year",
        "subject_name",
        "credit",
        "department",
        "section",
        "total_students",
        "date",
        "start_time",
        "finish_time",
        "room",
        "subject_type",
        "subject_priority",
      ],
    ];
    const workbook = XLSX.utils.book_new();

    const mergedWorksheet = XLSX.utils.json_to_sheet(mergedRows);

    XLSX.utils.sheet_add_aoa(mergedWorksheet, heading);

    XLSX.utils.book_append_sheet(workbook, mergedWorksheet, "merged_assign");

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    res.attachment("course.xlsx");
    return res.send(buffer);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while exporting to Excel" });
  }
});

app.get('/api/get_problem_lecsubject', (req, res) => {
  const query = 
    `SELECT *
    FROM lecture_assign
    WHERE (year, date, start_time, finish_time) IN (
        SELECT year, date, start_time, finish_time
        FROM lecture_assign
        GROUP BY year, date, start_time, finish_time
        HAVING COUNT(*) > 1
    )`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
      
    res.json(results);
  });
});


app.get('/api/get_problem_labsubject', (req, res) => {
  const query = `
    SELECT *
    FROM lab_assign
    WHERE (year, date, start_time, finish_time, room) IN (
        SELECT year, date, start_time, finish_time, room
        FROM lab_assign
        GROUP BY year, date, start_time, finish_time, room
        HAVING COUNT(*) > 1
    )`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
      
    res.json(results);
  });
});
app.get("/api/showUserdata", (req, res) => {
  let request = req.query
  console.log("payload",request)
  const data = 'SELECT firstname,imageURL FROM user WHERE email = ' + request.email + '';

  db.query(data, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }  else {
      res.json(results);
      console.log("userdata",results)
    }
  });
});

app.get("/api/getusername", (req, res) => {
  const query = "SELECT id,firstname,lastname FROM user";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// update Lecture assign
app.post("/api/updateLecAssign", (req, res) => {
  let request = req.body;
  const query = 'SELECT * FROM lecture_assign WHERE subject_id = "' + request.subjectid + '"AND section = "'+ request.section + '"';
  console.log(query);
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.length > 0) {
        if(!request.date){
          request.date = results[0].date;
        }
        if(!request.start_time){
          request.start_time = results[0].start_time;
        }
        if(!request.finish_time){
          request.finish_time = results[0].finish_time;
        }
        console.log("Subject : " + request.subjectid + " date " + request.date + " start_time " + request.start_time + " finish_time " + request.finish_time);
        const updateQuery =
          'UPDATE lecture_assign SET date = "' + request.date + '", start_time = "' + request.start_time + '", finish_time = "' + request.finish_time + '" WHERE subject_id = "' + results[0].subject_id + '"AND section = "'+results[0].section +'"';
        
        db.query(updateQuery, (err, updateResults) => {
          if (err) {
            console.error("Error updating lecture assign in MySQL:", err);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            console.log("Lec Subject : " + request.subjectid + "section" + request.section + " update Success");
            res.status(200).json({ success: true });
          }
        });
      } else {
        console.log("Lec Subject : " + request.subjectid + " not found");
        res.status(404).json({ error: "Subject not found" });
      }
    }
  });
});

// update Lab assign
app.post("/api/updateLabAssign", (req, res) => {
  let request = req.body;
  const query = 'SELECT * FROM lab_assign WHERE subject_id = "' + request.subjectid + '"AND section = "' + request.section + '"';

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
    else {
      if (results.length > 0) {
        if(!request.date){
          request.date = results[0].date;
        }
        if(!request.start_time){
          request.start_time = results[0].start_time;
        }
        if(!request.finish_time){
          request.finish_time = results[0].finish_time;
        }
        if(!request.room){
          request.room = results[0].room;
        }
        console.log("Subject : " + request.subjectid + " date " + request.date + " start_time " + request.start_time + " finish_time " + request.finish_time + " room" + request.room);
        const updateQuery =
          'UPDATE lab_assign SET date = "' + request.date + '", start_time = "' + request.start_time + '", finish_time = "' + request.finish_time + '",room = "' + request.room + '" WHERE subject_id = "' + results[0].subject_id + '" AND section = "' + results[0].section + '"';
        
        db.query(updateQuery, (err, updateResults) => {
          if (err) {
            console.error("Error updating lecture assign in MySQL:", err);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            console.log("Lab Subject : " + request.subjectid + "section" + request.section + " update Success");
            res.status(200).json({ success: true });
          }
        });
      } else {
        console.log("Lab Subject : " + request.subjectid + " not found");
        res.status(404).json({ error: "Subject not found" });
      }
    }
  });
});
app.post("/api/update_process", (req, res) => {
  const dataArray = req.body;
  console.log("Received Data:", dataArray);

  dataArray.forEach(data => {
    const courseData = 'SELECT * FROM course WHERE subject_id = "' + data.subject_id + '"';

    db.query(courseData, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      } else {
        if (results.length > 0 && results[0].process !== 1) {
          const update = 'UPDATE course SET process = 1 WHERE subject_id = "' + data.subject_id + '"';

          db.query(update, (err, updateResults) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal server error' });
            } else {
              console.log("Update results", updateResults);
            }
          });
        } else {
          console.log("No data found or process already set to 1 for subject_id:", data.subject_id);
        }
      }
    });
  });

  res.status(200).json({ message: "process update initiated" });
});
////////
app.get("/api/getlecture_assign", (req, res) => {
  const year = req.params.year;
  let query = "";
  if (year != "all") {
    query = 'SELECT * FROM lecture_assign WHERE year = "' + year + '"';
  } else {
    query = "SELECT * FROM lecture_assign";
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/getlab_assign", (req, res) => {
  const year = req.params.year;
  let query = "";
  if (year != "all") {
    query = 'SELECT * FROM lab_assign WHERE year = "' + year + '"';
  } else {
    query = "SELECT * FROM lab_assign";
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying MySQL:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});


app.get("/api/ExportallLab", async (req, res) => {
  try {
    const [rows, fields] = await db.promise().query("SELECT subject_id, year, subject_name, credit, department, section, total_students, date, start_time, finish_time, room, subject_type, subject_priority FROM lab_assign");
    
    const heading = ['subject_id', 'year', 'subject_name', 'credit', 'department', 'section', 'total_students', 'date', 'start_time', 'finish_time', 'room', 'subject_type', 'subject_priority'];
    const data = [heading, ...rows.map(row => {
      const modifiedRow = Object.values(row);
      modifiedRow[heading.indexOf('date')] = getWeekdayName(modifiedRow[heading.indexOf('date')]);
      return modifiedRow;
    })];
    
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lab_course");

    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    res.attachment('Lab_Course.xlsx');
    return res.send(buffer);
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    res.status(500).json({ error: "An error occurred while exporting to Excel. Please check server logs for more details." });
  }
});
const XLSX = require('xlsx');

app.get("/api/ExportallLec", async (req, res) => {
  try {
    const [rows, fields] = await db.promise().query("SELECT subject_id, year, subject_name, credit, department, section, total_students, date, start_time, finish_time, room, subject_type, subject_priority FROM lecture_assign");
    
    const heading = ['subject_id', 'year', 'subject_name', 'credit', 'department', 'section', 'total_students', 'date', 'start_time', 'finish_time', 'room', 'subject_type', 'subject_priority'];
    const data = [heading, ...rows.map(row => {
      const modifiedRow = Object.values(row);
      modifiedRow[heading.indexOf('date')] = getWeekdayName(modifiedRow[heading.indexOf('date')]);
      return modifiedRow;
    })];
    
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lec_course");

    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    res.attachment('Lec_Course.xlsx');
    return res.send(buffer);
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    res.status(500).json({ error: "An error occurred while exporting to Excel. Please check server logs for more details." });
  }
});

const getWeekdayName = (dayNumber) => {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return weekdays[dayNumber];
};

app.get("/api/exportAllCourses", async (req, res) => {
  try {
    const [labRows, labFields] = await db.promise().query("SELECT subject_id, year, subject_name, credit, department, section, total_students, date, start_time, finish_time, room, subject_type, subject_priority FROM lab_assign");
    const [lectureRows, lectureFields] = await db.promise().query("SELECT subject_id, year, subject_name, credit, department, section, total_students, date, start_time, finish_time, room, subject_type, subject_priority FROM lecture_assign");
    
    const heading = ['subject_id', 'year', 'subject_name', 'credit', 'department', 'section', 'total_students', 'date', 'start_time', 'finish_time', 'room', 'subject_type', 'subject_priority'];
    const labData = labRows.map(row => {
      const modifiedRow = [...Object.values(row)]; // Create a copy of the row
      modifiedRow[heading.indexOf('date')] = getWeekdayName(row.date); // Modify the 'date' value
      return modifiedRow;
    });
    const lectureData = lectureRows.map(row => {
      const modifiedRow = [...Object.values(row)]; // Create a copy of the row
      modifiedRow[heading.indexOf('date')] = getWeekdayName(row.date); // Modify the 'date' value
      return modifiedRow;
    });
    
    const combinedData = [heading, ...labData, ...lectureData];
    
    const worksheet = XLSX.utils.aoa_to_sheet(combinedData);
    const workbook = XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(workbook, worksheet, "Combined_Courses");

    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    res.attachment('Combined_Courses.xlsx');
    return res.send(buffer);
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    res.status(500).json({ error: "An error occurred while exporting to Excel. Please check server logs for more details." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});