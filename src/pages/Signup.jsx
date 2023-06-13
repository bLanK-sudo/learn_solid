

import { Motion } from "@motionone/solid";
import {error, setError} from "../../public/js/store.js";
import { useNavigate } from "@solidjs/router";
import { A } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";



const Signup = () => {
    let signUpBtn;
    const navigate = useNavigate();
    setTimeout(() => {setError("");}, 3000)
    
    return <>
    <Motion animate={{opacity:[0, 1]}} transition={{ duration: .7, easing: "ease-in-out" }}>
        <h3 className="heavy-header text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center m-5 p-4">SignUp</h3>
        <div class="flex flex-col items-center justify-center min-h-screen">
            <div class="pb-6" >
                <div class="flex flex-col gap-4 p-4">
                    <label htmlFor="name">Username <span class="text-sm">(case sensitive)</span></label>
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
                <button ref={signUpBtn} type="submit" onClick={async() => {
                    signUpBtn.innerHTML = "<div class='w-8 h-8 animate-spin border-t-2 border-r-2 border-t-textcol-light border-r-textcol-light rounded-full dark:border-t-textcol-dark dark:border-r-textcol-dark'></div> Signing Up...";
                    try{
                    const response = await fetch("https://abulaman.pythonanywhere.com/register/", {
                        method:"POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({username: document.getElementById("name").value, password: document.getElementById("pwd").value, email: document.getElementById("email").value})
                    })
                    const data = await response.json();
                    if(!response.ok) {
                        signUpBtn.innerHTML = "Sign Up";
                        console.log(data.message[0]);
                        setError(data.message)
                    }else{
                        if(data) navigate("/login", {replace:true});
                        console.log(data);
                        setError(data.message)
                    }
                    

                    }catch(err){
                        console.log(err);
                    }
                    }} className="font-poppins font-bold w-56 btn m-auto flex gap-2 justify-center items-center">Sign Up</button>
            <p class="p-4">Already have an account? <A href="/login" class="underline px-2 text-bordercol-light dark:text-bordercol-dark">Log In</A></p>
                
                </div>
            </div>
            <div class="flex justify-center items-center flex-wrap flex-col">
                <For each={error()}>{
                    (err, i) => {
                        return <p class="text-xl text-red-500 font-semibold"> {err} </p>
                    }
                }</For>
            </div>
        </div>
    </Motion>
    </>
}


export default Signup;