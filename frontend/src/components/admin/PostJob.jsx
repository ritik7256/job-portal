import React, { useState } from "react";
import Navbar from "../shared/Navbar";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function PostJob() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirments: "",
    salary: "",
    location: "",
    experience: "",

    jobType: "",
    position: "",
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };
  const { companies } = useSelector((store) => store.company);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    console.log(input);
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screeen my-5">
        <form
          onSubmit={submitHandler}
          action=""
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>description</Label>
              <Input
                type="text"
                name="description"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>requirments</Label>
              <Input
                type="text"
                name="requirments"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.requirments}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>location</Label>
              <Input
                type="text"
                name="location"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>salary</Label>
              <Input
                type="number"
                name="salary"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>experience</Label>
              <Input
                type="number"
                name="experience"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.experience}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>jobType</Label>
              <Input
                type="text"
                name="jobType"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.jobType}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>position</Label>
              <Input
                type="number"
                name="position"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>
            {companies.length >= 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a company     " />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => {
                      return (
                        <SelectItem
                          key={company._id}
                          value={company?.name?.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>

          {loading ? (
            <Button className={"w-full my-4"}>
              <Loader2 />
              please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className={"w-full my-4"}>
              Post new Job
            </Button>
          )}

          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3 ">
              *Please register a company first before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default PostJob;
