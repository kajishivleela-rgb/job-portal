import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
const Navbar = () => {
    const user = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                toast.success(res.data.message);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (

        <div className="mt-2 w-screen">
            <div>
                <div className="flex items-center justify-between h-16 px-4">

                    <h1 className="text-2xl font-bold">
                        Job<span className="text-[#F83002]">Portal</span>
                    </h1>
                    <div className="flex items-center gap-4">
                        <ul className="flex items-center gap-6">
                            {
                                user && user?.user?.role == 'recruiter' ? (
                                    <>
                                        <li><Link to="/admin/companies">Companies</Link></li>
                                        <li><Link to="/admin/jobs">Jobs</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/Jobs">Jobs</Link></li>
                                        <li><Link to="/Browse">Browse</Link></li>
                                    </>
                                )
                            }
                        </ul>

                        {!user?.user ? (
                            <div className="flex gap-2">
                                <Link to="/login">
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button variant="outline">Signup</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.user?.profile?.profilePhoto} />
                                        <AvatarFallback></AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-80 bg-white">
                                    <div className="">
                                        <div className="flex gap-2 space-y-2">

                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={user?.user?.profile?.profilePhoto} />
                                                <AvatarFallback>
                                                    {user?.user?.fullname}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="font-medium">{user?.user?.fullname}</h4>
                                                <p className="text-sm text-muted-foreground">{user?.user?.profile?.bio}</p>

                                            </div>
                                        </div>

                                        <hr />
                                        <div className="flex flex-col my-2 text-gray-600">

                                            {
                                                user && user?.user?.role == 'student' && (
                                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                        <Link to="/profile">
                                                            <button className="w-full text-left hover:bg-gray-100 px-2 py-1 rounded">
                                                                Profile
                                                            </button>
                                                        </Link>
                                                    </div>
                                                )
                                            }


                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <button
                                                    onClick={logoutHandler}
                                                    className="text-left hover:bg-gray-100 px-2 py-1 rounded text-red-500">
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Navbar