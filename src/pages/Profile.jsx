import { createSignal } from "solid-js"
import { A, useNavigate } from '@solidjs/router';
import Nav from "../Components/Nav"
import { Motion } from "@motionone/solid";
import { fetchUser, login, user } from "../../public/js/store";
import Menu from "../Components/Menu";

const Profile = () => {
    fetchUser()
    const navigate = useNavigate()
    if(!login()) {alert("You are not logged in!!"); return navigate("/login", {replace:true})}
    return <>
    
    <Motion animate={{opacity:[0, 1]}} transition={{ duration: .7, easing: "ease-in-out" }}>
    <Menu />
    <Nav />
    <div className="flex flex-col text-textcol-light dark:text-textcol-dark">
        <div className="first flex flex-col mb-16">
            <Show when={user()} fallback={
                <div className="h-[40vh] mx-[5px] relative bg-[url(/images/try.webp)] bg-cover bg-no-repeat">
                    <div className="absolute -bottom-24 rounded-full left-0 right-0 m-auto w-48 h-48 bg-black"></div>
                </div>
            }>
            <div className="h-[40vh] mx-[5px] relative bg-[url(/images/try.webp)] bg-cover bg-no-repeat">
                <div className="absolute -bottom-24 rounded-full left-0 right-0 m-auto w-48 h-48">
                    <img src={user().dp} alt="" />
                </div>
            </div>
            </Show>
            <div className="name text-xl pt-32 m-auto text-center">
                <Show when={user()} fallback={
                    <div class="flex flex-col justify-center items-center gap-4">
                        <span class="h-8 w-48 inline-block bg-slate-700 rounded-full animate-pulse"></span>
                        <span class="h-8 w-32 inline-block bg-slate-700 rounded-full animate-pulse"></span>
                        <span class="h-8 w-96 inline-block bg-slate-700 rounded-full animate-pulse"></span>
                    </div>
                }>
                    <p class="text-5xl">{user().username}</p>
                    <p style="font-variant:small-caps;" class="font-montserrat font-light ">diploma</p>
                    <p class="font-thin pt-4">{user().bio}</p>
                </Show>
                
            </div>
        </div>
        <div class="mb-16">
        <div className="flex flex-col p-16">
            <h2 class="header-profile">About</h2>
            <p class="text-xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti a esse minus, pariatur excepturi quo ea consequuntur maxime ullam nulla.</p>
        </div>
        <hr class="" />
        <div className="flex flex-col p-16 gap-4">
            <h2 class="header-profile">Subjects Picked</h2>
            <div class="flex gap-4 flex-wrap">
            <A class="btn w-max" href="/subjects/mlt">Machine Learning Techniques</A>
            <A class="btn w-max" href="/subjects/mlf">Machine Learning Foundations</A>
            <A class="btn w-max" href="/subjects/mad2">Modern Application Development 2</A>
            </div>
        </div>
        <hr />
        <div className="flex flex-col p-16 gap-4">
            <h2 className="header-profile">Tests Taken</h2>
            <A class="btn w-max" href="/coming-soon">Coming Soon</A>
        </div>
        <hr />
        <div className="flex flex-col p-16 gap-4">
            <h2 class="header-profile">Best Performance</h2>
            <A class="btn w-max" href="/coming-soon">Coming Soon</A>
        </div>
        <hr />
        </div>
    </div>
    </Motion>
    </>
}
export default Profile