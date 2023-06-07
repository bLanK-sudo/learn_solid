import { A } from "@solidjs/router";
import { Motion } from "@motionone/solid";


const Landing = () => {
    return <>
    <Motion animate={{opacity:[0, 1]}} transition={{ duration: .7, easing: "ease-in-out" }}>
        <div className="flex flex-col items-center justify-center min-h-screen gap-8">
            <div className="flex flex-col">
                <h1 className="text-4xl font-bold flex flex-col md:block text-center">Welcome to the <a href="https://github.com/" class=""><span class="w-max heavy-header px-4 ">Mock Test</span></a> App</h1>
                <p class="font-montserrat font-light text-center p-4 drop-shadow-2xl">Landing page is still under construction</p>
            </div>
            <div className="flex gap-16">
                <A href="/login" class="btn">Login</A>
                <A href="/signup" class="btn">SignUp</A>
            </div>
        </div>
    </Motion>
    </>
}

export default Landing;