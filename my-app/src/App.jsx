import styles from './css/App.module.css';
import Nav from './Nav.jsx'
import {user} from './js/store.js'
import { createEffect } from 'solid-js';
const App = () => {


return (
<>
  <Nav />
  <div class={styles.introbox}>
    <Show when={user()} fallback={<p>Loading ...</p>}>
      <p class={styles.text}>Hello <a href='/profile' class={styles.user}>{user()[0]["name"]}</a>, nice to
        see you!</p>
      <div class={styles.btnHome}>
        <a href="/mock" class={styles.btn}>Attempt mock</a>
        <a href="/mock" class={styles.btn}>Previous attempts</a>
      </div>
    </Show>

  </div>
  <div class={styles.midhalf}>
    <div class={styles.innermidhalf}>
      <div>
        <h3>Subjects</h3>
        <p>All the Subjects you have taken for this term is displayed here</p>
        <Show when={user()} fallback={<p>Loading ...</p>}>
          <For each={user()[0]["subjects"]}>{ (sub) =>
            <ul>
              <li><a href={`/subjects/${sub[1]}`} style="text-decoration:underline;">{sub[0]}</a></li>
            </ul>
            }

          </For>

        </Show>
      </div>
      <div>
        <h3>Exams</h3>
        <p>All the upcoming exams for this term is displayed here</p>
        <ul>
          <li><a href="/exam/q1">Quiz 1</a></li>
          <li><a href="/exam/q2">Quiz 2</a></li>
          <li><a href="/exam/et">End Term</a></li>
        </ul>
      </div>

    </div>

  </div>
</>


);
}

export default App;