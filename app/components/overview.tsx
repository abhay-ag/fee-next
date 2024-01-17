"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useRecoilState } from "recoil";
import { userDetails } from "../states/userDetails";
import { LoadingOutlined } from "@ant-design/icons";
import { attendanceState } from "../states/attendanceState";

export function Overview() {
  const [student, setStudent] = useRecoilState<any>(userDetails);
  const [attendance, setAttendance] = useRecoilState(attendanceState);
  const [data, setData] = useState<any[]>([]);

  const generateData = () => {
    const temp: any[] = [];
    attendance.map((el: any) => {
      temp.push({
        name: el.c_id,
        percentage: (el.attended / el.delivered) * 100,
      });
    });
    setData(temp);
  };

  useEffect(() => {
    if (attendance.length) {
      generateData();
    }
  }, [attendance]);

  const getAttendance = async () => {
    await fetch("/attendance/get", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        courses: student.courses,
        roll_no: student.roll_no,
      }),
    }).then(async (resp) => {
      const data = await resp.json();
      setAttendance(data.data);
    });
  };

  useEffect(() => {
    getAttendance();
  }, []);
  return (
    <>
      {data.length ? (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={14}
              fontWeight={600}
              tickLine={false}
              axisLine={true}
            />
            <YAxis
              stroke="#888888"
              fontSize={14}
              tickLine={true}
              fontWeight={600}
              axisLine={true}
              tickFormatter={(value) => `${value}`}
            />
            <Bar
              dataKey="percentage"
              fill="currentColor"
              label={({ payload, x, y, width, height, value }) => (
                <text
                  x={x + width / 2}
                  y={y + height / 2}
                  fill="#fff"
                  fontSize={14}
                  fontWeight={300}
                  textAnchor="middle"
                  dy={-6}
                >{`${value.toFixed(2)}`}</text>
              )}
              radius={[16, 16, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <LoadingOutlined />
      )}
    </>
  );
}
