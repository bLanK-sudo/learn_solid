import { createEffect } from 'solid-js';
import styles from './css/App.module.css'
import {animate} from 'motion'

export default () => {
return (
<div class="flex justify-between text-textcol-light dark:text-textcol-dark flex-row bg-div-light dark:bg-div-dark font-outfit m-[5px] my-0 border-2 border-bordercol-light dark:border-bordercol-dark border-y-0">
    <div class="flex gap-4 items-center">
        <a href="/" class='nav-btn'>bLanK</a>
    </div>
    <div class="hidden md:flex gap-4 items-center">
        <a href="/mock" class='nav-btn'>Mock</a>
        <a href="/about" class='nav-btn'>About</a>
        <a href="/profile" class='nav-btn'>Profile</a>
        <a href="/donate" class='nav-btn'>Donate</a>
    </div>
    <div class="hidden md:flex gap-8 items-center no-underline font-bold text-md px-8">
        <div class="theme-toggle">
            <label class="theme-switch" for="checkbox">
                <input ref={el => {
                    var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
                    
                    if(storedTheme == 'dark'){
                        el.checked = true
                    }else{
                        el.checked = false
                    }
                    el.addEventListener('click', () => {
                    
                    var currentTheme = document.documentElement.classList.contains("dark");
                    if (currentTheme){
                        document.documentElement.classList.remove('dark')
                        localStorage.setItem('theme', "light")
                    }else{
                        localStorage.setItem('theme', "dark")
                        document.documentElement.classList.add('dark')
                    }
                    
                    })
                    
                    
                }} type="checkbox" id="checkbox"  checked/>
                <div class="slider round"></div>
            </label>
            <em></em>
        </div>

    </div>
    <div class="flex md:hidden nav-btn cursor-pointer" onclick={el => {animate(".menu", {display:'flex'}, {duration:0.1}) ;animate(".menu",{opacity:[0,1]}, {duration:.5})}} >Menu</div>
</div>
)
}