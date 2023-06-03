import { For, createEffect, createSignal } from "solid-js"
import { useParams } from "@solidjs/router"
import styles from "./css/App.Module.css"
import {fetchData } from "./js/store"
import Nav from './Nav'
import { style } from "solid-js/web"


let thisQn;
let thisAns;
let num;
const [start, showStart] = createSignal(true)
const [qns, setQns] = createSignal([])
const [currentQn, setCurrentQn] = createSignal({})
const [qnId, setqnId] = createSignal([])
const selected = {}
let ansArr = []
const [change, setChange] = createSignal(false)
fetchData("http://localhost:5000/qnpaper", setqnId)
fetchData("http://localhost:5000/qns", setQns)
fetchData("http://localhost:5000/qns/65", setCurrentQn)

const qnType = (e) => {
    if(e == "mcq") return "radio"
    else if(e == "msq") return "checkbox"
    else if(e == "short") return "text"
    else if(e == "numeric") return "number"
    else return "textarea"
}

// const changeQn = (i) => {
//     thisQn.innerHTML = "";
//     thisQn.appendChild(<div> <span ref={num} class="num">{i +1}</span>) {qns()[i].q}</div>);
// }

// const changeAns = (i) => {
//     document.querySelector('.ans').innerHTML = "";
//     qns()[i].ans.forEach(ans => thisAns.appendChild(<div><input id={ans.id} name={qns()[i].id} type={qnType(qns()[i].type)} /> <label for={ans.id}>{ans.a}</label></div>))
// }


const Test = () => {

    const params = useParams();

    createEffect(() => {
        thisQn.innerHTML = currentQn().q;
        thisQn.name = currentQn().id;
        console.log(selected);
    })

    const isSaved = (a) => {
        return selected[a.name] ? true : false
    }

// return <>
//     <Nav />
//     <h3 class="font-montserrat p-5 font-black  text-center text-xl">{params.id.toUpperCase()}</h3>
//     <div class="p-4">
//         <div class="flex flex-col p-2">
//                 <Show when={qns()} fallback={<p>Loading Questions...</p>}>
//                 <div class="qns flex flex-col gap-16">
//                 <For each={qns()}>{
//                         (qn, i) => {
//                             return <div class="">
//                             <div class="flex items-start gap-2 text-lg lg:text-xl xl:text-2xl">
//                             <span>{`${(i()+1)})`}</span>
//                             <p>{qn.q}</p>
//                             </div>
//                             <div class="m-4">
//                             <For each={qns()[i()].ans}>{
//                                 (ans, i) => {
//                                     return <> <div class="flex gap-2"><input type={qnType(qn.type)} name={qn.id} id={ans.id} /><label class="text-base lg:text-lg" for={ans.id}>{ans.a}</label></div> </>
                                    
//                                 }
//                             }</For>
//                             </div>
//                             </div>
//                         }
//                     }</For>
//                 </div>
//                 </Show>
            
//         </div>
        
//     </div>
// </>

    return <>
        <Show when={currentQn()} fallback={<p>Loading.....</p>}>
        {start() &&
        <div class="">
            <button class="fixed inset-0 w-screen m-auto h-screen bg-div-light dark:bg-div-dark z-10 text-white text-xl" onClick={el => {showStart(false); console.log(isSaved(thisQn));document.getElementsByName("num"+thisQn.name)[0].classList.add(isSaved(thisQn)? "correctBtn":"wrongBtn")}}>START THE TEST</button>
        </div>
        }
        </Show>
        <Nav />
        <h3 class="font-montserrat p-5 font-black  text-center text-xl">{params.id.toUpperCase()}</h3>

        <div class="grid grid-cols-3 p-4">
            <Show when={qns()}>
            <Show when={qnId()}>
            <div class="col-span-2">
                <div class="qns" ref={thisQn}>
                    
                </div>
                <div onChange={
                    el => {

                    }
                } class="ans" ref={thisAns}>
                            <Show when={currentQn()}>
                                <For each={currentQn().ans}>{
                                    (ans, i) => {
                                        return <div><input type={qnType(currentQn().type)} name={currentQn().id} id={ans.id} /><label for={ans.id}>{ans.a}</label></div>
                                    }
                                }</For>
                            </Show>
                </div>
                <button class="btn" onClick={el => {ansArr = [] ;Object.values(thisAns.children).forEach(a => {if(a.childNodes[0].checked){ansArr.push(a.childNodes[0].id)}}); selected[thisQn.name] = ansArr; console.log(selected);document.getElementsByName("num"+thisQn.name)[0].classList.add(isSaved(thisQn)? "correctBtn":"wrongBtn");document.getElementsByName("num"+thisQn.name)[0].classList.remove(isSaved(thisQn)? "wrongBtn":"correctBtn") }}>Save</button>
            </div>
            </Show>
            </Show>
        <div class="col-span-1 p-2">
            <div class="flex gap-4 w-max flex-wrap">
                <Show when={qnId()} fallback={<><p>Hello World</p></>}>
                    <Show when={qns()}>
                        <For each={qnId()}>{
                            (id, i) => {
                                return <>
                                    <button onClick={el => {fetchData("http://localhost:5000/qns/"+ id, setCurrentQn); Object.values(thisAns.children).forEach(a => {if(ansArr){}})}} class="qnBtn" name={`num${id}`}>{i()+ 1}</button>
                                    </>
                            }
                        }</For>
                    </Show>
                </Show>
            </div>
        </div>
        </div>

    </>

    }







export default Test