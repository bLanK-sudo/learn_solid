import Nav from "./Nav";
import { Motion } from "@motionone/solid";

const PageNotFound = () =>{
    return(
        <>
        <Motion animate={{opacity:[0, 1]}} transition={{ duration: .7, easing: "ease-in-out" }}>
        <Nav />
        <div class="h-[80vh] w-screen flex justify-center items-center z-[1]">
            <h1 class="text-2xl lg:text-4xl">404 Page Not Found</h1>
        </div>
        </Motion>
        </>
    )
}

export default PageNotFound;