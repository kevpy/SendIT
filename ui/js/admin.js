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

function get_all_parcels() {
  all_parcels_url = base_uri + "parcels";
  console.log(all_parcels_url);

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
                    <td contenteditable="true">${item.current_location}</td>
                    <td contenteditable="true">
                        <select name="status" id="">
                            <option value="pending">Pending Delivery</option>
                            <option value="delivered">Delivered</option>
                        </select>
                    </td>
                    <td><b> submit</b></td>
            `;
            document.getElementById("orders").appendChild(tr);
          });

          // Delivered orders

          data.Data.forEach(item => {
            if (item.status == "delivered") {
              console.log(item);
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
}
