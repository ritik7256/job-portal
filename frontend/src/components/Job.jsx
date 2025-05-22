import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

function Job({ job }) {
  const Navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  };
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p>
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : daysAgoFunction(job?.createdAt)}{" "}
          days ago
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-0" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} alt="company logo" />
          </Avatar>
        </Button>
        <div>
          <h1>{job?.company?.name}</h1>
          <p>india</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-sm text-gray-600">{job.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job.position} position
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="show">
          {job.salary}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant={"outline"}
          onClick={() => Navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>
        <Button className={"bg-[#7209b7] text-white"}>Save for Later</Button>
      </div>
    </div>
  );
}

export default Job;
