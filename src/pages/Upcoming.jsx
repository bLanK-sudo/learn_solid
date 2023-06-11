import { Motion } from "@motionone/solid"
import Nav from "../Components/Nav"
import Menu from "../Components/Menu"
import { login } from "../../public/js/store"

const Upcoming = () => {
    if(!login()) {alert("You are not logged in!!"); return navigate("/login", {replace:true})}
    return<>
        <Motion animate={{opacity:[0, 1]}} transition={{ duration: .7, easing: "ease-in-out" }}>
            <Menu />
            <Nav />
            <div class="flex flex-col">
            <h3 class="text-center text-5xl mx-[5px] p-4 heavy-header">Upcoming Features</h3>
                <div className="flex flex-col gap-8 p-2 lg:p-8 xl:p-16">
                
                <hr />
                <div className="flex flex-col pt-12 gap-4">
                    <h4 class="font-montserrat text-3xl">Title</h4>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos quia dolores libero eos. Quos numquam magnam eum maiores ducimus reiciendis.</p>
                    <button class="text-bordercol-light dark:text-bordercol-dark text-start underline">View More</button>
                </div>
                <hr />
            </div>
            </div>
        </Motion>
    </>
}


export default Upcoming