import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function App() {
  const api = "https://localhost:44323/token?username=admin&password=admin";
  const [token, setToken] = useState("Нету");
  const [login, setLogin] = useState("Нет логина");
  const [role, setRole] = useState("Без роли");
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  async function takeToken() {
    await axios.get(api).then(
      await function (respons) {
        setToken(respons.data.access_token);
      }
    );
    setCookie("access_token", token, { path: "/" });

  }

  async function restApi() {
    let w = "https://localhost:44323/getlogin";
    let jwt = cookies?.access_token;

    let config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + jwt,
      },
    };

    axios.get(w, config).then(
      await function (resp) {
        console.log(resp);
      }
    );
  }

  async function restApi1() {
    let w = "https://localhost:44323/getrole";
    let jwt = cookies?.access_token;

    let config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + jwt,
      },
    };

    axios.get(w, config).then(
      await function (resp) {
        console.log(resp);
      }
    );
  }

  return (
    <div className="App">
      <button onClick={takeToken}>Получить токен</button>
      <br />
      <p></p>
      <button onClick={restApi}>Узнать логин</button>
      <h4>{login}</h4>
      <button onClick={restApi1}>Узнать роль</button>
      <h4>{role}</h4>
    </div>
  );
}

export default App;
