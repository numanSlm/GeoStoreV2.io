//json data
var getdata={ 
      "stores" :
  [    
                  [  
                          {
                          "storeNumber": "Mum1",
                          "id": "1501",
                          "name": "Store11",
                          "zone": "Mumbai",
                          
                          "coordinates":  {
                              "latitude": 18.93629942964397, 
                              "longitude": 72.83652160421936
                                          }
                          },
                          {
                          "storeNumber": "Mum2",
                          "id": "1502",
                          "name": "Store12",
                          "zone": "Mumbai",
                          
                          "coordinates":  {
                              "latitude": 19.116990914684195,  
                              "longitude": 72.83196055289238
                                          }
                          }
                  ],
    
                  [
                          {
                          "storeNumber": "Pune1",
                          "id": "1601",
                          "name": "Store21",
                          "zone": "Pune",
                          
                          "coordinates":  {
                              "latitude": 18.519513240920734, 
                              "longitude":73.86802639237582
                                          }   
                          },
                          {
                          "storeNumber": "Pune2",
                          "id": "1602",
                          "name": "Store22",
                          "zone": "Pune",
                          
                          "coordinates":  {
                              "latitude": 18.482240187701834,  
                              "longitude": 73.95496473927871
                                          }
                          }
                      ],
      
      
                      [    
                              {
                              "storeNumber": "Hyderabad1",
                              "id": "1701",
                              "name": "Store31",
                              "zone": "Hyderabad",
                              
                              "coordinates":  {
                                  "latitude": 17.42152127200402,  
                                  "longitude":78.4601169788582
                                              }   
                              },
                              {
                                  "storeNumber": "Hyderabad2",
                                  "id": "1702",
                                  "name": "Store32",
                                  "zone": "Hyderabad",
                                  
                                  "coordinates":  {
                                      "latitude": 17.58634802760948,  
                                      "longitude":78.26242340484501
                                                  }   
                              }
                      ],
                      
                      [
     
                              {
                                  "storeNumber": "KolKata1",
                                  "id": "1801",
                                  "name": "Store41",
                                  "zone": "Kolkata",
                                  
                                  "coordinates":  {
                                      "latitude": 22.85856873854587,  
                                      "longitude":88.17611855575709
                                                          }   
                              },
                              {
                                  "storeNumber": "KolKata2",
                                  "id": "1802",
                                  "name": "Store42",
                                  "zone": "Kolkata",
                                  
                                  "coordinates":  {
                                      "latitude":22.952225851138678,
                                      "longitude": 88.43040117490058 
                                                          }   
                              }
                      ]
  ]
  }

//end json data
// Menu button

$(document).ready(function() {
    $(".menu-icon").on("click", function() {
          $("nav ul").toggleClass("showing");
    });
});

// Scroll 

$(window).on("scroll", function() {
    if($(window).scrollTop()) {
          $('nav').addClass('black');
    }

    else {
          $('nav').removeClass('black');
    }
})



//hiding tab script
function openCity(e, x) {
      var allCities = ['Mumbai', 'Pune','Hyderabad','Kolkata'];
      for(var i in allCities){
            document.querySelector('#' + allCities[i]).style.display = 'none';
      }
      document.querySelector('#'+x).style.display = 'block';

}

//sidebar store locator

function openNav() {
    document.getElementById("mySidebar").style.width = "50%";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }


//calc city dist
function Distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
}

openCity(null, 'Mumbai');


//AutoGeolocation on window onload

if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
      //console.log(position);
      let lat= position.coords.latitude;
      let long=position.coords.longitude;
      let nearestStore = null;
      let minDistance = 1e10;
      for(var i=0; i<getdata.stores.length; ++i) {
          for(var j=0; j<getdata.stores[i].length; ++j){
              const distance = Distance(lat, long, getdata.stores[i][j].coordinates.latitude, getdata.stores[i][j].coordinates.longitude);
              if(distance < minDistance) {
                  minDistance = distance;
                  nearestStore = getdata.stores[i][j];
                 //displays  location , for debug use
                  //console.log(nearestStore.zone, minDistance)
              }
          }
      }
      if(!nearestStore) nearestStore = getdata.stores[0][0];
      openCity(null, nearestStore.zone);
      });
};



// button locate on user button press event if not allowed earlier
$('.searchBtn').click(function(){
        
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            let lat= position.coords.latitude;
            let long=position.coords.longitude;
          console.log(lat,long);
        });
        
    }
  });