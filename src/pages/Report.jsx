import { useNavigate } from "@solidjs/router"
import Nav from "../Components/Nav"
import { login } from "../../public/js/store"
import { Motion } from "@motionone/solid"
import Menu from "../Components/Menu"

const Report = () => {
    const navigate = useNavigate()
    if(!login()) {alert("You are not logged in!!"); return navigate("/login", {replace:true})}
    return <>
        <Motion animate={{opacity:[0, 1]}} transition={{ duration: .7, easing: "ease-in-out" }}>
            <Menu />
            <Nav />
            <div class="min-h-[60vh] flex flex-col justify-center items-center p-2 lg:p-8 xl:p-16">
            <h3 className="text-base lg:text-lg xl:text-xl p-4 text-center font-poppins">We are sorry that u experienced a bug :(</h3>

            <form action="/report-bug" method="POST" className="flex p-8  h-max gap-4 flex-col drop-shadow-xl">
                <div className="title flex flex-col md:flex-row gap-4">
                    <label class="w-32" htmlFor="report-title">TITLE</label>
                    <input id="report-title" type="text" required/>
                    
                </div>
                <div className="title flex flex-col md:flex-row gap-4">
                    <label class="w-32" htmlFor="report-desc">DESCRIPTION</label>
                    <textarea name="report-desc" id="report-desc" cols="20" rows="10" required />
                    
                </div>
                <div className="title flex flex-col md:flex-row gap-4">
                    <label class="w-32" htmlFor="report-title">IMAGE (if any)</label>
                    <input id="report-title" type="file" accept="image/png, image/gif, image/jpeg" />
                    
                </div>
                <button class="btn mb-8" type="submit">SUBMIT</button>
            </form>
            </div>

            <div className="flex flex-col gap-8 p-2 lg:p-8 xl:p-16">
                <h3 class="text-center text-5xl w-full p-4 heavy-header">Reported Bugs</h3>
                <hr />
                <div className="flex flex-col pt-12 gap-4">
                    
                    <div class="flex flex-col">
                    <h4 class="font-montserrat text-3xl">Title</h4>
                    <div className="flex gap-4">
                    <p className="text-xs text-center">Manish S </p>
                    <ul class="list list-disc"><li class="text-xs">Diploma</li></ul>
                    </div>
                    </div>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos quia dolores libero eos. Quos numquam magnam eum maiores ducimus reiciendis.</p>
                    <button class="text-bordercol-light dark:text-bordercol-dark text-start underline">View More</button>
                </div>
                <hr />
            </div>
    </Motion>
    </>
}

export default Report