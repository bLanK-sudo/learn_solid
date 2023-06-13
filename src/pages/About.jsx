import { A } from "@solidjs/router";
import Nav from "../Components/Nav";
import { Motion } from "@motionone/solid";
import Menu from "../Components/Menu";

const About = () => {
    return(
    <>
        <Motion animate={{opacity:[0, 1]}} transition={{ duration: .7, easing: "ease-in-out" }}>
            <Menu />
            <Nav />
            <div class="h-[60vh] w-screen flex justify-center items-center z-[1] flex-col gap-4">
                <p class="text-center text-xl font-outfit font-light max-w-[600px]">just 2 random guys who got no life</p>
                <p class="text-center text-xl font-outfit font-light max-w-[600px]">decided to make a website</p>
                <A href="/home" class="text-xs font-light underline cursor-pointer">UNDER CONSTRUCTION</A>
            </div>
            <div className="fixed bottom-24 left-0 right-0 mx-auto z-[24] w-full text-center">
                <p>KeyWords: <br /> 2 random guys {` -> `} <span class="cursor-pointer">Manish</span>, <span class="cursor-pointer">Abulaman</span></p>
                <p>got no life {`->`} yes </p>
                <p>decided {`->`} ????</p>
            </div>
        </Motion>
    </>
    )
}

export default About