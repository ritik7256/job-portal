import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-16">
        <div>
          <h1 className="text-2xl font-bold ">
            Job <span className="text-[#f83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to={"/admin/company"}>Companies</Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"}>jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/"}>home</Link>
                </li>
                <li>
                  <Link to={"/jobs"}>jobs</Link>
                </li>
                <li>
                  <Link to={"/browse"}>browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex gap-4 items-center ">
              <Link to={"/login"}>
                <Button variant={"outline"}>Login</Button>
              </Link>

              <Link to={"/signup"}>
                <Button className={"bg-[#6A38C3] hover:bg-[#5b30a6]"}>
                  signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className={"cursor-pointer"}>
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className={"w-80 "}>
                <div className="flex gap-4 space-y-2">
                  <Avatar className={"cursor-pointer"}>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium "> {user?.fullname}</h4>
                    <p>{user?.bio}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 space-y-2">
                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Link to={"/profile"}>
                        <Button variant={"link"}>View Profile</Button>
                      </Link>
                    </div>
                  )}

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant={"link"}>
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
