import { A, useNavigate } from "@solidjs/router"
import { error, setError } from "../../public/js/store"
import { createSignal } from "solid-js"
import ChangePWD from "../Components/ChangePWD"

const Forgot = () => {
    function ValidateEmail(input) {

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      
        if (input.value.match(validRegex)) return true 
        else return false;
      
      }
    const navigate = useNavigate()
    const [otp, setOTP] = createSignal(false)
    const [verifyOTP, setVerifyOTP] = createSignal(false)
    return (
        <>
            <div className="w-full flex flex-col min-h-[60vh] justify-center items-center gap-8">
                <h3 class="font-montserrat text-xl text-center">Don't worry if you forgot your password. We got you :)</h3>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email_forgot" >
                        Enter your email address
                    </label>
                    <input type="email" id="email_forgot" class="w-full" />
                    <button onClick={
                        
                        async(el) => {
                            setError(null)
                            if(!document.getElementById("email_forgot").value) return setError("Please enter your email address");
                            if(!ValidateEmail(document.getElementById("email_forgot"))) return setError("Please enter a valid email address");
                            el.target.innerHTML = "<div class='w-8 h-8 animate-spin border-t-2 border-r-2 border-t-textcol-light border-r-textcol-light rounded-full dark:border-t-textcol-dark dark:border-r-textcol-dark'></div> Sending OTP..."
                            try{
                                const response = await fetch("https://abulaman.pythonanywhere.com/forgot-password/", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({email: document.getElementById("email_forgot").value})
                                })

                                const data = await response.json();
                                if(!response.ok) {el.target.innerHTML = "Submit";setError(data.detail); console.log(response)}
                                if(data){
                                    console.log(data);
                                    setOTP(true);
                                }
                            }catch(err){
                                setError(err)
                                el.target.innerHTML = "Submit"
                                console.log(err);
                            }
                        }
                    } class="btn my-4 flex gap-2 justify-center items-center">Submit</button>
                    <A href="/login" class="text-bordercol-light dark:text-bordercol-dark text-xl underline text-center w-full">Back</A>
                    <p class="text-red-500 text-center underline">{error()}</p>
                </div>
                
            </div>
            {otp() &&
            <div className="w-full fixed inset-0 h-screen bg-slate-800 flex flex-col justify-center items-center font-semibold font-montserrat">
                <div class="w-max flex flex-col text-start gap-2">
                    <div class="flex flex-col">
                    <label htmlFor="otp" class="text-start">Enter your OTP </label>
                    <span class="text-xs"> Hint: Be careful with them whitespaces :)</span>
                    </div>
                    <input class="w-full" type="text" id="otp" />
                    <button class="flex gap-2 btn" onClick={
                        async(el) => {
                            el.target.innerHTML = "<div class='w-8 h-8 animate-spin border-t-2 border-r-2 border-t-textcol-light border-r-textcol-light rounded-full dark:border-t-textcol-dark dark:border-r-textcol-dark'></div> Verifying OTP..."
                                try{
                                    const response = await fetch("https://abulaman.pythonanywhere.com/verify-otp/", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({email: document.getElementById("email_forgot").value, otp: document.getElementById("otp").value})
                                })
                                const data = await response.json();
                                if(!response.ok){setError(data.detail);el.target.innerHTML= "Submit"; console.log(response); return useNavigate("/login", {replace:true})}
                                if(data && response.ok){
                                    console.log(data);
                                    setVerifyOTP(true);
                                    otp(false);
                                }
                                }catch(err){
                                    el.target.innerHTML= "Submit"
                                    console.log(err);
                                    setError("Something went wrong. Please try again. If it keeps continuing, please contact us.");
                                }
                        }
                    }>SUBMIT</button>
                </div>
                <p class="text-center text-red-500 text-xs underline">{error()}</p>
            </div> 
            
            }

            {verifyOTP() &&
                <ChangePWD />
            }
        </>
    )
}

export default Forgot