const base_uri = "https://send-it-kibet.herokuapp.com/api/v2/";

const token = "Bearer " + localStorage.getItem("token");

const h = {
  "Content-Type": "application/json; charset=utf-8",
  Accept: "application/json",
  Authorization: token,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Request-Method": "*"
};

let par = document.createElement("p");
par.innerHTML = `
                <p>
                  <img src="avatar.png" alt="Avatar" class="avatar">
                  <br>
                  <b>
                      Welcome
                      ${localStorage.getItem("user_name")}
                  </b>
                <hr>
                  Would you like to create a new parcel delivery order?
                </P>
    `;
document.getElementById("user").appendChild(par);

const parcels = {
  create_parcel: () => {
    event.preventDefault();
    create_url = base_uri + "parcels";

    let pickup_location = document.getElementById("pickup_location").value;
    let destination = document.getElementById("destination").value;
    let recipient = document.getElementById("recipient").value;
    let weight = document.getElementById("weight").value;
    let details = document.getElementById("details").value;

    let parcel_data = JSON.stringify({
      pickup_location: pickup_location,
      destination: destination,
      recipient: recipient,
      weight: weight,
      parcel_details: details
    });

    fetch(create_url, {
      mode: "cors",
      method: "POST",
      headers: h,
      body: parcel_data
    })
      .then(response => {
        if (response.ok) {
          return response.json().then(data => {
            window.location.href = "profile.html";
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
  },

  get_user_parcel: () => {
    user_parcel_url =
      base_uri + "users/" + `${localStorage.getItem("user_id")}/` + "parcels";
    console.log(user_parcel_url);

    fetch(user_parcel_url, {
      mode: "cors",
      method: "GET",
      headers: h
    })
      .then(response => {
        if (response.ok) {
          return response.json().then(data => {
            // window.location.href = "profile.html";
            let len = Object.keys(data.Parcels).length;
            let par = document.getElementById("all-user-parcels");
            par.textContent += `${len}`;

            data.Parcels.forEach(item => {
              // console.log(item);
              let div = document.createElement("div");
              div.setAttribute("class", "test");
              div.innerHTML = `
                      <div>
                        <div class="order-summary" id="order-id">
                        <a href="order_details.html?parcel_id=${
                          item.parcel_id
                        }">${item.parcel_id}</a>
                        
                        </div>
                        <div class="order-summary" id="order-status">
                            <span class="label other">${item.status}</span>
                        </div>
                        <div class="order-summary" id="order-location">${
                          item.current_location
                        }</div>
                        <hr>
                      </div>
              `;
              document.getElementById("all-user-orders").appendChild(div);
            });
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
  },

  get_on_transit_parcel: () => {
    user_parcel_url =
      base_uri + "users/" + `${localStorage.getItem("user_id")}/` + "parcels";
    console.log(user_parcel_url);

    fetch(user_parcel_url, {
      mode: "cors",
      method: "GET",
      headers: h
    })
      .then(response => {
        if (response.ok) {
          return response.json().then(data => {
            // window.location.href = "profile.html";
            let len = 0;

            data.Parcels.forEach(item => {
              if (item.status == "pending delivery") {
                len++;
                console.log(item);
                let div = document.createElement("div");
                div.setAttribute("class", "test");
                div.innerHTML = `
                      <div>
                        <div class="order-summary" id="order-id">${
                          item.parcel_id
                        }</div>
                        <div class="order-summary" id="order-status">
                            <span class="label other">${item.status}</span>
                        </div>
                        <div class="order-summary" id="order-location">${
                          item.current_location
                        }</div>
                        <hr>
                      </div>
              `;
                document.getElementById("pd-user-orders").appendChild(div);
              }
            });
            let par = document.getElementById("pd-user-parcels");
            par.textContent += `${len}`;
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
  },

  get_delivered_parcels: () => {
    user_parcel_url =
      base_uri + "users/" + `${localStorage.getItem("user_id")}/` + "parcels";
    console.log(user_parcel_url);

    fetch(user_parcel_url, {
      mode: "cors",
      method: "GET",
      headers: h
    })
      .then(response => {
        if (response.ok) {
          return response.json().then(data => {
            // window.location.href = "profile.html";
            let len = 0;

            data.Parcels.forEach(item => {
              if (item.status == "delivered") {
                len++;
                console.log(item);
                let div = document.createElement("div");
                div.setAttribute("class", "test");
                div.innerHTML = `
                      <div>
                        <div class="order-summary" id="order-id">${
                          item.parcel_id
                        }</div>
                        <div class="order-summary" id="order-status">
                            <span class="label success">${item.status}</span>
                        </div>
                        <div class="order-summary" id="order-location">${
                          item.current_location
                        }</div>
                        <hr>
                      </div>
              `;
                document
                  .getElementById("delivered-user-orders")
                  .appendChild(div);
              }
            });
            let par = document.getElementById("delivered-user-parcels");
            par.textContent += `${len}`;
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
