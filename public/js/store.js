import jwt_decode from 'jwt-decode';
import { createSignal } from 'solid-js';
export const [login, setLogin] = createSignal(false)
export const [user, setUser] = createSignal(null)
export const [error, setError] = createSignal("")


if(localStorage.getItem("login")){
  if(localStorage.getItem("token")){localStorage.setItem("login", "true"); setLogin(true)}else {localStorage.setItem("login", "false"); setLogin(false)}
  
}
console.log(login());

export function replaceFunction(url){
  window.location.replace(url);
}


export const fetchData = async (url, set) => {
    await fetch(url).then((res) => res.json()).then(data => set(data))
}

if(localStorage.getItem("token")){
  console.log(localStorage.getItem("token"));
  var decoded = jwt_decode(localStorage.getItem("token"));
  console.log(decoded);
}


// const new_data = await fetch("http://abulaman.pythonanywhere.com/test/start_test/", {
//   method: "POST", // or 'PUT'
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${localStorage.getItem("token")}`
//   },
//   body:JSON.stringify({qp_id : 1})

// })

// console.log(new_data.json());


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

