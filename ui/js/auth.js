const signup_url = "https://send-it-kibet.herokuapp.com/api/v2/auth/signup";
const login_url = "https://send-it-kibet.herokuapp.com/api/v2/auth/login";

const h = {
  "Content-Type": "application/json; charset=utf-8",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Request-Method": "*"
};

const auth = {
  signup: () => {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let password_rpt = document.getElementById("password-rpt").value;
    if (password != password_rpt) {
      let span = document.createElement("span");
      span.setAttribute("class", "message");
      span.innerHTML = `
                    <strong>PASSWORD</strong> and <strong>REPEAT PASSWORD</strong> <em>should match.</em>
              `;
      document.getElementById("notification").appendChild(span);
    } else {
      let signup_data = JSON.stringify({
        name: name,
        email: email,
        password: password
      });

      fetch(signup_url, {
        mode: "cors",
        method: "POST",
        headers: h,
        body: signup_data
      })
        .then(response => {
          if (response.ok) {
            return response.json().then(data => {
              window.location.href = "login.html";
            });
          }
          if (!response.ok) {
            return response.json().then(data => {
              for (const key of Object.keys(data)) {
                let span = document.createElement("span");
                span.setAttribute("class", "message");
                span.innerHTML = `
                    <strong>${key}</strong> : <em>${data[key]}</em><br>
              `;
                document.getElementById("notification").appendChild(span);
              }
            });
          }
        })
        .catch(err => {
          console.log("ERROR:", err.message);
        });
    }
  },

  login: () => {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let login_data = JSON.stringify({
      email: email,
      password: password
    });

    fetch(login_url, {
      mode: "cors",
      method: "POST",
      headers: h,
      body: login_data
    })
      .then(response => {
        if (response.ok) {
          return response.json().then(data => {
            window.localStorage.setItem("token", data["token"]);
            window.localStorage.setItem("user_id", data.data["user_id"]);
            window.localStorage.setItem("user_name", data.data["name"]);

            if (data.data.user_role == "user") {
              window.location.href = "profile.html";
            } else {
              window.location.href = "admin_profile.html";
            }
          });
        }
        if (!response.ok) {
          return response.json().then(data => {
            for (const key of Object.keys(data)) {
              let span = document.createElement("span");
              span.setAttribute("class", "message");
              span.innerHTML = `
                    <strong>${key}</strong> : <em>${data[key]}</em><br>
              `;
              document.getElementById("notification").appendChild(span);
            }
          });
        }
      })
      .catch(err => {
        console.log("ERROR:", err.message);
      });
  }
};
