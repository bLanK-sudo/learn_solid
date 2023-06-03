import { createSignal } from 'solid-js';
export const [login, setLogin] = createSignal(false)
export const [user, setUser] = createSignal(null)

export const fetchData = async (url, set) => {
    await fetch(url).then((res) => res.json()).then(data => set(data))
}

fetchData("http://localhost:5000/users", setUser)

