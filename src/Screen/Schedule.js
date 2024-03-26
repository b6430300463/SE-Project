import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Schedule = () => {
  const [getLec, setGetLec] = useState([]);
  const [getLab, setGetLab] = useState([]);
  const [session, setSession] = useState([]);
  const url = "http://localhost:3307";
  const day = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const timeslots = [
    "",
    "08:00-09:00",
    "09:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-13:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
    "17:00-18:00",
    "18:00-19:00",
    "19:00-20:00",
    "20:00-21:00",
    "21:00-22:00",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lecResponse = await axios.get(`${url}/api/teacherassignmentlec`);
        const labResponse = await axios.get(`${url}/api/teacherassignmentlab`);

        setGetLec(lecResponse.data);
        setGetLab(labResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (getLec.length > 0 && getLab.length > 0) {
      setSession([...getLec, ...getLab]);
    }
  }, [getLec, getLab]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        {timeslots.map((timeslot, timeIndex) => (
          <div
            key={timeIndex}
            style={{
              backgroundColor: timeIndex === 0 ? "lightgray" : "white",
              padding: "4px 12px",
              border: "1px solid lightgray",
              borderRight: "none",
              borderBottom: "none",
              width: "120px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              color: "gray",
            }}
          >
            {timeslot}
          </div>
        ))}
      </div>

      {day.map((day, dayIndex) => (
        <div
          key={dayIndex}
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "calc(100% - 120px)",
          }}
        >
          <div
            style={{
              width: "120px",
              backgroundColor: "lightgray",
              padding: "4px 12px",
              border: "1px solid lightgray",
              borderRight: "none",
              borderBottom: "none",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              color: "gray",
            }}
          >
            {day}
          </div>
          {timeslots
            .slice(1)
            .map((time, timeIndex) => (
              <div
                key={timeIndex}
               
              >
                {session
                  .filter(
                    (data) => data.date === day && data.start_time === time
                  )
                  .map((filteredData, index) => (
                    <div
                      key={index}
                      style={{
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          color: "gray",
                          marginBottom: "4px",
                          marginRight: "8px",
                        }}
                      >
                        {filteredData.subject_id}-
                        {filteredData.subject_name}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Schedule;