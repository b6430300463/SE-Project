import React, { useState, useEffect, useRef } from "react";

const TG = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [period_date, setPeriod_date] = useState("");
  const [isCheck, setIsCheck] = useState(true);
  const printContentRef = useRef(null);

  //   useEffect(() => {
  //     getSchedule();
  //   }, []);

  //   const getSchedule = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get("/getSchedule", {
  //         params: {
  //           stdId: "your_student_info_stdId",
  //         },
  //       });
  //       setCourses(response.data.course);
  //       setPeriod_date(response.data.peroid_date);
  //     } catch (error) {
  //       console.log(error);
  //       // Perform any necessary error handling, e.g. clearing auth data
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  const headers = [
    "Day/Time",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];

  const orderedDate = {
    MON: 0,
    TUE: 1,
    WED: 2,
    THU: 3,
    FRI: 4,
    SAT: 5,
    SUN: 6,
  };
  const getColorByDate = (date) => {
    // Replace this with appropriate logic
    return "bg-gray-200";
  };
  const mappedCourses = {};

  const timeToCol = (timeString) => {
    const time = timeString?.split(":") || [];
    if (time.length !== 2) return 0;
    const remainder = +time[1] / 60;
    return (+time[0] + remainder) * 2 - 13;
  };

  const logout = () => {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("stdId");
    // you can change this to match your React routing
    window.location.href = "/";
  };

  return (
    <div className="mx-auto container pt-7 pb-10">
      <div className="flex flex-wrap justify-between">
        <div className="text-center mr-2 mb-5 float-right w-full sm:w-auto self-end sm:self-center">
          <button
            className={`
            block
            ${
              isCheck
                ? "border-green-500 text-green-500"
                : "border-blue-600 text-blue-600"
            }
            rounded
            px-3
            py-1
            text-md
            lg:text-lg
            mr-2
            hover:bg-gray-100
            dark:text-white
            dark:hover:bg-gray-700
          `}
          >
            <i className="fas fa-download"></i>
            Save as PNG
          </button>
          <button className="block" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div
        className="
    overflow-x-auto
    border
    mx-1
    rounded-lg
    select-none
    table-w
  "
        ref={printContentRef}
      >
        <div className="overflow-x-hidden table-w">
          <div className="grid grid-cols-26">
            {headers.map((header, headerIndex) => (
              <div
                key={`header-${headerIndex}`}
                className={`
                  border
                  py-1
                  pl-1
                  col-span-2
                  dark:text-white
                  dark:border-gray-700
                `}
              >
                {header}
              </div>
            ))}
          </div>
          <div
            id="table"
            className="grid grid-cols-26 min-h-16 md:min-h-24 border dark:border-gray-700"
          >
            {Object.keys(orderedDate).map((dateKey, dateIndex) => (
              <React.Fragment key={`date-${dateIndex}`}>
                <div
                  className={`
                    border
                    p-1
                    md:p-3
                    col-span-2
                    border-r-2
                    dark:border-gray-700
                    ${getColorByDate(dateKey)}
                  `}
                >
                  <span className="font-bold dark:text-gray-900">
                    {dateKey}
                  </span>
                </div>
                {Object.values(mappedCourses)
                  .flat()
                  .map((course, courseIndex) => (
                    <div
                      key={`course-${courseIndex}`}
                      className={`
                      border
                      p-2
                      md:px-3
                      md:py-2
                      rounded
                      text-xs
                      md:text-sm
                      bg-opacity-60
                      flex
                      flex-col
                      justify-between
                      hover:bg-opacity-70
                      overflow-hidden
                      cursor-pointer
                      dark:bg-opacity-100
                      dark:border-gray-700
                      my-col-start-${course.startCol}
                      my-col-end-${course.endCol}
                      ${getColorByDate(dateKey)}
                    `}
                    >
                      <p className="flex flex-wrap justify-between mb-2">
                        <span>
                          {course.subject_code}{" "}
                          <span>
                            [{course.time_from}-{course.time_to}]
                          </span>
                        </span>
                      </p>
                      <p
                        className={`
                        ${
                          isCheck
                            ? "text-gray-700"
                            : "text-gray-200 dark:text-gray-300"
                        }
                        text-xs
                        md:text-sm
                      `}
                      >
                        {isCheck
                          ? course.subject_name_en
                          : course.subject_name_th}
                      </p>
                      <div
                        className={`
                        ${
                          isCheck
                            ? "text-gray-700"
                            : "text-gray-200 dark:text-gray-300"
                        }
                        text-xs
                        dark:text-gray-400
                      `}
                      >
                        <span
                          className={`
                          ${isCheck ? "hidden md:inline" : "hidden sm:inline"}
                        `}
                        >
                          {course.room_name_th}
                        </span>
                        <span
                          className={`
                          ${isCheck ? "md:hidden inline" : "sm:hidden inline"}
                        `}
                        >
                          {course.room_name_en}
                        </span>
                      </div>
                      <div
                        className={`
                        ${
                          isCheck
                            ? "text-gray-700"
                            : "text-gray-200 dark:text-gray-300"
                        }
                        text-xs
                        dark:text-gray-400
                      `}
                      >
                        <span
                          className={`
                          ${isCheck ? "hidden md:inline" : "hidden sm:inline"}
                        `}
                        >
                          {" "}
                          หมู่ {course.section_code} {course.section_type_th}
                        </span>
                        <span
                          className={`
                          ${isCheck ? "md:hidden inline" : "sm:hidden inline"}
                        `}
                        >
                          {" "}
                          SEC
                          {course.section_code} {course.section_type_en}
                        </span>
                      </div>
                    </div>
                  ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TG;
