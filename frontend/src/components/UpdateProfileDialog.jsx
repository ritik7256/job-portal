import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

function UpdateProfileDialog({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }

    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className={"sm:max-w-[425px] "}
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle> Update Profile</DialogTitle>
          </DialogHeader>
          <form action="" onSubmit={submitHandler}>
            <div className="grid grif-cols-4 items-center gap-4 ">
              <Label htmlFor="name" className={"text-right"}>
                Name
              </Label>
              <Input
                id="fullname"
                name="fullname"
                className={"col-span-3"}
                value={input.fullname}
                onChange={changeEventHandler}
              />
            </div>

            <div className="grid grif-cols-4 items-center gap-4 ">
              <Label htmlFor="email" className={"text-right"}>
                Email
              </Label>
              <Input
                value={input.email}
                id="email"
                name="email"
                className={"col-span-3"}
                onChange={changeEventHandler}
              />
            </div>

            <div className="grid grif-cols-4 items-center gap-4 ">
              <Label htmlFor="number" className={"text-right"}>
                Number
              </Label>
              <Input
                value={input.phoneNumber}
                id="number"
                name="number"
                className={"col-span-3"}
                onChange={changeEventHandler}
              />
            </div>

            <div className="grid grif-cols-4 items-center gap-4 ">
              <Label htmlFor="bio" className={"text-right"}>
                Bio
              </Label>
              <Input
                value={input.bio}
                id="bio"
                onChange={changeEventHandler}
                name="bio"
                className={"col-span-3"}
              />
            </div>

            <div className="grid grif-cols-4 items-center gap-4 ">
              <Label htmlFor="skills" className={"text-right"}>
                skills
              </Label>
              <Input
                value={input.skills}
                id="skills"
                name="skills"
                onChange={changeEventHandler}
                className={"col-span-3"}
              />
            </div>

            <div className="grid grif-cols-4 items-center gap-4 ">
              <Label htmlFor="file" className={"text-right"}>
                Resume
              </Label>
              <Input
                id="file"
                name="file"
                type={"file"}
                onChange={fileChangeHandler}
                accept=".pdf,.doc,.docx"
                className={"col-span-3"}
              />
            </div>
            <DialogFooter>
              {loading ? (
                <Button className={"w-full my-4"}>
                  <Loader2 />
                  please wait{" "}
                </Button>
              ) : (
                <Button type="submit" className={"w-full my-4"}>
                  update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateProfileDialog;
