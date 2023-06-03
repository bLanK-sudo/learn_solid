import styles from './css/App.module.css';
import { Motion } from "@motionone/solid";
import {animate, glide} from "motion"
import Nav from './Nav'
import Menu from './Menu'
import {user} from './js/store.js'
import { createEffect } from 'solid-js';
const App = () => {



return (
  <>  
  <Menu />
  <Motion animate={{opacity:[0, 1]}} transition={{ duration: .5, easing: "ease-in-out" }}>
  <Nav />
  
  <div class='text-textcol-light dark:text-textcol-dark'>
  <div class="p-16 m-[5px] mt-0 h-max bg-div-light dark:bg-div-dark border-2 border-bordercol-light dark:border-bordercol-dark rounded-bl-xl rounded-br-xl border-t-0">
    
  <p class="font-thin text-3xl md:text-5xl xl:text-7xl no-underline overflow-hidden h-max p-2"> Hello <Show when={user()} fallback={<span class='inline-block w-24 md:w-32 lg:w-64 mt-2 h-8 md:h-14 xl:h-16 bg-textcol-light dark:bg-textcol-dark'></span>}> <a href='/profile'  class="user cursor-pointer transition-color duration-500 hover:line-through hover:text-textcut-light dark:hover:text-textcut-dark">{user()[0]["name"]}</a> </Show>, nice to
        see you! </p>
      <div class="flex gap-6 pt-4">
        <a href="/mock" class="btn text-[10px] sm:text-xs md:text-xl w-max">Attempt mock</a>
        <a href="/mock" class="btn text-[10px] sm:text-xs md:text-xl w-max">Previous attempts</a>
      </div>
    

  </div>
  <div class="flex items-start m-2 gap-8">
    <div class="grid grid-cols-1 md:grid-cols-2 w-screen flex-wrap gap-4">
      <div class='bg-div-light dark:bg-div-dark rounded-bl-xl rounded-br-xl'>
        <h3 class='topic'>Subjects</h3>
        <div className="p-4 px-8">
        <p class=''>All the Subjects you have taken for this term is displayed here</p>
        <Show when={user()} fallback={<p>Loading....</p>}>

          <For each={user()[0]["subjects"]}>{ (sub) =>
            <ul class='list-disc pl-4'>
              <li class=''><a class='underline' href={`/subjects/${sub[1]}`}>{sub[0]}</a></li>
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
        <ul class='list-disc pl-4'>
          <li><a class='underline' href="/exam/q1">Quiz 1</a></li>
          <li><a class='underline' href="/exam/q2">Quiz 2</a></li>
          <li><a class='underline' href="/exam/et">End Term</a></li>
        </ul>
        </div>
      </div>

    </div>

  </div>
  </div>
</Motion>
</>


);
}

export default App;