import { UserLogin } from "../interface/login";
import { UserSignUp } from "../interface/signUp";

const signUp =async (user:UserSignUp) => {
    try {
        let response = await fetch("/api/user/register", {
            method: 'post',
            body:  JSON.stringify(user),
            headers: {'Content-Type':'application/json'},
          })
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
        console.log("pk")
        let data = await response.json()
        console.log(data)
        localStorage.setItem('hespoAuth',JSON.stringify(data.token ))
        return response
    } catch (error) {
        console.log("error")
        console.log(error)
        throw (error);
        
    }
    
}
const login =async (user:UserLogin) => {
  console.log("LOGIN")
  let response = await fetch("/api/user/login", {
    method: 'post',
    body:  JSON.stringify(user),
    headers: {'Content-Type':'application/json'},
  })
  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }
  let _user: any = await response.json();
  localStorage.setItem('hespoAuth',JSON.stringify(_user.token ));
  delete _user.token;
  localStorage.setItem("hespoUserInfo", JSON.stringify(_user));
  // navigate("/dashboard");
  return _user;
}
export  {signUp  , login};
