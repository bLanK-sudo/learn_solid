import styles from "./css/App.module.css";
import Nav from './Nav.jsx'
import {user, fetchData} from './js/store.js'
import { Switch, createEffect } from "solid-js";

const subjectsPicked = () => user()[0]["subjects"]

const exams = () => [["Quiz 1", "q1"], ["Quiz 2", "q2"], ["End Term", "et"]]
const subjects = () => [["Mordern Application Development 1", "mad1"], ["Mathematics 1", "maths1"], ["Mathematics2","maths2"], ["Statistics 1", "stats1"], ["Computational Thinking", "ct"]]
const Mock = () => {
return (
<>
    <Nav />
    <div class={`${styles.introbox} ${styles.mockinner}`}>
        <Show when={user()} fallback={<p>Loading.....</p>}>
            <Switch fallback={<p>Loading ...</p>}>
                <Match when={subjectsPicked()==null}>
                    <p class={styles.picksub}>You have not picked any subjects yet. Go to your profile and pick the
                        subjects
                        you have taken for this term.</p>
                </Match>
                <Match when={subjectsPicked()}>
                    <For each={subjectsPicked()}>{(sub) =>
                        <div class={styles.subjects}>
                            <p>{sub[0]}</p>
                            <p><a href={`/mock/test/${sub[1]}`} class={styles.btn}>Attempt Mock</a></p>
                        </div>

                        }
                    </For>
                </Match>


            </Switch>
        </Show>
    </div>
    <div class={styles.bottommock}>
        <div class={styles.leftbottommock}>
            <h3>Exams</h3>
            <For each={exams()}>{(exam) =>
                <div class={styles.exams}>
                    <p>{exam[0]}</p>
                    <p><a href={`/mock/${exam[1]}`}class={styles.linkexam}>View Exam</a> </p> </div> } 
            </For> 
        </div>
        <div class={styles.rightbottommock}>
        <h3>Subjects</h3>
        <For each={subjects().slice(0,3)}>{(sub) =>
            <div class={styles.exams}>
                <p>{sub[0]}</p>
                <p><a href={`/mock/subjects /${sub[1]}`} class={styles.linkexam}>View Subject</a></p>
            </div>
            }
        </For>
    </div>
</div>
</>
)
}


export default Mock