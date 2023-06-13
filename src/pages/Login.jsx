import { Motion } from "@motionone/solid";
import {error, setError, setLogin} from "../../public/js/store.js";
import { useNavigate } from "@solidjs/router";
import { A } from "@solidjs/router";
import { createEffect } from "solid-js";



const Login = () => {
    let loginBtn;
    const navigate = useNavigate();
    createEffect(() => {
        error();
        setTimeout(() => {setError("");}, 3000)
    })


    return <>
    <Motion animate={{opacity:[0, 1]}} transition={{ duration: .7, easing: "ease-in-out" }}>
    <h3 className="heavy-header text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center m-5 p-4">Login</h3>
        <div class="flex flex-col items-center justify-center min-h-screen">
            <div>
                <div class="flex flex-col gap-4 p-4">
                    <label for="name">Username</label>
                    <input type="text" name="name" id="name" required/>           
                    <label htmlFor="pwd">Password</label>
                    <input type="password" name="pwd" id="pwd" required/>
                </div>
                <div class="m-auto flex flex-col justify-center items-center">
                <button ref={loginBtn} type="submit" onClick={async() => {
                    console.log(document.getElementById("name").value,  document.getElementById("pwd").value);
                    try{
                        loginBtn.innerHTML = "<div class='w-8 h-8 animate-spin border-t-2 border-r-2 border-t-textcol-light border-r-textcol-light rounded-full dark:border-t-textcol-dark dark:border-r-textcol-dark'></div> Logging In...";
                        const response = await fetch("https://abulaman.pythonanywhere.com/api/token/", {
                        method: "POST",
                        headers: {
                           "Content-Type": "application/json",
                           
                        },
                        body: JSON.stringify({username: document.getElementById("name").value, password: document.getElementById("pwd").value})
                    });
                    const data = await response.json();
                    if(!response.ok) {
                        loginBtn.innerHTML = "Log In";
                        setError(data.detail)
                    }else{
                        if(data) setLogin(true); localStorage.setItem("token", data.access); navigate("/home", {replace:true});
                        console.log(data);
                    }
                    

                    }catch(err){
                        console.log(err);
                    }
                    

                }} className="font-poppins font-bold w-56 btn m-auto flex gap-2 justify-center items-center">Log In</button>
                <p class="p-4">Don't have an account? <A href="/signup" class="underline px-2 text-bordercol-light dark:text-bordercol-dark">Sign Up</A></p>
                
                </div>
                
            </div>
            <p class="text-xs md:text-lg xl:text-xl text-red-500 font-semibold text-center"> {error()} </p>
        </div>
    </Motion>
    </>

}

export default Login