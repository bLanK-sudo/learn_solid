import { Motion } from "@motionone/solid";
import Nav from '../Components/Nav'
import Menu from '../Components/Menu'
import {fetchUser, login, setError, user} from '../../public/js/store.js'
import { createEffect, createSignal } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';


const App = () => {
  
  fetchUser()
  const navigate = useNavigate()
  if(!login()) {setError("You are not logged in!!"); return navigate("/login", {replace:true})}
return (
  <>  
  <Menu />
  <Motion animate={{opacity:[0, 1]}} transition={{ duration: .7, easing: "ease-in-out" }}>
  <Nav />
  
  <div class='text-textcol-light dark:text-textcol-dark'>
  <div class="p-16 m-[5px] mt-0 h-max bg-div-light dark:bg-div-dark border-2 border-bordercol-light dark:border-bordercol-dark rounded-bl-xl rounded-br-xl border-t-0">
    
  <p class="font-thin text-3xl md:text-5xl xl:text-7xl no-underline overflow-hidden h-max p-2"> Hello <Show when={user()} fallback={<span class="h-8 w-48 inline-block bg-slate-700 rounded-full animate-pulse"></span>}> <A href='/profile'  class="user cursor-pointer transition-color duration-500 hover:line-through  hover:text-textcol-dark hover:bg-textcol-light hover:px-4 dark:hover:text-textcut-light dark:hover:bg-textcol-dark">{(user())? user().username : <></>}</A> </Show>, nice to
        see you! </p>
      <div class="flex gap-6 pt-4">
        <A href="/mock" class="btn text-[10px] sm:text-xs md:text-xl w-max">Attempt mock</A>
        <A href="/coming-soon" class="btn text-[10px] sm:text-xs md:text-xl w-max flex gap-[5px]">Upcoming <span class="hidden md:block">Features</span></A>
      </div>
    

  </div>
  <div class="flex items-start m-2 gap-8  mb-16">
    <div class="grid grid-cols-1 md:grid-cols-2 w-full flex-wrap gap-4">
      <div class='bg-div-light dark:bg-div-dark rounded-bl-xl rounded-br-xl'>
        <h3 class='topic'>About</h3>
        <div class="p-4 flex flex-col gap-4">
        <p>Welcome to Mock Test App, the go-to platform for IIT Madras Online Degree Program students to ace their exams. We understand the importance of practice, and our mission is to provide students with an exte....</p>
        <A class="text-bordercol-light dark:text-bordercol-dark underline" href="/about">View More</A>
        </div>
      </div>
      <div class='bg-div-light dark:bg-div-dark rounded-bl-xl rounded-br-xl'>
        <h3 class='topic'>Feedback</h3>
        <div class="p-4 flex flex-col gap-4">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias doloremque temporibus ipsa porro error laborum similique, facere harum veritatis esse!</p>
        <A class="text-bordercol-light dark:text-bordercol-dark underline" href="/feedback">View More</A>
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