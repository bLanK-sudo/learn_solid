import { createSignal } from 'solid-js';
export const [login, setLogin] = createSignal(false)
export const [user, setUser] = createSignal(null)

export function replaceFunction(url){
  window.location.replace(url);
}


export const fetchData = async (url, set) => {
    await fetch(url).then((res) => res.json()).then(data => set(data))
}

export const postJSON = async(url,data) => {
    try {
      const response = await fetch(url, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  


fetchData("http://localhost:5000/users", setUser)

