/*****************************************************************
File: index.js
Author: Christian Josef Jurt
Description: This is an app that lets you take and store photo and reviews.

Version: 0.0.1
Updated: April 12, 2017

*****************************************************************/

"use strict";

var review = null;
const jurt0001 = "jurt0001";
var currentReview;
var rating = 3;
var stars = null;
var index;
var currentPhoto;

        if(document.deviceready){
        	document.addEventListener('deviceready', init, false);
		}else{
        	document.addEventListener('DOMContentLoaded', init, false);
		}

        function init() {
                    //localStorage.clear();

                     stars = document.querySelectorAll('.star');
                     addListeners();
                     setRating(); //based on global rating variable value

                    let addBtn = document.getElementById("add-review");
                    addBtn.addEventListener("touchend", addReview);

                    let savBtn = document.getElementById("saveMe");
                    savBtn.addEventListener("touchend", saveReview);

                    let takePhoto = document.getElementById("takePhoto");
                    takePhoto.addEventListener("touchend", capturePhoto);

                    let delBtn = document.getElementById("deleteReview");
                    delBtn.addEventListener("touchstart", delReview);
                
                    let backBtn = document.getElementById("back");
                    backBtn.addEventListener("touchstart", delBack);
                

                    if(!localStorage.getItem(jurt0001)){
                     let emptyArray = {"reviews":[]
                       
                      };
   
                    localStorage.setItem(jurt0001, JSON.stringify(emptyArray));
                    console.log("local storage key is now set");     
               
    }
    
                    else {

                        let list = JSON.parse(localStorage.getItem(jurt0001));

                        showList(list);    //LINE THAT DOESN'T WORK.


                        console.log("localStorage Already Exists");

    }   
}

        function addListeners(){
              [].forEach.call(stars, function(star, index){
                star.addEventListener('touchend', (function(idx){
                  console.log('adding listener', index);
                  return function(){
                    rating = idx + 1;  
                    console.log('Rating is now', rating)
                    setRating();
                  }
                })(index));
              });

            }

        function setRating(){
              [].forEach.call(stars, function(star, index){
                if(rating > index){
                  star.classList.add('rated');
                  console.log('added rated on', index );
                }else{
                  star.classList.remove('rated');
                  console.log('removed rated on', index );
                }
              });
            }

        function capturePhoto() {
                var options = {
                    quality: 80,
                    destinationType: Camera.DestinationType.FILE_URI,
                    encodingType: Camera.EncodingType.PNG,
                    mediaType: Camera.MediaType.PICTURE,
                    pictureSourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    targetWidth: 300,
                    targetHeight: 300,
                    saveToPhotoAlbum:true
                };
        
        function onSuccess(imageURI) {
           
            let image = document.createElement("img");
//            image.src = "data:image/jpeg;base64," + imageURI;
              image.src = imageURI
            image.setAttribute("id", "newImage")
//            currentPhoto = "data:image/jpeg;base64," + imageURI;
            currentPhoto = imageURI;
            
            
            document.getElementById("captured-photo").appendChild(image);
            document.getElementById("takePhoto").style.display = "none";
            document.getElementById("saveMe").style.display = "block";
        }
                  
        function onFail(message) {
            alert('Failed because: ' + message);
        }
    
        navigator.camera.getPicture( onSuccess, onFail, options);
        
    }

        function addReview(){
            document.getElementById("captured-photo").innerHTML = "";
            document.getElementById("takePhoto").style.display = "block";
            document.getElementById("saveMe").style.display = "none";
            rating = 3;    
            console.log("rating is now:" + rating + " wowzers");    
            setRating();

            console.log('Add Review Button has been clicked');   
                    //    
            let form = document.getElementById("form");
                    form.reset();
      
    
};

        function cancelReview(){

                    console.log("addReview cancelled and form cleared")   
                    let form = document.getElementById("form");
                    form.reset();

}

        function delBack(){
                document.getElementById("capturedImage").innerHTML = "";
            
            }

        function saveReview(){
    
                    console.log("saveReview has been clicked.");    
                                
                    let item = document.getElementById("item").value;

                    let timeStampId = Date.now();
  

                    review = {

                        item: item,
                        rating: rating,
                        id: timeStampId,
                        img: document.querySelector("#captured-photo img").src

                    }

                    console.log(review);

                    let list = JSON.parse(localStorage.getItem(jurt0001));     

                    let reviewsList = list.reviews;
                    reviewsList.push(review);    

                    localStorage.setItem(jurt0001, JSON.stringify(list));

                    let form = document.getElementById("form");
                    form.reset();
                    showList();   

    
}

        function deleteReview(ev){

                 
                   currentReview = ev.currentTarget.parentElement.getAttribute("data-id"); 
                    console.log("current review: " + currentReview);
                   
           

                         let list = JSON.parse(localStorage.getItem(jurt0001));
                
            
           
            
                    for(let i=0; i<list.reviews.length; i++){  
                        console.log("id from storage: " + list.reviews[i].id);
                        
                        if(list.reviews[i].id == currentReview){


                    let div = document.getElementById("capturedImage"); 
                    let bImg = document.createElement("img");
                    bImg.className = "big";
                    bImg.src = list.reviews[i].img;
                    let itemDisplay = list.reviews[i].item;
                    let ratingDisplay = list.reviews[i].rating; 
                    console.log(itemDisplay + " : " + ratingDisplay);        
                    let para = document.createElement("p");
                    let para2 = document.createElement("p");        
                    para.innerHTML = "Item: " + itemDisplay;
                    para2.innerHTML = "rating: " + ratingDisplay;        

                    div.appendChild(bImg);
                    div.appendChild(para);
                    div.appendChild(para2);            
                      
                }
                
                    
            }
            

}

        function delReview(){
            
            //console.log(currentReview);
            //conosle.log(list.reviews[i].id);
            
            
                    let list = JSON.parse(localStorage.getItem(jurt0001));
            
                    for(let i=0; i<list.reviews.length; i++){  
             
                    if(list.reviews[i].id == currentReview){
                    
                    index = i;    
                    list.reviews.splice(index, 1);
                    localStorage.setItem(jurt0001, JSON.stringify(list)); 
                    
                    
                }
                
                    
            }
            
                    let div = document.getElementById("capturedImage"); 
                    div.innerHTML = "";
                    showList();
            
        }
    
        function showList(){

                    let section = document.getElementById("review-list");
                    section.innerHTML = "";
                    let list = JSON.parse(localStorage.getItem(jurt0001));   
    
                    for(let i=0; i<list.reviews.length; i++){   

                    let img = document.createElement("img");
                    img.className = "media-object pull-left img-list"  
                    img.src = list.reviews[i].img;
                    let li = document.createElement("li");
                    li.className = "table-view-cell";
                    li.setAttribute("data-id", list.reviews[i].id)  
                    
                    let div = document.createElement("div"); 
                    div.id = "info";
                    let br = document.createElement("br");    
                    //div.setAttribute("id", "info");    
                        
                    let span = document.createElement("span");
                    span.className = "itemName";
                    span.innerHTML = list.reviews[i].item;
                        
                    let a = document.createElement("a");
                    a.className = "navigate-right pull-right";
                    //a.setAttribute("data-id", list.reviews[i].id) 
                    a.href = "#deleteModal";
                    a.addEventListener("touchstart", deleteReview);   
                   
                    let span2 = document.createElement("span");
                    span2.className = "star-rating";    
                    var string = "";
                    for(var x =0; x < list.reviews[i].rating; x++) {
                        
                        string += "<span class=\"icon icon-star-filled\"></span>";
                    }   
                    
                        
                        
                    div.appendChild(span);
                    div.appendChild(br);
                     
                    div.appendChild(span2);    
                    //span2.innerHTML = list.reviews[i].rating + " stars";
                    span2.innerHTML = string;
                    //a.appendChild(span2); 
                    li.appendChild(img);
                    //li.appendChild(a);
                    li.appendChild(div);
                        
                    li.appendChild(a);  
                    //li.appendChild(br;)    
                    
                    section.appendChild(li);
        
    }
   
};

