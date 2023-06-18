import jwt_decode from 'jwt-decode';
import { createEffect, createSignal } from 'solid-js';
export const [login, setLogin] = createSignal(false)
export const [user, setUser] = createSignal(null)
export const [error, setError] = createSignal(null)


export const fetchUser = async () => {
  console.log("fetching user");
  const current_user = await fetch("http://abulaman.pythonanywhere.com/profile/", {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }
  })
  if(current_user){
    const data = await current_user.json()
    setUser(data)
  }
  console.log(user());
}





if(localStorage.getItem("login")){
  if(localStorage.getItem("token")){localStorage.setItem("login", "true"); setLogin(true)}else {localStorage.setItem("login", "false"); setLogin(false)}
  
}



export const fetchData = async (url, set) => {
    await fetch(url).then((res) => res.json()).then(data => set(data))
}

// if(localStorage.getItem("token")){
//   console.log(localStorage.getItem("token"));
//   var decoded = jwt_decode(localStorage.getItem("token"));
// }





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
  

