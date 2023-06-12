import { A } from "@solidjs/router";
import { Motion } from "@motionone/solid";

const Error = () =>{
    return(
        <>
        <Motion animate={{opacity:[0, 1]}} transition={{ duration: .7, easing: "ease-in-out" }}>
        <div class="h-screen w-screen flex justify-center items-center z-[1] flex-col gap-4">
            <h1 class="text-2xl lg:text-4xl">You are not logged in</h1>
            <A href="/login" class="text-xs underline text-blue-950">GO TO LOGINPAGE</A>
        </div>
        </Motion>
        </>
    )
}

export default Error;