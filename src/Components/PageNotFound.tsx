import { A } from "@solidjs/router";
import Nav from "./Nav";
import { Motion } from "@motionone/solid";

const PageNotFound = () =>{
    return(
        <>
        <Motion animate={{opacity:[0, 1]}} transition={{ duration: .7, easing: "ease-in-out" }}>
        <div class="h-screen w-screen flex justify-center items-center z-[1] flex-col gap-4">
            <h1 class="text-2xl lg:text-4xl">404 Page Not Found</h1>
            <A href="/home" class="text-xs underline text-blue-950">GO TO HOMEPAGE</A>
        </div>
        </Motion>
        </>
    )
}

export default PageNotFound;