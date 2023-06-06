import Nav from "../Components/Nav"

const Upcoming = () => {
    return<>
        <Nav />
        <div class="flex flex-col">
        <h3 class="text-center text-5xl mx-[5px] bg-bordercol-light dark:bg-bordercol-dark text-white p-4 dark:text-black line-through">Upcoming Features</h3>
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
    </>
}


export default Upcoming