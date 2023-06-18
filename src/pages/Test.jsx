import { For, createEffect, createSignal } from "solid-js"
import { useBeforeLeave, useNavigate, useParams } from "@solidjs/router"
import {fetchData, postJSON } from "../../public/js/store"
import Nav from '../Components/Nav'
import { login } from "../../public/js/store"



const qnType = (e) => {
    if(e == "SCQ") return "radio"
    else if(e == "MCQ") return "checkbox"
    else if(e == "Short" || e == "Text") return "text"
    else if(e == "Numeric") return "number"
    else return "textarea"
}




const Test = (id) => {
    const [test, setTest] = createSignal(null)
    const [qnId, setqnId] = createSignal([])
    const [result, setResult] = createSignal(null)
    let qn = []
    const fetchTest = async () => {
        const response = await fetch("https://abulaman.pythonanywhere.com/test/start_test/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({qp_id: 1})
        });
        const data = await response.json();
        if(!response.ok) {
            navigate("/mock", {replace:true})
        }else{
            if(data) {
                setTest(data)
                console.log(data);
            }
        }
        for (let i = 0; i < test().test_questions.length; i++) {
            qn.push(test().test_questions[i].id)
        }
        setqnId(qn)
      }
    fetchTest()




    

    const navigate = useNavigate()

    if(!login()) {alert("You are not logged in!!"); return navigate("/login", {replace:true})}
    
    useBeforeLeave(e => {
        e.preventDefault()
        setTimeout(() => {
            if (window.confirm("Are you sure you want to leave? You have not submitted your test yet.")) {
              e.retry(true);
            }
          }, 100);
    })
    const selected= {}
    const timer = {}
    let mainQnDiv;
    const fetchAns = async () => {
        const response = await fetch("https://abulaman.pythonanywhere.com/test/submit_test/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({id : test().id, test_questions: selected})
        })
        if(!response.ok) {return <><div><p>Something went wrong with the server </p> <p>{response.status}</p> </div></>}
        const data = await response.json()
        if(data) {
            console.log(data);
        }
    }
    // for(let i = 0; i < 100; i++){
    //     selected[i] = []
    // }
    
    const [start, showStart] = createSignal(true)
    const [all, setAll] = createSignal(false)
    const [submit, setSubmit] = createSignal(false)
    const [completed, setCompleted] = createSignal(0)
    const [notCompleted, setNotCompleted] = createSignal(0)
    const [startTimer, setStartTimer] = createSignal(0)
    const [currentQn, setCurrentQn] = createSignal(0)

    // fetchData("http://localhost:5000/qnpaper", setqnId)
    // fetchData("http://localhost:5000/qns", setQns)
    
    let count = 0
    let fullTime = Date.now()
    return <>
        
        
        <Nav />
        {start() &&
        <div class="fixed inset-0 w-screen m-auto h-screen bg-div-light dark:bg-div-dark z-10 text-xl">
            <div class="flex flex-col justify-center items-center h-full">
                <p>This is just a page before ur test. Where you wait until ur test data loads</p>
                <div class="">
                    <Show when={test()} fallback={<p>Loading.....</p>}>
                        
                            <div class="">
                                <button class="btn" onClick={el => { setCurrentQn(qnId()[0]); setStartTimer(Date.now()) ;showStart(false);document.getElementsByName(qnId()[0])[0].classList.add("border-2", "border-red-500", "dark:border-red-500")}}>START THE TEST</button>
                            </div>
                        
                    </Show>
                </div>
            </div>
        </div>
        }
        <div className="grid grid-rows-3 grid-cols-1 lg:grid-cols-3 lg:grid-rows-1 p-2 lg:p-8 xl:p-16 min-h-[80vh]">
        <div className="row-span-2 lg:col-span-2">
        <Show when={test()} fallback={<>What the hell is happening</>}>
            <For each={test().test_questions}>{
                (qn, i) => {
                    return <>
                    
                    <div ref={mainQnDiv} className={`qns qns${qn.id} flex gap-4 flex-col ${(i() != 0)? "hidden":""}`}>
                    <div className="">
                        MARKS : {qn.question.marks}
                    </div>
                        <div class="qn text-xl xl:text-2xl">
                            {`${i()+1}) ${qn.question.text}`}
                        </div>
                        <div className="ans flex flex-col text-lg xl:text-xl pl-4">
                            {qn.question.type == "Numeric" && <input type="number" onChange={(el) => {document.getElementById("save" + qn.id).classList.remove("bg-green-500","dark:text-black");document.getElementById("save" + qn.id).innerText="SAVE";document.getElementsByName(qn.id)[0].classList.add("bg-red-500", "border-bordercol-light", "dark:border-bordercol-dark","dark:text-black","border-none"); console.log("ur reverting")}} name={"q" + qn.id} id={qn.question.id} />}
                            {qn.question.type == "Text" && <input type="text"      onChange={(el) => {document.getElementById("save" + qn.id).classList.remove("bg-green-500","dark:text-black");document.getElementById("save" + qn.id).innerText="SAVE";document.getElementsByName(qn.id)[0].classList.add("bg-red-500", "border-bordercol-light", "dark:border-bordercol-dark","dark:text-black","border-none"); console.log("ur reverting")}} name={"q" + qn.id} id={qn.question.id} />}
                            {qn.question.type == "SCQ" && 
                            <For each={qn.choices}>{
                                (ans, i) => {
                                    return <div class="flex gap-2 items-center min-w-[16]">
                                        <input onChange={(el) => {document.getElementById("save" + qn.id).classList.remove("bg-green-500","dark:text-black");document.getElementById("save" + qn.id).innerText="SAVE";document.getElementsByName(qn.id)[0].classList.add("bg-red-500", "border-bordercol-light", "dark:border-bordercol-dark","dark:text-black","border-none")}} type={qnType(qn.type)}  id={ans.id} name={"q" + qn.id} value={ans.id} />
                                        <label class="w-16 min-w-max cursor-pointer" for={ans.id}>{ans.choice}</label>
                                    </div>
                                }
                            }</For>
                            }
                            {qn.question.type == "MCQ" && 
                            <For each={qn.choices}>{
                                (ans, i) => {
                                    return <div class="flex gap-2 items-center">
                                        <input onChange={(el) => {document.getElementById("save" + qn.id).classList.remove("bg-green-500","dark:text-black");document.getElementById("save" + qn.id).innerText="SAVE";document.getElementsByName(qn.id)[0].classList.add("bg-red-500", "border-bordercol-light", "dark:border-bordercol-dark","dark:text-black","border-none")}} type={qnType(qn.type)}  id={"scq"+ ans.id} name={"q" + qn.id} value={ans.id} />
                                        <label class="w-16 min-w-max cursor-pointer" for={"scq"+ ans.id}>{ans.choice}</label>
                                    </div>
                                }
                            }</For>
                            }
                        </div>
                        <button id={"save" + qn.id} onClick={e => {
                            let ans = e.target.previousSibling.children
                            let ansArr;
                            
                            if(qn.type == "Text" || qn.type == "Numeric") {ansArr = ""; ansArr = ans[0].value}
                            else{
                            ansArr = [];
                            Object.values(ans).forEach(el => {
                                if(el.childNodes[0].checked) {console.log(el.childNodes[0]);ansArr.push(el.childNodes[0].value)}
                            })}
                            selected[qn.id] = ansArr
                            let flag = true
                            qnId().forEach(el => {  
                                if(!selected[el] || (selected[el] && selected[el].length <= 0)) flag = false
                            })
                            setAll(flag)
                            if((qn.type =="MCQ" || qn.type=="SCQ") && selected[qn.id].length > 0){
                                e.target.classList.add("bg-green-500", "dark:text-black")
                                e.target.innerText = "SAVED"
                                document.getElementsByName(qn.id)[0].classList.remove("border-red-500","dark:border-red-500", "bg-red-500")
                                document.getElementsByName(qn.id)[0].classList.add("bg-green-500", "border-bordercol-light", "dark:border-bordercol-dark","dark:text-black", "border-none")
                            }else if((qn.type == "Text" || qn.type == "Numeric") && ans[0].value.length > 0){
                                    e.target.classList.add("bg-green-500","dark:text-black")
                                    e.target.innerText = "SAVED"
                                    document.getElementsByName(qn.id)[0].classList.remove("border-red-500","dark:border-red-500", "bg-red-500")
                                    document.getElementsByName(qn.id)[0].classList.add("bg-green-500", "border-bordercol-light", "dark:border-bordercol-dark","dark:text-black","border-none")
                            }else{
                                e.target.innerText = "COMPLETE ANSWER BEFORE SAVING"
                                e.target.classList.remove("bg-green-500","dark:text-black")
                                document.getElementsByName(qn.id)[0].classList.add("bg-red-500", "border-bordercol-light", "dark:border-bordercol-dark","dark:text-black","border-none")
                                setTimeout(() => {
                                    e.target.innerText = "SAVE"
                                },2000)
                            }
                }} class="nav-btn m-4 ml-0 w-max border-2 border-bordercol-light dark:border-bordercol-dark">SAVE</button>
                    </div>
                    </>
                }
                
            }</For>
        
        </Show>
        </div>
        <div class="row-span-1 lg:col-span-1 p-2 flex flex-col gap-16 ">
            <div class="flex gap-4 w-max flex-wrap">
                <Show when={qnId()} fallback={<><p>Hello World</p></>}>
                    <Show when={test()}>
                        <For each={qnId()}>{
                            (id, i) => {
                                return <>
                                    <button class="qnBtn text-textcut-light dark:text-textcut-dark" name={id} onClick={el => {
                                        if(timer[currentQn()]){
                                            timer[currentQn()] += Date.now() - startTimer()
                                        }else{
                                            timer[currentQn()] = Date.now() - startTimer()
                                        }
                                        setStartTimer(Date.now())
                                        setCurrentQn(id)
                                        Object.values(document.getElementsByClassName("qns")).forEach(el => {
                                            el.classList.add("hidden")
                                        })
                                        document.querySelector(".qns"+id).classList.remove("hidden")
                                        if(!selected[id]){
                                            el.target.classList.add("border-red-500","dark:border-red-500")
                                        }else if(selected[id].length == 0 ){
                                            el.target.classList.add("border-red-500","dark:border-red-500")
                                        }
                                        console.log(selected);
                                    }}>{i() + 1}</button>
                                    </>
                            }
                        }</For>
                    </Show>
                </Show>
            </div>
            <button onClick={() => {fullTime = Date.now() - fullTime;setSubmit(true); if(timer[currentQn()]){
                                            timer[currentQn()] += Date.now() - startTimer()
                                        }else{
                                            timer[currentQn()] = Date.now() - startTimer()
                                        };
                                        fetchAns()
                                        console.log(selected);
                                        }} class={`btn rounded-none cursor-pointer border-none text-black ${all()? "bg-green-500" : "bg-red-500"}`}>SUBMIT</button>
        </div>
        
        </div>

        {submit() &&
            <div className="absolute inset-0 bg-div-light dark:bg-div-dark z-0 flex justify-center items-center">
            {Object.values(selected).forEach(el => {
                if(el.length > 0) count += 1
            })}
            <div className="flex flex-col gap-4">
            <p>Answered : {count}</p>
            <p>Not Answered : {qnId().length - count}</p>
            <p>Total Time Taken in ms : {fullTime}</p>
            <button class="btn" onClick={() => {navigate("/mock")}}>DONE</button>
            </div>
            </div> 
        }
        { console.log("selected array: ",selected)}
        {console.log("timer: ",timer)}
        
    </>


}



export default Test