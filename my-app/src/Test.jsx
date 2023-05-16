import { For, createEffect, createSignal } from "solid-js"
import { useParams } from "@solidjs/router"
import styles from "./css/App.Module.css"
import { fetchData } from "./js/store"
import Nav from './Nav'
import { style } from "solid-js/web"
export const [qns, setQns] = createSignal(null)
export const [ans, setAns] = createSignal(null)
const Test = () => {
const params = useParams();
var arr = []
fetchData("http://127.0.0.1:5000/qns", setQns)
fetchData("http://127.0.0.1:5000/ans", setAns)

const [idArr, setidArr] = createSignal(null)

createEffect(() => {
    if(qns()){
        arr = Object.keys(qns())
        setidArr(arr)
    }
})


return <>
    <Nav />
    <Show when={ans()} fallback={<p>Collecting your questions.... If this takes more than a few minutes then there might be a server error. Check your console for the error if it shows a 500, then send us a mail</p>}>
        <Show when={qns()}>
        <For each={idArr()}>{
            
            (id,i) => { 
                return <div class={`w${id} h hidden`}>
                    <p>{qns()[id].q}</p>
                    <For each={ans()}>{
                        (ans) => ans[id].map((an) => <><input id={an.id} name={id} type={(qns()[id].type == "mcq")? "radio" : "checkbox"} /> <label for={an.id}>{an.a}</label><br /></> )
                    }</For>
                </div>
             }
        }</For>
        </Show>
    </Show>

    <Show when={idArr()} fallback={<p>Side Panel is Loading....</p> }>
        <For each={idArr()}>{
            (id, i) => <p onClick={el => {
                const qArr = document.querySelector('.h')
                qArr.forEach(e => {
                    document.querySelector(e)
                });
                document.querySelector(`.w${id}`).classList.toggle('hidden')
            }} class={styles.qnno}>{i() + 1}</p>
        }</For>
    </Show>

</>


// return <>
// <Nav />
// <form action="http://127.0.0.1:5000/submit" method="POST">
//     <h3 class={styles.param}>{params.id.toUpperCase()}</h3>
//     <Show when={qns()} fallback={<p>Loading....</p>}>
//         <Show when={ans()} fallback={<p>Loading....</p>}>
//             <For each={qns()}>{
//                 (qn, i) => {
//                     var str = ""
//                     arr.push([<p class={styles.qn}>{i() + 1}) {qn.q}</p>])
//                     console.log(arr);
//                     console.log(i());
//                     ans().map((ans) => {
//                         if(ans[qn.id]){
//                             (ans[qn.id]).map((a) => arr[i()].push(<div class={styles.ans} ><input id={a.id} name={qn.id} value={a.id} type={(qn.type == "mcq")? "radio" : "checkbox"} /><label for={a.id}>{a.a}</label></div>))
//                         }
//                     })
//                 }
//             }</For>
//             {arr}
//         </Show>
//     </Show>
//     <button class={styles.subbtn} type="submit">Submit</button>
// </form>

// </>

// return <>
//     <div class={styles.testparent}>
//         <div class={styles.testheader}>
//             <h3>{params.id}</h3>
//         </div>
//         <div class={styles.testbottom}>
//             <Show when={qns()} fallback={<p>Loading...</p>}>
//                 <div class="h">
//                     <p class="qn">{qns()[0].qn.d}</p>
//                     <div class="ans">
//                     <For each={Object.values(qns()[0]["ans"])}>{(ans, i) => <><input id={qns()[0].qn.id} name={qns()[0].qn.id} type="radio" /> <label value={qns()[0].qn.id} for={qns()[0].qn.id}>{ans}</label></>}</For>
//                     </div>
//                 </div>
//             </Show>

//             <div class={styles.testqn}>
//                 <For each={qns()}>{ (qn,i) =>
//                     <div onClick={el=> {
//                         var ans = ""
//                         Object.values(qns()[i()]["ans"]).forEach((e) => {
//                             ans = ans + (`<p><input id=${qns()[0].qn.id} name=${qns()[0].qn.id} type="radio" /> <label value=${qns()[0].qn.id} for=${qns()[0].qn.id}>${e}</label></p>`)
//                         });
//                         console.log(ans);
//                         document.querySelector('.ans').innerHTML = ans
//                         }}>{i() + 1}</div>
//                     }
//                 </For>
//             </div>
//         </div>
//     </div>
// </>

// let i = 0;
// return <>
//     <Nav />
//     <h3 class={styles.param}>{params.id.toUpperCase()}</h3>
//     <div>
//         <Show when={qns()} fallback={ <p>Loading....</p> }>

//             <p>{qns()[0].q}</p>
//         </Show>
//         {
//             qns().forEach((element) => {
                
//             })
//         }
//     </div>
// </>



}



export default Test