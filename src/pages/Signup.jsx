

import { Motion } from "@motionone/solid";
import {error, login, replaceFunction, setError, setLogin} from "../../public/js/store.js";
import { useNavigate } from "@solidjs/router";
import { A } from "@solidjs/router";



const Signup = () => {
    const navigate = useNavigate();
    return <>
    <Motion animate={{opacity:[0, 1]}} transition={{ duration: .7, easing: "ease-in-out" }}>
        <h3 className="heavy-header text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center m-5 p-4">SignUp</h3>
        <div class="flex flex-col items-center justify-center min-h-screen">
            <div class="pb-6" >
                <div class="flex flex-col gap-4 p-4">
                    <label htmlFor="name">Username</label>
                    <input type="text" name="name" id="name" required/>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" required/>           
                    <label htmlFor="pwd">Password</label>
                    <input type="password" name="pwd" id="pwd" required/>
                    <label htmlFor="level">Level</label>
                    <select name="level" id="level" class="w-full">
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
                <button type="submit" onClick={async() => {
                    const response = await fetch("https://abulaman.pythonanywhere.com/register/", {
                        method:"POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({username: document.getElementById("name").value, password: document.getElementById("pwd").value, email: document.getElementById("email").value})
                    })
                    const data = await response.json();
                    setError(data["message"]); setTimeout(() => {setError("");}, 6000)
                    }} className="font-poppins font-bold w-56 btn m-auto">Sign Up</button>
            <p class="p-4">Already have an account? <A href="/login" class="underline px-2 text-bordercol-light dark:text-bordercol-dark">Log In</A></p>
                {/* <div class="flex justify-center items-center flex-wrap flex-col">
                <For each={error()}>{
                    (err, i) => {
                        return <p class="text-xl text-red-500 font-semibold"> {err} </p>
                    }
                }</For>
                </div> */}
                </div>
            </div>
            
        </div>
    </Motion>
    </>
}


export default Signup;