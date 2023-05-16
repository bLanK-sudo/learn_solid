import { createEffect } from 'solid-js';
import styles from './css/App.module.css'

export default () => {
return (
<div id={styles.sidebar}>
    <div id={styles.topinnerbox}>
        <a href="/">bLanK</a>
    </div>
    <div id={styles.middleinnerbox}>
        <a href="/mock">Mock</a>
        <a href="/about">About</a>
        <a href="/profile">Profile</a>
        <a href="/donate">Donate</a>
    </div>
    <div id={styles.bottominnerbox}>
        <div class="theme-toggle">
            <label class="theme-switch" for="checkbox">
                <input ref={el => {
                    var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
                    if (storedTheme) {
                        document.documentElement.setAttribute('data-theme', storedTheme)
                    }
                    if(storedTheme == 'light'){
                        el.checked = false
                    }else{
                        el.checked = true
                    }
                    el.addEventListener('click', () => {
                    
                    var currentTheme = document.documentElement.getAttribute("data-theme");
                    var targetTheme = "light";
                
                    if (currentTheme === "light") {
                        targetTheme = "dark";
                    }
                
                    localStorage.setItem('theme', targetTheme);
                    document.documentElement.setAttribute('data-theme', targetTheme)
                    })
                    
                    
                }} type="checkbox" id="checkbox"  checked/>
                <div class="slider round"></div>
            </label>
            <em>Dark Mode!</em> 
        </div>

    </div>
    <span style="display:none;" id={styles.lastinnerbox}>Menu</span>
</div>
)
}