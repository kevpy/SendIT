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
                  <br>
                  You can review the order details on the provided table
                <hr>
                </P>
    `;
document.getElementById("user").appendChild(par);

window.onload = function get_all_parcels() {
  all_parcels_url = base_uri + "parcels";

  fetch(all_parcels_url, {
    mode: "cors",
    method: "GET",
    headers: h
  })
    .then(response => {
      if (response.ok) {
        return response.json().then(data => {
          // window.location.href = "profile.html";

          data.Data.forEach(item => {
            // console.log(item);
            let tr = document.createElement("tr");
            tr.setAttribute("class", "test");
            tr.innerHTML = `
                    <td>${item.parcel_id}</td>
                    <td>${item.origin}</td>
                    <td>${item.destination}</td>
                    <td contenteditable="true" id="present-loc">${
                      item.current_location
                    }</td>
                    <td contenteditable="true">
                        <select name="status" id="status">
                            <option value="pending delivery">${
                              item.status
                            }</option>
                        </select>
                    </td>
                    <td><a href="#" onclick="change_location(this)";><b>Update</b></a></td>
            `;
            document.getElementById("orders").appendChild(tr);
          });

          // Delivered orders

          data.Data.forEach(item => {
            if (item.status == "delivered") {
              let tr = document.createElement("tr");
              tr.setAttribute("class", "test");
              tr.innerHTML = `
                    <td>${item.parcel_id}</td>
                    <td>${item.origin}</td>
                    <td>${item.destination}</td>
                    <td>${item.current_location}</td>
                    <td><span class="label success">Delivered</span></td>
            `;
              document.getElementById("delivered").appendChild(tr);
            }
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
};

function change_location(ele) {
  let parcel_id = ele.parentNode.parentNode.children[0].innerHTML;
  let present_location = ele.parentNode.parentNode.children[4].innerHTML;

  let present_location_url =
    base_uri + "parcels/" + parcel_id + "/presentLocation";

  console.log(parcel_id + " : " + present_location);
  console.log(present_location_url);

  let pLocData = JSON.stringify({ location: present_location });

  fetch(present_location_url, {
    mode: "cors",
    method: "PUT",
    headers: h,
    body: pLocData
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
