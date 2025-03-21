const URL = "https://house-price-prediction-7npn.onrender.com";
function getBathValue() {
  let uiBathrooms = document.getElementsByName("uiBathrooms");
  for (let i in uiBathrooms) {
    if (uiBathrooms[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  let uiBHK = document.getElementsByName("uiBHK");
  for (let i in uiBHK) {
    if (uiBHK[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  let sqft = document.getElementById("uiSqft");
  let bhk = getBHKValue();
  let bathrooms = getBathValue();
  let location = document.getElementById("uiLocations");
  let estPrice = document.getElementById("uiEstimatedPrice");

  let url = `${URL}/predict_home_price`;

  $.post(
    url,
    {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value,
    },
    function (data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML =
        "<h2>" + "Price: " + Math.abs(data.estimated_price).toString() + " Lakh</h2>";
      console.log(status);
    }
  );
}

function onPageLoad() {
  console.log("document loaded");
  let url = `${URL}/get_location_names`;
  $.get(url, function (data, status) {
    console.log("got response for get_location_names request");
    if (data) {
      let locations = data.locations;

      let uiLocations = document.getElementById("uiLocations");
      $("#uiLocations").empty();
      for (let i in locations) {
        let opt = new Option(locations[i]);
        $("#uiLocations").append(opt);
      }
    }
  });
}

window.onload = onPageLoad;
