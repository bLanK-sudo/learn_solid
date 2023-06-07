import { Motion } from "@motionone/solid";
import {login, replaceFunction, setLogin} from "../js/store.js";
import { useNavigate } from "@solidjs/router";
import { A } from "@solidjs/router";



const Login = () => {
    const navigate = useNavigate();
    return <>
    <Motion animate={{opacity:[0, 1]}} transition={{ duration: .7, easing: "ease-in-out" }}>
    <h3 className="heavy-header text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center m-5 p-4">Login</h3>
        <div class="flex flex-col items-center justify-center min-h-screen">
            <div>
                <div class="flex flex-col gap-4 p-4">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" required/>           
                    <label htmlFor="pwd">Password</label>
                    <input type="password" name="pwd" id="pwd" required/>
                </div>
                <div class="w-max m-auto flex flex-col justify-center items-center">
                <button type="submit" onClick={async() => {
                    try{
                        const response = await fetch("https://localhost:5000/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({"email": document.getElementById("email").value, "password": document.getElementById("pwd").value})
                    });
                    const data = await response.json();
                    if(data) setLogin(true); navigate("/home", {replace:true});

                    }catch(err){
                        console.log(err);
                    }
                    

                }} className="font-poppins font-bold w-56 btn m-auto">Log In</button>
                <p class="p-4">Don't have an account? <A href="/signup" class="underline px-2 text-bordercol-light dark:text-bordercol-dark">Sign Up</A></p>
                </div>
            </div>
            
        </div>
    </Motion>
    </>
}

export default Login