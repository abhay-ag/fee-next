"use client";
import { Overview } from "@/app/components/overview";
import { userDetails } from "@/app/states/userDetails";
import { userState } from "@/app/states/userState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function StudentComponent() {
  const [user, setUser] = useRecoilState(userState);
  const [userData, setUserData] = useRecoilState<any>(userDetails);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function getStudentData() {
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
      setLoading(false);
    }
  }, [user]);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-screen h-screen">
          <LoadingOutlined className="text-7xl" />
        </div>
      ) : (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Course Content</TabsTrigger>
            <TabsTrigger value="reports">Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                {/* <CardHeader> */}
                <CardTitle>ASDF</CardTitle>
                {/* </CardHeader> */}
                {/* <CardContent></CardContent> */}
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-7">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </>
  );
}
