import { createSignal } from "solid-js"
import { A, useNavigate } from '@solidjs/router';
import Nav from "../Components/Nav"
import { Motion } from "@motionone/solid";
import { login } from "../../public/js/store";
import Menu from "../Components/Menu";

const Profile = () => {
    const navigate = useNavigate()
    if(!login()) return navigate("/login", {replace:true})
    return <>
    
    <Motion animate={{opacity:[0, 1]}} transition={{ duration: .7, easing: "ease-in-out" }}>
    <Menu />
    <Nav />
    <div className="flex flex-col text-textcol-light dark:text-textcol-dark">
        <div className="first flex flex-col mb-16">
            <div className="h-[40vh] mx-[5px] relative bg-[url(../../public/images/try.webp)] bg-cover bg-no-repeat">
                <div className="absolute -bottom-24 rounded-full left-0 right-0 m-auto w-48 h-48 bg-red-300"></div>
            </div>
            <div className="name text-xl pt-32 m-auto text-center">
                <p class="text-5xl">Manish S</p>
                <p style="font-variant:small-caps;" class="font-montserrat font-light ">diploma</p>
                <p class="font-thin pt-4">Lorem ipsum, dolor sit amet consectetur adipisicing</p>
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