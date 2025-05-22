import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div>
      Application table
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className={"text-right"}>status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs?.lenght <= 0 ? (
            <span></span>
          ) : (
            allAppliedJobs?.map((item, index) => (
              <TableRow key={item?._id}>
                <TableCell>{item.createdAt.split("T")[0]}</TableCell>
                <TableCell>{item.job.title}</TableCell>
                <TableCell>{item.job.company.name}</TableCell>
                <TableCell className={"text-right"}>
                  <Badge
                    className={`${
                      item?.status === "rejected"
                        ? "bg-red-400"
                        : item.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable;
