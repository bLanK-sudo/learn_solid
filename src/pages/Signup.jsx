

import { Motion } from "@motionone/solid";
import {error, setError} from "../../public/js/store.js";
import { useNavigate } from "@solidjs/router";
import { A } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import {createMutable} from "solid-js/store";



const Signup = () => {
    let signUpBtn;
    const selectedCourses = createMutable([]);
    const navigate = useNavigate();
    setTimeout(() => {setError(null)}, 3000)
    const [courses, setCourses] = createSignal([]);
    const fetchCourses = async() => {
        const cr = await fetch("https://abulaman.pythonanywhere.com/course/", {
                        method: "GET",
                        headers: {
                           "Content-Type": "application/json",
                        }
                    });
        const data = await cr.json();
        setCourses(data);
    }
    fetchCourses()

    const setonclick = (el) => {
        let flag = true
        for (let i = 0; i < selectedCourses.length; i++) {
            if(selectedCourses[i][0] == el.target.value) {
                flag = false;
            }
        }

        if(flag) {
            let val = el.target.value;
            let name = el.target.attributes.name.value;
            selectedCourses.push([val, name]);
        }
    }

    
    return <>
    <Motion animate={{opacity:[0, 1]}} transition={{ duration: .7, easing: "ease-in-out" }}>
        <h3 className="heavy-header text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center m-5 p-4">SignUp</h3>
        <div class="flex flex-col items-center justify-center min-h-screen ">
            <div class="pb-6 max-w-[350px]" >
                <div class="flex flex-col gap-4 p-4 w-full">
                    <label htmlFor="name">Username <span class="text-sm">(case sensitive)</span></label>
                    <input class="w-full" type="text" name="name" id="name" required/>
                    <label for="email">Email</label>
                    <input class="w-full" type="email" name="email" id="email" required/>           
                    <label htmlFor="pwd">Password</label>
                    <input class="w-full" type="password" name="pwd" id="pwd" required/>
                    <label htmlFor="level">Level</label>
                    <select class="w-full" name="level" id="level">
                        <option value="foundation">Foundational</option>
                        <option value="diploma">Diploma</option>
                        <option value="degree">Degree</option>
                    </select>
                    <Show when={courses()} fallback={<></>}>
                    <label htmlFor="courses">Select courses</label>
                    <select class="w-full" id="courses" name="test">
                        <option disabled selected hidden>Choose a subject</option>
                        <For each={courses()}>{
                            (course, i) => {
                                return <option onClick={(el) => setonclick(el) } name={course.name} value={course.id}>{course.name}</option>
                            }
                        }</For>
                    </select>
                    </Show>

                    <div class="flex gap-2 flex-wrap w-full">
                    <For each={selectedCourses}>{
                            (course, i) => {
                                return <div class="flex justify-between gap-2 border-2 border-bordercol-light dark:border-bordercol-dark">
                                    <p class="p-2 px-4">{course[1]}</p>
                                    <button onClick={
                                        () => {
                                            const index = selectedCourses.indexOf(course);
                                            if (index > -1) { 
                                                selectedCourses.splice(index, 1);
                                            }
                                        }
                                    } class="text-lg w-8 border-l-2 border-bordercol-light dark:border-bordercol-dark h-full flex justify-center items-center">X</button>
                                </div>
                            }
                    }</For>
                    </div>
                    <div class="flex flex-col">
                    <label htmlFor="bio">Bio / About</label>
                    <span class="text-sm">(for a better look keep it under 10 words)</span>
                    </div>
                    <input class="w-full" type="text" name="bio" id="bio" />
                </div>
                <div class="w-max m-auto flex flex-col justify-center items-center">
                <button ref={signUpBtn} type="submit" onClick={async() => {
                    signUpBtn.innerHTML = "<div class='w-8 h-8 animate-spin border-t-2 border-r-2 border-t-textcol-light border-r-textcol-light rounded-full dark:border-t-textcol-dark dark:border-r-textcol-dark'></div> Signing Up...";
                    let courseArr = [];
                    for (let i = 0; i < selectedCourses.length; i++) {
                        courseArr[i] = selectedCourses[i][0];
                    }
                    try{
                    const response = await fetch("https://abulaman.pythonanywhere.com/register/", {
                        method:"POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({username: document.getElementById("name").value, password: document.getElementById("pwd").value, email: document.getElementById("email").value, course_list: courseArr , bio: document.getElementById("bio").value})
                    })
                    console.log(response);
                    const data = await response.json();
                    if(!response.ok) {
                        signUpBtn.innerHTML = "Sign Up";
                        console.log(data.message[0]);
                        setError(data.message)
                    }else{
                        console.log(data);
                        if(data) {console.log("working");navigate("/login", {replace:true})};
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
                {(typeof error() == "string")?<p class="text-xl text-red-500 font-semibold"> {error()} </p>
                :
                <For each={error()}>{
                    (err, i) => {
                        return <p class="text-xl text-red-500 font-semibold"> {err} </p>
                    }
                }</For>
                }
            </div>
        </div>
    </Motion>
    </>
}


export default Signup;