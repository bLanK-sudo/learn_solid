import {user} from '../js/store.js'
import {animate, stagger} from 'motion'
import { createSignal, createEffect } from 'solid-js';
import { A } from '@solidjs/router';

const Menu = () => {
    return (
        <>  
            
            <div class="w-full h-screen fixed menu hidden gap-4 lg:gap-8 xl:gap-16 flex-col text-textcol-light dark:text-textcol-dark justify-center items-center p-16 mt-0 bg-div-light dark:bg-div-dark rounded-bl-xl rounded-br-xl border-t-0">
                <button onClick={el => {animate(".menu",{opacity:[1,0]}, {duration:.5}); animate(".menu", {display:'none'}, {delay:.5,duration:0.1})}} className="absolute top-5 right-5 font-miracle font-black text-5xl cursor-pointer hover:animate-pulse">X</button>
                <a href="/home" class={`nav-btn text-5xl w-[250px] text-center `}>Home</a>
                <a href="/mock" class={`nav-btn text-5xl w-[250px] text-center `}>Mock</a>
                <a href="/about" class={`nav-btn text-5xl w-[250px] text-center `}>About</a>
                <a href="/profile" class={`nav-btn text-5xl w-[250px] text-center `}>Profile</a>
                <a href="/donate" class={`nav-btn text-5xl w-[250px] text-center `}>Donate</a>
            </div>
        </>
    )
}

export default Menu