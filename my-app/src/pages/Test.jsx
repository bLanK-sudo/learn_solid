import { For, createEffect, createSignal } from "solid-js"
import { useBeforeLeave, useParams } from "@solidjs/router"
import {fetchData, postJSON } from "../js/store"
import Nav from '../Components/Nav'






const qnType = (e) => {
    if(e == "mcq") return "radio"
    else if(e == "msq") return "checkbox"
    else if(e == "short") return "text"
    else if(e == "numeric") return "number"
    else return "textarea"
}

function replaceFunction(url){
    window.location.replace(url);
}



const Test = (id) => {
    const params = useParams();
    window.addEventListener("popstate", (event) => {
        console.log(
          `location: ${document.location}, state: ${JSON.stringify(event.state)}`
        );
      });
    useBeforeLeave(e => {
        e.preventDefault()
        setTimeout(() => {
            if (window.confirm("Are you sure you want to leave? You have not submitted your test yet.")) {
              e.retry(true);
            }
          }, 100);
    })
    const selected= {}
    let mainQnDiv;
    const [qnId, setqnId] = createSignal([])
    const [qns, setQns] = createSignal([])
    const [start, showStart] = createSignal(true)
    const [all, setAll] = createSignal(false)
    const [submit, setSubmit] = createSignal(false)
    const [completed, setCompleted] = createSignal(0)
    const [notCompleted, setNotCompleted] = createSignal(0)
    fetchData("http://localhost:5000/qnpaper", setqnId)
    fetchData("http://localhost:5000/qns", setQns)
    let count = 0
    return <>
        
        <Show when={qnId()} fallback={<p>Loading.....</p>}>
            {start() &&
                <div class="">
                    <button class="fixed inset-0 w-screen m-auto h-screen bg-div-light dark:bg-div-dark z-10 text-xl" onClick={el => {showStart(false);document.getElementsByName(qnId()[0])[0].classList.add("border-2", "border-red-500", "dark:border-red-500")}}>START THE TEST</button>
                </div>
            }
        </Show>
        <Nav />
        <h3 class="text-center text-3xl font-bold p-4">{params.id.toUpperCase()}</h3>
        <div className="grid grid-rows-3 grid-cols-1 lg:grid-cols-3 lg:grid-rows-1 p-2 lg:p-8 xl:p-16 min-h-[80vh]">
        <div className="row-span-2 lg:col-span-2">
        <Show when={qns()}>
            <For each={qns()}>{
                (qn, i) => {
                    return <> <div ref={mainQnDiv} className={`qns qns${qn.id} flex gap-4 flex-col ${(i() != 0)? "hidden":""}`}>
                        <div class="qn text-xl xl:text-2xl">
                            {`${i()+1}) ${qn.q}`}
                        </div>
                        <div className="ans flex flex-col text-lg xl:text-xl pl-4">
                            <For each={qn.ans}>{
                                (ans, i) => {
                                    return <div class="flex gap-2 items-center">
                                        <input type={qnType(qn.type)}  id={ans.id} value={ans.a} />
                                        <label for={ans.id}>{ans.a}</label>
                                    </div>
                                }
                            }</For>
                        </div>
                        <button onClick={e => {
                            let ans = e.target.previousSibling.children
                            let ansArr = []
                            
                            if(qn.type == "text" || qn.type == "numeric") ansArr.push(ans[0].childNodes[0].value)
                            else{
                            Object.values(ans).forEach(el => {
                                if(el.childNodes[0].checked) ansArr.push(el.childNodes[0].id)
                            })}
                            selected[qn.id] = ansArr
                            let flag = true
                            qnId().forEach(el => {  
                                if(!selected[el] || (selected[el] && selected[el].length <= 0)) flag = false
                            })
                            setAll(flag)
                            if((qn.type =="mcq" || qn.type=="msq") && selected[qn.id].length > 0){
                                e.target.classList.add("bg-green-500", "dark:text-black")
                                e.target.innerText = "SAVED"
                                document.getElementsByName(qn.id)[0].classList.remove("border-red-500","dark:border-red-500", "bg-red-500")
                                document.getElementsByName(qn.id)[0].classList.add("bg-green-500", "border-bordercol-light", "dark:border-bordercol-dark","dark:text-black", "border-none")
                            }else if((qn.type == "text" || qn.type == "numeric") && ans[0].childNodes[0].value.length > 0){
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
                    <Show when={qns()}>
                        <For each={qnId()}>{
                            (id, i) => {
                                return <>
                                    <button class="qnBtn text-textcut-light dark:text-textcut-dark" name={id} onClick={el => {
                                        Object.values(document.getElementsByClassName("qns")).forEach(el => {
                                            el.classList.add("hidden")
                                        })
                                        document.querySelector(".qns"+id).classList.remove("hidden")
                                        if(!selected[id]){
                                            el.target.classList.add("border-red-500","dark:border-red-500")
                                        }else if(selected[id].length == 0 ){
                                            el.target.classList.add("border-red-500","dark:border-red-500")
                                        }
                                    }}>{i() + 1}</button>
                                    </>
                            }
                        }</For>
                    </Show>
                </Show>
            </div>
            <button onClick={() => setSubmit(true)} class={`btn rounded-none cursor-pointer border-none text-black ${all()? "bg-green-500" : "bg-red-500"}`}>SUBMIT</button>
        </div>
        
        </div>

        {submit() &&
            <div className="absolute inset-0 bg-div-light dark:bg-div-dark z-0 flex justify-center items-center">
            {console.log(selected)}
            {Object.values(selected).forEach(el => {
                if(el.length > 0) count += 1
            })}
            <div className="flex flex-col gap-4">
            <p>Answered : {count}</p>
            <p>Not Answered : {qnId().length - count}</p>
            <button class="btn" onClick={() => {replaceFunction("/mock")}}>DONE</button>
            </div>
            </div> 
        }     
        
    </>


    }



export default Test