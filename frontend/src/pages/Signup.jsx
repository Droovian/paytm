import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import Warning from "../components/warning";
import Button from "../components/Button";
import { useCookies } from 'react-cookie';

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');

    const [cookies, setCookies] = useCookies(['firstname']);
    const navigate = useNavigate();

    return ( 
        <div className="flex justify-center bg-gray-200 h-screen">

            <div className="flex flex-col justify-center">
               <div className="rounded-lg bg-white w-96 text-center p-2 h-max px-4">
                    <Heading label="Sign Up" />
                    { error && <p className="text-red-500">{error}</p>}
                    <SubHeading label="Enter your information to create an account"/>
                    <div className="p-2 flex flex-col space-y-4">
                    <input type="text" 
                    className="px-2 py-1 w-full border rounded border-gray-200"
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                    placeholder="Fname"
                    />
                    <input type="text" 
                    className="px-2 py-1 w-full border rounded border-gray-200"
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                    placeholder="Lname"
                    />
                    <input type="text" 
                    className="px-2 py-1 w-full border rounded border-gray-200"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    placeholder="Email"
                    />
                    <input type="password" 
                    className="px-2 py-1 w-full border rounded border-gray-200"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    placeholder="password"
                    />
                    <div className="pt-4">
                        <Button
                         onClick={
                            async() => {
                            try{
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                                username,
                                firstName,
                                lastName,
                                password
                            });
                            }
                            catch(error){
                                setError('Could not sign up!');
                            }
                            localStorage.setItem("token", response.data.token)
                            setCookies('firstname', firstName);
                            navigate("/dashboard");
                         }}
                         label="Sign Up"/>
                         
                    </div>
                    <Warning label="Already have an account?" buttonText="Sign In" to={"/signin"}/>
                    </div>
               </div>
            </div>
        </div>
     );
}
 
export default Signup;