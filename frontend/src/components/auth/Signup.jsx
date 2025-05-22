import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFilehandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };
  const { user } = useSelector((store) => store.auth);
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("password", input.password);
      formData.append("role", input.role);
      if (input.file) {
        formData.append("file", input.file);
      }
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Signup</h1>
          <div className="my-2">
            <Label> Full Name</Label>
            <Input
              type={"text"}
              value={input.fullname}
              name={"fullname"}
              onChange={changeEventHandler}
              placeholder={"Enter your email"}
            />
          </div>
          <div className="my-2">
            <Label> email</Label>
            <Input
              value={input.email}
              name={"email"}
              onChange={changeEventHandler}
              type={"email"}
              placeholder={"Enter your email"}
            />
          </div>
          <div className="my-2">
            <Label> phone Number</Label>
            <Input
              value={input.phoneNumber}
              name={"phoneNumber"}
              onChange={changeEventHandler}
              type={"phoneNumber"}
              placeholder={"Enter your mobile"}
            />
          </div>
          <div className="my-2">
            <Label> password</Label>
            <Input
              value={input.password}
              name={"password"}
              onChange={changeEventHandler}
              type={"password"}
              placeholder={"Enter your password"}
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup defaultValue="comfortable" className={"flex"}>
              <div className="flex items-center space-x-2">
                <Input
                  type={"radio"}
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className={"cursor-pointer"}
                />

                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type={"radio"}
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className={"cursor-pointer"}
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type={"file"}
                onChange={changeFilehandler}
                className={"cursor-pointer"}
              />
            </div>
          </div>

          {loading ? (
            <Button className={"w-full my-4"}>
              <Loader2 />
              please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className={"w-full my-4"}>
              Signup
            </Button>
          )}
          <span>
            Already have an Account?{" "}
            <Link className="text-blue-300" to={"/login"}>
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
