const tempfield=document.querySelector(".weather1")
const cityfield=document.querySelector(".weather2 p")
const datefield=document.querySelector(".weather2 span")
const emojifield=document.querySelector(".weather3 img")
const weatherfield=document.querySelector(".weather3 span")
const searchfield=document.querySelector(".search")
const form=document.querySelector("form")

let target="hyderabad"

const fetchdata=async(target)=>{
   try {
    
    const url=`https://api.weatherapi.com/v1/current.json?key=6ce7a28a7e45434d9c392231232803&q=${target}`
    const response=await fetch(url)
    const data=await response.json()
    console.log(data)
    const{
        current:{ temp_c,
            condition:{text,icon },
    },
        location:{name,localtime},
}=data;
    updateDom(temp_c,name,localtime,icon,text)
   
}

   catch (error) {
    alert("location not found")
    
   }
}
 
function updateDom(temp,city,time,emoji,text){
    tempfield.innerText=temp;
       cityfield.innerText=city;
       const exactdate=time.split(" ")[0];
       const exacttime=time.split(" ")[1];
        const exactday=new Date(exactdate).getDay();
      datefield.innerText=`${exacttime}-${getdayname(exactday)} ${exactdate}`;
    emojifield.src=emoji
    weatherfield.innerText=text
   } 
fetchdata(target)
function getdayname(num){
    switch(num){
        case 0:
            return "sunday";
        case 1:
            return "monday";
        case 2:
            return "tuesday";
        case 3:
             return "wednesday";
        case 4:
            return "thursday";
        case 5:
             return "friday";
         case 6:
             return "saturday";
         default:
             return"don't know"
                                                        }
}
const search=(e)=>{
    e.preventDefault();
    target = searchfield.value;
    fetchdata(target)
}

form.addEventListener("submit", search)