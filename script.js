//Deceleration

const ipAddress = document.getElementById('ipaddress');
const city = document.getElementById('city')
const Zonetime = document.getElementById('Zonetime')
const serviceProvider = document.getElementById('service');
const ipinput =  document.getElementById('ipinput');
const inputButton = document.getElementById('inputButton');


//Validating Input

function validateIPv4(ip) {
  const ipv4Pattern = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Pattern.test(ip);
}

function validateIPv6(ip) {
  const ipv6Pattern = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv6Pattern.test(ip);
}
inputButton.addEventListener('click', function () {

  if(ipinput.value === "" || !validateIPv4(ipinput.value) &&  !validateIPv6(ipinput.value))
  {
    console.log(ipinput.value)
    console.log(validateIPv4(ipinput.value))
    console.log(validateIPv6(ipinput.value))
    alert("Invalid Input")
  }
  else{
    renderInputIP(ipinput.value);
    console.log(validateIPv4(ipinput.value))

  }
  


})

const renderInputIP = function(userInputIP){
  fetch(`http://ip-api.com/json/${userInputIP}`).then(response => response.json()).then(data => renderIp(data))

}



const initialIp = function(){

    fetch('http://ip-api.com/json').then(response => response.json()).then(data => renderIp(data))
  }


const renderIp = function (data){
  ipAddress.textContent = data.query;
  city.textContent = data.city;
  Zonetime.textContent = data.timezone;
  serviceProvider.textContent = data.isp;
  console.log(data.lat, data.lon)
  changeLocation(data.lat, data.lon,data.city)


}


initialIp();

let map;
const changeLocation =  function (lat,lng,city)
{
  if (map) {
    map.remove();
  }
  map = L.map('map').setView([lat, lng], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  L.marker([lat, lng]).addTo(map)
      .bindPopup(`You are now in ${city}`)
      .openPopup();
}


