import Warning from "../components/warning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const value = "Bearer";
    return (
        <div className="flex justify-center bg-gray-200 h-screen">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"}/>
                    <SubHeading label={"Enter credentials to access your account"}/>
                    <div className="flex flex-col space-y-5">
                        <input
                            type="text"
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            placeholder="Email"
                            className="px-2 py-1 w-full border rounded border-gray-200"
                        />
                        <input
                            type="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            placeholder="Password"
                            className="px-2 py-1 w-full border rounded border-gray-200"
                        />
                    </div>
                    <div className="pt-4">
                        <Button
                            onClick={async () => {
                                try {
                                    const response = await axios.post(
                                        "http://localhost:3000/api/v1/user/signin",
                                        {
                                            username,
                                            password,
                                        },
                                        {
                                            headers: {
                                                Authorization: `${value} ${token}`,
                                            },
                                        }
                                    );

                                    localStorage.setItem("token", response.data.token);
                                    navigate('/dashboard');
                                } catch (error) {
                                    console.error('Error signing in:', error);
                                    // Handle the error or display an error message to the user
                                }
                            }}
                            label={"Sign in"}
                        />
                    </div>
                    <Warning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    );
}

export default Signin;
