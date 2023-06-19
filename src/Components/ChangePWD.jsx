import { useNavigate } from "@solidjs/router";
import { error, setError } from "../../public/js/store";

const ChangePWD = () => {
    const navigate= useNavigate()
    return (
        <div class="w-full h-screen fixed inset-0 z-[5] bg-slate-800 flex flex-col justify-center items-center gap-4">
            <h1 class="text-2xl">Change Password</h1>
            <div class="flex flex-col gap-2">
            <div class="flex flex-col">
            <label htmlFor="change_pwd">New Password</label>
            <span class="text-xs">(You being able to see your new password is intentional)</span>
            </div>
            <input type="text" id="change_pwd" class="w-full" />
            <button onClick={
                async(el) => {
                    try{
                        el.target.innerHTML = "<div class='w-8 h-8 animate-spin border-t-2 border-r-2 border-t-textcol-light border-r-textcol-light rounded-full dark:border-t-textcol-dark dark:border-r-textcol-dark'></div> Changing..."
                        const response = await fetch("https://abulaman.pythonanywhere.com//reset-password-with-otp/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({email: document.getElementById("email_forgot").value, otp: document.getElementById("otp").value, new_password: document.getElementById("change_pwd").value})
                    })
                    const data = await response.json();
                    if(!response.ok){el.target.innerHTML = "Submit";setError(data.detail); console.log(response)}
                    if(data && response.ok){
                        console.log(data);
                        setError(data.message)
                        navigate("/login", {replace:true})
                    }
                    }catch(err){
                        console.log(err);
                        setError("Something went wrong with the server. Please try again later. Or contact us.")
                        navigate("/login", {replace:true})
                    }
                }
            } class="btn justify-center items-center flex gap-2">Submit</button>
            </div>
            <p>{error()}</p>
        </div>
    )
}

export default ChangePWD