const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");


const errorContainer = document.querySelector('.api-error-containing');
    const errorText = document.querySelector('[data-apierrortext]');
//initially variable i needed 
let oldTab=userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add("current-tab");
getfromSessionStorage();

//some operation pending.

function switchTab(newTab){
    if(newTab!=oldTab)
    {
    oldTab.classList.remove("current-tab");
    oldTab=newTab;
    oldTab.classList.add("current-tab");
     if(!searchForm.classList.contains("active")){
        //is search form is invisible then make it visible
        userInfoContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active");
        searchForm.classList.add("active");
     }  
     else {
        searchForm.classList.remove("active");
        userInfoContainer.classList.remove("active");
         //now i have to showed my loaction weather info
        getfromSessionStorage();
     }
    }
}

userTab.addEventListener("click",()=>{
    //passing the clicked tab as input parameter
    errorContainer.classList.remove('active');
    switchTab(userTab);
});
searchTab.addEventListener("click",()=>{
    //passing the clicked tab as input parameter
    errorContainer.classList.remove('active');
    switchTab(searchTab);
});

function getfromSessionStorage(){
    const localCoordinates=sessionStorage.getItem("user-corrdinates");
    if(!localCoordinates){
        //if local corrdinates not available
        grantAccessContainer.classList.add("active");
    }
    else
    {
        const coordinates=JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat,lon}=coordinates;
    //grant access invisible make
    grantAccessContainer.classList.remove("active");
    //make loader gif visible
    loadingScreen.classList.add('active');
    try{
       const response=await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

       const data=await response.json();
       loadingScreen.classList.remove("active");
       userInfoContainer.classList.add("active");
       renderWeatherInfo(data); //find value the put in ui
    }
    catch(err){
        loadingScreen.classList.remove("active");
    }
}

function renderWeatherInfo(weatherInfo)
{   //firstly we have to fetch the element
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

//FETCH VALUES FROM API CALL THEN BY JSON WE CONVERTED INTO OBJECT 
//BY OPTIONAL CHAINING WE FIND THINGS
cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}


     function getLocation(){
           if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition);
           }
           else
           {
                 //show an alert for no geolocation support available
                 alert("Device does not support location service")
           }
     }

     function showPosition(position)
     {
        const userCoordinates={
            lat:position.coords.latitude,
            lon:position.coords.longitude,
        }
        sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
        fetchUserWeatherInfo(userCoordinates);
     }

const grantAccessButton=document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click",getLocation);


const searchInput=document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();//removes default method
    let cityName=searchInput.value;

    if(cityName=="")
        return;
    else
    fetchSearchWeatherInfo(cityName);
});

/*async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    grantAccessContainer.classList.remove("active");
    userInfoContainer.classList.remove("active");

   

    try{
    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data=await response.json();
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWeatherInfo(data);
    }

    catch(err){
            
    }
}*/
async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    grantAccessContainer.classList.remove("active");
    userInfoContainer.classList.remove("active");

    // Select the error container and its children elements
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        // Check if the response is not ok (status is 404 or other errors)
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('404 Error: City not found. Please enter a valid city name.');
            } else {
                throw new Error('An error occurred while fetching the weather data.');
            }
        }

        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        errorContainer.classList.remove('active');
        renderWeatherInfo(data);
    } catch (err) {
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.remove("active");
        // Show the error container with the appropriate message
        errorContainer.classList.add('active');
        errorText.textContent.add('active');
        
    }
}