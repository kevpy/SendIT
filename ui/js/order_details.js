const base_uri = "https://send-it-kibet.herokuapp.com/api/v2/";

const token = "Bearer " + localStorage.getItem("token");

const h = {
  "Content-Type": "application/json; charset=utf-8",
  Accept: "application/json",
  Authorization: token,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Request-Method": "*"
};

function get_one_order() {
  event.preventDefault();
  let parcel_id = location.search.split("parcel_id=")[1];

  window.localStorage.setItem("parcel_id", parcel_id);

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
                  These are the details for your parcel order
                  <b>Order-id: ${parcel_id}</b>
                </P>
    `;
  document.getElementById("user").appendChild(par);

  let order_url = base_uri + "parcels/" + parcel_id;
  console.log(order_url);

  fetch(order_url, {
    mode: "cors",
    method: "GET",
    headers: h
  })
    .then(response => {
      if (response.ok) {
        return response.json().then(data => {
          console.log(data);

          let details = document.getElementById("details");
          let dest = document.getElementById("dest");
          let c_loc = document.getElementById("c-loc");
          let p_loc = document.getElementById("p-loc");
          let status = document.getElementById("status");
          let price = document.getElementById("price");
          let desc = document.getElementById("desc");
          let weight = document.getElementById("weight");
          let sender = document.getElementById("sender");

          details.textContent += data.Data.parcel_id;
          dest.textContent += data.Data.destination;
          c_loc.textContent += data.Data.current_location;
          p_loc.textContent += data.Data.origin;
          status.textContent += data.Data.status;
          price.textContent += data.Data.price;
          desc.textContent += data.Data.parcel_details;
          weight.textContent += data.Data.weight;
          sender.textContent += data.Data.localStorage.getItem("user_name");
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

function cancel_order() {
  event.preventDefault();
  let cancel_url =
    base_uri + "parcels/" + localStorage.getItem("parcel_id") + "/cancel";

  fetch(cancel_url, {
    mode: "cors",
    method: "PUT",
    headers: h
  })
    .then(response => {
      if (response.ok) {
        return response.json().then(data => {
          console.log(data);
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

function change_destination() {
  event.preventDefault();
  let change_dest_url =
    base_uri + "parcels/" + localStorage.getItem("parcel_id") + "/destination";
  // console.log(change_dest_url);

  let new_dest = document.getElementById("new-dest").value;

  console.log(new_dest);

  let dest_data = JSON.stringify({ location: new_dest });

  fetch(change_dest_url, {
    mode: "cors",
    method: "PUT",
    headers: h,
    body: dest_data
  })
    .then(response => {
      if (response.ok) {
        return response.json().then(data => {
          console.log(data);
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
