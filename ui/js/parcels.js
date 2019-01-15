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
  }
};
