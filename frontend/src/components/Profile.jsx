import { Contact, Mail, Pen } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Label } from "@radix-ui/react-label";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import AppliedJobTable from "./AppliedJobTable";
import App from "@/App";
import Navbar from "./shared/Navbar";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJob";
const skills = ["html", "css", "jsvascript", "reacts js"];

function Profile() {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const isHaveResume = true;
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://imgs.search.brave.com/70oK6TSRz-VxIRrmW3igH4ZyAKyxxfNu0bRVNM9KMF4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzcxLzc2LzUx/LzM2MF9GXzEyNzE3/NjUxMDRfZkE2T1pY/OVNhenZOaXRYcXZl/OWFESnpRdVJjMkVI/REsuanBn" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user.fullname}</h1>
              <p>{user?.profile.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user.phoneNumber}</span>
          </div>
        </div>

        <div>
          <h1>Skills</h1>
          <div className="flex gap-2 flex-wrap">
            <div className="flex items-center gap-4">
              {user.profile?.skills.length != 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-md font-bold ">{user.resume}</Label>
            {isHaveResume ? (
              <a target="blank" href="">
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span>Not applicable</span>
            )}
          </div>
          <div className="max-w-4xl mx-auto bg-white rounded-2xl">
            <h1 className="font-bold text-lg my-5">Applied Jobs</h1>

            <AppliedJobTable />
          </div>
        </div>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
