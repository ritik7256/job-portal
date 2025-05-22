import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";

function JobDescription() {
  const params = useParams();
  const jobId = params.id;

  console.log("Job ID from params:", jobId);
  const { user } = useSelector((store) => store.auth);
  const { singlejob } = useSelector((store) => store.job);
  console.log("single job is ", singlejob);
  const isInitiallyApplied = singlejob?.applications?.some(
    (application) => application.applicant === user?._id
  );
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log("res is ", res);
        console.log(res);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);
  console.log("single job is ", singlejob);

  const applyHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);

      if (res.data.success) {
        setIsApplied(true);
        dispatch(setSingleJob(updateSingleJob));
        const updateSingleJob = {
          ...singlejob,
          applications: [...singlejob.applications, { applicant: user?._id }],
        };

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="max-w-6xl mx-auto my-10 ">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-xl "> {singlejob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singlejob?.position}
            </Badge>
            <Badge className={"text-[#ac8c85] font-bold"} variant="ghost">
              {singlejob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="show">
              {singlejob?.salary}
            </Badge>
          </div>
        </div>

        <Button
          disabled={isApplied}
          onClick={isApplied ? null : applyHandler}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover: bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already applied" : "Apply now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4  ">
        {singlejob?.description}
      </h1>
      <div>
        <h1 className="font-bold my-1">
          Role :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {" "}
            {singlejob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {" "}
            {singlejob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.experience} yrs
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.salary} Lpa
          </span>
        </h1>
        <h1 className="font-bold my-1">
          total Applicants :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          posted date :{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
}

export default JobDescription;
