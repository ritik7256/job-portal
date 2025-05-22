import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminJobsTable() {
  const { searchJobByText, allAdminJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const [filterJob, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredjobs =
      allAdminJobs?.length >= 0 &&
      allAdminJobs?.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredjobs);
  }, [searchJobByText, allAdminJobs]);
  return (
    <div>
      <Table>
        <TableCaption>A List of Your recent posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJob?.map((job) => (
            <tr>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2 "
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
