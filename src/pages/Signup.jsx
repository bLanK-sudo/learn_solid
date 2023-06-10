

import { Motion } from "@motionone/solid";
import {login, replaceFunction, setLogin} from "../../public/js/store.js";
import { useNavigate } from "@solidjs/router";
import { A } from "@solidjs/router";



const Signup = () => {
    const navigate = useNavigate();
    return <>
    <Motion animate={{opacity:[0, 1]}} transition={{ duration: .7, easing: "ease-in-out" }}>
        <h3 className="heavy-header text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center m-5 p-4">SignUp</h3>
        <div class="flex flex-col items-center justify-center min-h-screen">
            <form class="pb-6" action="/login" method="post">
                <div class="flex flex-col gap-4 p-4">
                    <label htmlFor="pwd">Username</label>
                    <input type="text" name="name" id="name" required/>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" required/>           
                    <label htmlFor="pwd">Password</label>
                    <input type="password" name="pwd" id="pwd" required/>
                    <label htmlFor="level">Level</label>
                    <select name="level" id="level" class="w-full" required>
                        <option value="foundation">Foundational</option>
                        <option value="diploma">Diploma</option>
                        <option value="degree">Degree</option>
                    </select>
                    <div class="flex flex-col">
                    <label htmlFor="bio">Bio / About</label>
                    <span class="text-sm">(for a better look keep it under 10 words)</span>
                    </div>
                    <input type="text" name="bio" id="bio" />
                </div>
                <div class="w-max m-auto flex flex-col justify-center items-center">
                <button type="submit" onClick={() => {setLogin(true); navigate("/home", {replace:true})}} className="font-poppins font-bold w-56 btn m-auto">Sign Up</button>
            <p class="p-4">Already have an account? <A href="/login" class="underline px-2 text-bordercol-light dark:text-bordercol-dark">Log In</A></p>
                </div>
            </form>
            
        </div>
    </Motion>
    </>
}


export default Signup;