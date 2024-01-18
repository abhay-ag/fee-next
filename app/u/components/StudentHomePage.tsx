"use client";
import { Overview } from "@/app/components/overview";
import { attendanceState } from "@/app/states/attendanceState";
import { courseState } from "@/app/states/coursesState";
import { userDetails } from "@/app/states/userDetails";
import { userState } from "@/app/states/userState";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CiCircleOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function StudentComponent() {
  const [user, setUser] = useRecoilState(userState);
  const [userData, setUserData] = useRecoilState<any>(userDetails);
  const [courses, setCourses] = useRecoilState<any>(courseState);
  const [attendance, setAttendance] = useRecoilState(attendanceState);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState([]);
  const router = useRouter();

  async function getStudentData() {
    await fetch("notification", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    }).then(async (resp) => {
      const response = await resp.json();
      setNotification(response.data);
    });
    await fetch("student/get", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roll_no: user }),
    }).then(async (resp) => {
      const data = await resp.json();
      if (data.state === "Not Found") {
        setUser("");
        localStorage.setItem("roll_no", "");
        router.push("/");
      }
      setUserData(data.data);

      await fetch("/courses/get", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courses: data.data.courses }),
      }).then(async (resp) => {
        const data = await resp.json();
        setCourses(data.data);
      });
      await fetch("/attendance/get", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          courses: data.data.courses,
          roll_no: data.data.roll_no,
        }),
      }).then(async (resp) => {
        const data = await resp.json();
        setAttendance(data.data);
      });
    });
  }

  useEffect(() => {
    if (localStorage.getItem("roll_no") !== "") {
      setUser(localStorage.getItem("roll_no") as string);
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (user.length) {
      getStudentData();
    }
  }, [user]);

  useEffect(() => {
    if (courses.length && attendance.length) {
      setLoading(false);
    }
  }, [courses, attendance]);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-screen h-screen">
          <LoadingOutlined className="text-7xl" />
        </div>
      ) : (
        <Tabs defaultValue="overview" className="space-y-4">
          {/* <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList> */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {attendance.map((el: any) => {
                const percentage = (el.attended / el.delivered) * 100;
                const canSkip = Math.floor(el.attended / 0.75 - el.delivered);
                const toAttend = Math.ceil(
                  (el.attended - 0.75 * el.delivered) / -0.25
                );
                return (
                  <Card key={el.c_id}>
                    <CardHeader className="p-6 pb-3 space-y-0">
                      <CardTitle>{el.c_id}</CardTitle>
                      <CardDescription>{el.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                      <div className="flex items-start justify-between">
                        <span className="flex text-sm flex-col">
                          <b>Attended: {el.attended}</b>
                          <b>Delivered: {el.delivered}</b>
                        </span>
                        <b className="text-sm">
                          {percentage < 75
                            ? `Need to attend: ${toAttend}`
                            : `Can skip:  ${canSkip}`}
                        </b>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HistoryOutlined /> Important updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {notification.map((el: any) => (
                    <div className="flex gap-2 items-center border-b py-2 text-base">
                      <>
                        <InfoCircleOutlined />
                        <span>
                          <b>{el.title}</b> -{" "}
                          <span className="w-4 overflow-hidden whitespace-nowrap text-ellipsis">
                            {el.description}
                          </span>
                        </span>
                      </>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </>
  );
}
