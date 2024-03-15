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

app.post("/api/imtoDB", (req, res) => {
  const receivedData = req.body.data; // Assuming data is sent as an array

  console.log("Received Data:", receivedData);

  // Now, you can use receivedData to insert into the database

  // Sample insertion code (you might need to adjust it based on your database schema)
  const sql =
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

  db.query(sql, [values], (error, results) => {
    if (error) {
      console.error("Error inserting into database:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Inserted into database:", results);
    res.status(200).json({ message: "Data inserted successfully" });
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
  const query = "SELECT email,priority FROM user";

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

  const sql =
    "INSERT INTO lab_assign (subject_id, year, subject_name, credit, department, section, total_students, date, start_time, finish_time, room, teacher_request, subject_type,subject_priority, teacher_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

  const values = receivedData.map((data) => [
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
        res.status(200).json({ message: "Data inserted successfully" });
      }
    });
  });
});

app.post("/api/assign_lecture", (req, res) => {
  const receivedData = req.body;
  console.log("Received Data:", receivedData);

  const room = receivedData.room !== undefined ? receivedData.room : "None";
  const sql =
    "INSERT INTO lecture_assign (subject_id, year, subject_name, credit, department, section, total_students, date, start_time, finish_time, room, teacher_request, subject_type, subject_priority, teacher_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

  const values = receivedData.map((data) => [

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
        res.status(200).json({ message: "Data inserted successfully" });
      }
    });
  });
});

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

  // Now, you can use receivedData to insert into the database

  // Sample insertion code (you might need to adjust it based on your database schema)
  const sql =
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

  db.query(sql, [values], (error, results) => {
    if (error) {
      console.error("Error inserting into database:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Inserted into database:", results);
    res.status(200).json({ message: "Data inserted successfully" });
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
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
//leccccccccc
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

//labbbbbbb
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