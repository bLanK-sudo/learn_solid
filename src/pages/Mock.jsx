import { Motion } from "@motionone/solid";
import Nav from '../Components/Nav.jsx'
import Menu from "../Components/Menu";
import {user, fetchData, fetchUser} from '../../public/js/store.js'
import { Switch, createEffect } from "solid-js";
import { A, useNavigate } from '@solidjs/router';
import { login } from "../../public/js/store.js";

const subjectsPicked = () => { if(user()) return user().courses }

const Mock = () => {

  const navigate = useNavigate()
  if(!login()) {alert("You are not logged in!!"); return navigate("/login", {replace:true})}
  fetchUser()
  return (
  <>
  <Motion animate={{opacity:[0, 1]}} transition={{ duration: .7, easing: "ease-in-out" }}>
      <Menu />
      <Nav />
      <div class="p-8 m-[5px] mt-0 h-[300px] text-textcol-light dark:text-textcol-dark bg-div-light dark:bg-div-dark border-2 border-bordercol-light dark:border-bordercol-dark rounded-bl-xl rounded-br-xl border-t-0 ">
          <Show when={user()} fallback={
                <div class="animate-pulse w-full flex space-x-4">
                  <div class="flex-1 space-y-6 py-1">
                    <div class="h-8 bg-slate-700 rounded-full"></div>
                    <div class="space-y-3">
                      <div class="grid grid-cols-3 gap-4">
                        <div class="h-8 bg-slate-700 rounded-full col-span-2"></div>
                        <div class="h-8 bg-slate-700 rounded-full col-span-1"></div>
                      </div>
                      <div class="grid grid-cols-4 gap-4">
                        <div class="h-8 bg-slate-700 rounded-full col-span-1"></div>
                        <div class="h-8 bg-slate-700 rounded-full col-span-3"></div>
                      </div>
                    </div>
                  </div>
                </div>}>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <For each={subjectsPicked()}>{(sub) =>
                    <div class="p-2 px-8 md:p-4 md:px-16 flex flex-col w-full flex-wrap justify-between sm:flex-row rounded-md h-max border-2 border-textcut-light dark:border-textcut-dark">
                        <p class="text-xs md:text-xl w-max">{sub.name}</p>
                        <p class="underline"><A href={`/mock/test/${sub.id}`} class="text-xs md:text-xl">Attempt Mock</A></p>
                    </div>

                    }
                  </For>
                </div>
          </Show>
      </div>
      <div class="flex items-start m-2 gap-8 text-textcol-light dark:text-textcol-dark">
      <div class="grid grid-cols-1 md:grid-cols-2 w-screen flex-wrap gap-4">
        <div class='bg-div-light dark:bg-div-dark rounded-bl-xl rounded-br-xl'>
          <h3 class='topic'>Subjects</h3>
          <div className="p-4 px-8">
          <p class=''>All the Subjects you have taken for this term is displayed here</p>
          <Show when={user()} fallback={<p>Loading....</p>}>

            <For each={subjectsPicked()}>{ (sub) =>
              <ul class="list-disc pl-4">
                <li><A class='underline' href={`/subjects/${sub.id}`}>{sub.name}</A></li>
              </ul>
              }

            </For>

          </Show>
          </div>
        </div>
        <div class='bg-div-light dark:bg-div-dark rounded-bl-xl rounded-br-xl'>
          <h3 class='topic'>Exams</h3>
          <div class="p-4">
          <p>All the upcoming exams for this term is displayed here</p>
          <ul class="list-disc pl-4">
            <li><A class='underline' href="/exam/q1">Quiz 1</A></li>
            <li><A class='underline' href="/exam/q2">Quiz 2</A></li>
            <li><A class='underline' href="/exam/et">End Term</A></li>
          </ul>
          </div>
        </div>

      </div>

    </div>
  </Motion>
  </>
  )
}


export default Mock