import Nav from "./Nav";

const PageNotFound = () =>{
    return(
        <>
        <Nav />
        <div class="h-[80vh] w-screen flex justify-center items-center z-[1]">
            <h1 class="text-2xl lg:text-4xl">404 Page Not Found</h1>
        </div>
        </>
    )
}

export default PageNotFound;