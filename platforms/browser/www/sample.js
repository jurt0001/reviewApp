/*****************************************************************
File: index.js
Author: Christian Josef Jurt
Description: This allows you to take photos of apps and review them.

Version: 0.0.1
Updated: April 10, 2017

*****************************************************************/
"use strict";
//moment.locale('en-CA');
var review = null;
const jurt0001 = "jurt0001";
var currentReview;
var rating = 3;
var stars = null;
if (document.deviceready) {
    document.addEventListener('deviceready', init, false);
}
else {
    document.addEventListener('DOMContentLoaded', init, false);
}

function init() {
    localStorage.clear();
    console.log("init is running");
    //    window.addEventListener('push', pageChanged);
    //    
    stars = document.querySelectorAll('.star');
    addListeners();
    setRating(); //based on global rating variable value
    var addBtn = document.getElementById("add-review");
    addBtn.addEventListener("touchend", addReview);
    var savBtn = document.getElementById("saveMe");
    savBtn.addEventListener("touchend", saveReview);
    var takePhoto = document.getElementById("takePhoto");
    takePhoto.addEventListener("touchend", capturePhoto);
    if (!localStorage.getItem(jurt0001)) {
        var emptyArray = {
            "reviews": []
        };
        localStorage.setItem(jurt0001, JSON.stringify(emptyArray));
        console.log("local storage key is now set");
        //showList();
    }
    else {
        var list = JSON.parse(localStorage.getItem(jurt0001));
        showList(list); //LINE THAT DOESN'T WORK.
        console.log("localStorage Already Exists");
    }
}

function addListeners() {
  [].forEach.call(stars, function (star, index) {
        star.addEventListener('touchend', (function (idx) {
            console.log('adding listener', index);
            return function () {
                rating = idx + 1;
                console.log('Rating is now', rating)
                setRating();
            }
        })(index));
    });
}
//try a for loop
function setRating() {
  [].forEach.call(stars, function (star, index) {
        if (rating > index) {
            star.classList.add('rated');
            console.log('added rated on', index);
        }
        else {
            star.classList.remove('rated');
            console.log('removed rated on', index);
        }
    });
}

function capturePhoto(ev) {
    //console.log(navigator.camera);
    console.log("camera button is working");
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 80
        , destinationType: Camera.DestinationType.DATA_URL
        , encodingType: Camera.EncodingType.PNG
        , mediaType: Camera.MediaType.PICTURE
        , pictureSourceType: Camera.PictureSourceType.CAMERA
        , allowEdit: true
        , targetWidth: 300
        , targetHeight: 300
        , cameraDirection: Camera.Direction.FRONT
        , saveToPhotoAlbum: true
    })

    function onSuccess(data) {
        console.log("image success");
        
        var image = document.createElement("img");
        image.setAttribute("id", "newImage");
        image.src = "data:image/jpeg;base64," + data;
        document.getElementById("captured-photo").appendChild(image);
        //img=encodeURIComponent(img);
        //console.log(img);
        //document.getElementById("camera").setAttribute("image",img);
        //document.getElementById("").src=decodeURIComponent(img);
    }

    function onFail() {
        console.log("Image failed to capture");
    }
}

function addReview() {
    rating = 3;
    console.log("rating is now:" + rating + " wowzers");
    setRating();
    console.log('Add Review Button has been clicked');    
    var form = document.getElementById("form");
    form.reset();
    //    
    //  
    //var cancelBtn = document.getElementById("cancel");
    //    cancelBtn.addEventListener("touchend", cancelReview);  
    //    
    //var cancelX = document.getElementById("x");
    //    cancelX.addEventListener("touchend", cancelPerson);        
};
//
function cancelReview() {
    //
    console.log("addReview cancelled and form cleared")
        //    
        //    var savBtn = document.getElementById("save");
        //    savBtn.removeEventListener("touchend", personSave); 
        //    
    var form = document.getElementById("form");
    form.reset();
    //stars.reset();
    //
}
//
function saveReview() {
    //    
    console.log("saveReview has been clicked.");
    //            
    var item = document.getElementById("item").value;
    var timeStampId = Date.now();
    var img = "";
    review = {
        item: item
        , rating: rating
        , id: timeStampId
        , img: "img/animal-brown-horse.jpg"
    }
    console.log(review);
    var list = JSON.parse(localStorage.getItem(jurt0001));
    var reviewsList = list.reviews;
    reviewsList.push(review);
    localStorage.setItem(jurt0001, JSON.stringify(list));
    var form = document.getElementById("form");
    form.reset();
    //stars.reset();
    showList();
}

function deleteReview(ev) {
    
    console.log(ev.currentTarget.parent);
    console.log("Delete window has been open");
    
    
}

function showList() {
    var section = document.getElementById("review-list");
    section.innerHTML = "";
    var list = JSON.parse(localStorage.getItem(jurt0001));
 (var i = 0; i < list.reviews.length; i++) {

        var li = document.createElement("li");
        li.className = "table-view-cell";
        li.setAttribute("data-id", list.reviews[i].id)
        var span = document.createElement("span");
        span.className = "itemName";
        span.innerHTML = list.reviews[i].item;
        var a = document.createElement("a");
        a.className = "navigate-right pull-right";
        a.href = "#deleteModal";
        a.addEventListener("touchend", deleteReview);
        var span2 = document.createElement("span");
        span2.className = "star-rating";       
        span2.innerHTML = list.reviews[i].rating + " stars";        
        a.appendChild(span2);
        li.appendChild(span);
        li.appendChild(a);
        section.appendChild(li);       
    }   
};
//
//function deleteGift(ev){
//   currentPerson = ev.currentTarget.parentElement.getAttribute("data-id"); 
//    
//    //console.log(ev.currentTarget.parentElement.firstChild);   
//    
//    //console.log("delete button: " + currentPerson);
//    
//        let list = localStorage.getItem(jurt0001);
//        let parsed = JSON.parse(list);
//        let parsedPeople = parsed.people;
//        var index = 0;
//   
//    for (let i = 0; i < parsedPeople.length; i++) {
//
//        
//        if (parsedPeople[i].id == currentPerson) {
//
//            //console.log("does " + parsedPeople[i].id + " match " + currentPerson);
//            index = i;
//        
//        }
//        
//    }
//    
//
//    for(var i=0;i<parsedPeople[index].ideas.length; i++){
//     
//       //console.log("from localStorage: " + parsedPeople[index].ideas[i].idea)
//       //console.log("from li item: " + ev.currentTarget)
//       let el = ev.currentTarget.parentElement.firstChild;
//       let el2 = el.firstChild.innerHTML;
//     
//       
//        
//       if (parsedPeople[index].ideas[i].idea == el2) {
//          
//           //console.log("i: " + i);
//           //console.log(parsedPeople[index].ideas[i]);
//           
//           parsedPeople[index].ideas.splice(i, 1);
//           
//           localStorage.setItem(jurt0001, JSON.stringify(parsed));
//           
//           //console.log("we got a match: " + parsedPeople[index].ideas + " " + el2)
//        
//           
//           giftList();
//           
//           //console.log("ideas left in localStorage: " + parsedPeople[index].ideas);
//           
//           
//        }
//        
//        
//        
//    }
//    
//    
//    
//    
//}
//
//function editPerson(ev){
// 
//    ev.preventDefault;
//    
//    let savBtn = document.getElementById("save");
//    savBtn.addEventListener("touchend", editSave);
//    
//    let cancelBtn = document.getElementById("cancel");
//    cancelBtn.addEventListener("touchend", cancelPerson);  
//    
//    let cancelX = document.getElementById("x");
//    cancelX.addEventListener("touchend", cancelPerson); 
//    
//    //console.log("edit button is working!");
//    
//     let li = ev.currentTarget.parentElement.parentElement;
//    //console.log(li);
//    let dataName = li.getAttribute("data-id");
//    //console.log("dataName: " + dataName);
//    
//    let index = 0;
//    
//    let list = localStorage.getItem(jurt0001);
//    let parsed = JSON.parse(list);
//    //console.log(parsed);
//    
//    let parsedPeople = parsed.people;
//   
//    for (var i = 0; i < parsedPeople.length; i++) {
//        
//        //console.log(parsedPeople[i].id);
//        
//        if (parsedPeople[i].id == dataName) {
//            
//            //console.log(parsedPeople[i].id + " " + dataName);
//            index = i;
//            break;
//        }
//        
//        var parsedId = parsedPeople[i].id;
//        var parsedIdeas = parsedPeople[i].ideas;
//        //console.log(parsedIdeas);
//        
//    }
//    
//   // console.log("parsedId: " + parsedId);
//    
//   let theName = document.getElementById("name").value = parsedPeople[index].fullName;
//    
//    
//   let theDob = document.getElementById("dob").value = parsedPeople[index].dob;
//    
//    //console.log("name feild value before edit save button is click: " + document.getElementById("name").value)
//    //console.log("dob feild value before edit save button is click: " + document.getElementById("dob").value)
//    
//        function editSave(ev, theName, theDob, myIdeas) {   
//            
//        //console.log("EditSave has been activated");        
//            
//    //console.log(document.getElementById("name").value)
//    //console.log(document.getElementById("dob").value)
//           
//        let name = document.getElementById("name").value;
//        
//        if(name == ""){
//        name = "What's her face?";
//        }       
//            
//        let dateOfBirth = document.getElementById("dob").value;
//     
//        //console.log("parsed people: " + parsed.people);    
//        let theId = li.getAttribute("data-id"); 
//          
//
//        let entry = {
//            fullName: name,
//            dob: dateOfBirth,
//            id: theId,
//            ideas:[]
//        };
//            
//            //console.log(entry);
//          //console.log(index);
//          
//            
//            //let newEntry = parsed.people.splice(index, 1, entry);
//            parsed.people.splice(index, 1, entry);
//            
//            //console.log(parsed);
//            
//         
//        localStorage.setItem(jurt0001, JSON.stringify(parsed));    
//        let form = document.getElementById("form");
//        form.reset();
//        showList();
//        //let savBtn = document.getElementById("save");
//        savBtn.removeEventListener("touchend", editSave);
//    }    
//}
//
//function giftList(){
//    
//         let section = document.getElementById("gift-list");
//         section.innerHTML = "";
//    
//         let section2 = document.getElementById("gift-list-p");
//         section2.innerHTML = "";
//    
//    
//        let list = localStorage.getItem(jurt0001);
//        let parsed = JSON.parse(list);     
//        let parsedPeople = parsed.people;
//    
//        //console.log("THIS IS PARSED PEOPLE:" + parsedPeople);
//    
//        var index = 0;
//   
//    for (let i = 0; i < parsedPeople.length; i++) {
//
//        
//        if (parsedPeople[i].id == currentPerson) {
//
//            let giftTitle = document.getElementById("gifts");
//            giftTitle.innerHTML = parsedPeople[i].fullName;
//            index = i;
//            //console.log("index is: " + i);
//            //break;
//        }
//        
//    }
//    
//    if(parsedPeople[index].ideas.length == 0){
//                    
//                let section2 = document.getElementById("gift-list-p");
//         section2.innerHTML = "There are currently no gift ideas in list.";    
//                    
//    }else{
//            for(var i=0;i<parsedPeople[index].ideas.length; i++){   
//                
//                
//                
//                //console.log(parsedPeople[index]);
//                
//        //console.log("index is: " + index);  
//        //console.log(parsedPeople[index].ideas[i]);        
//        //console.log(parsedPeople[index].ideas[i].idea);          
//        //console.log("ADDING A GIFT TO THE LIST");
//        
//                let li = document.createElement("li");
//        li.className = "table-view-cell";
//        li.setAttribute("data-id", parsedPeople[index].id) 
//        let div = document.createElement("div");
//        
//        let p = document.createElement("p");
//        p.innerHTML = parsedPeople[index].ideas[i].idea;   
//        p.className = "ideaTitle";        
//        let p2 = document.createElement("p");
//        p2.innerHTML = parsedPeople[index].ideas[i].at;         
//        let a = document.createElement("a");
//        a.innerHTML = parsedPeople[index].ideas[i].url; 
//                
//        console.log(parsedPeople[index].ideas[i].url);        
//        
//        a.addEventListener("touchstart", (function(url){
//            return function() { navigator.app.loadUrl( url, { openExternal:true });};
//        })(parsedPeople[index].ideas[i].url));
//                                 
//                           
//        let p3 = document.createElement("p"); 
//        p3.innerHTML = parsedPeople[index].ideas[i].cost;
//                
//        let btn = document.createElement("button");
//        btn.className = "btn btn-negative";
//        btn.innerHTML = "Delete";  
//        btn.addEventListener("touchstart", deleteGift);          
//                      
//               
//        div.appendChild(p); 
//        div.appendChild(p2);
//        div.appendChild(a);
//        div.appendChild(p3);
//        li.appendChild(div);
//        li.appendChild(btn); 
//                
//                       
//        let ul = document.getElementById("gift-list");
//        ul.appendChild(li);
//
//        
//    }
//            }
//            
//}
//
//function addGift(){
//    
////console.log('Add Gift Button has been clicked');   
//    
////let form = document.getElementById("form");
////    form.reset();
//    
//let savBtn = document.getElementById("gift-save");
//    savBtn.addEventListener("touchend", giftSave);  
//  
//let cancelBtn = document.getElementById("gift-cancel");
//    cancelBtn.addEventListener("touchend", cancelGift);  
//    
//let cancelX = document.getElementById("x-gift");
//    cancelX.addEventListener("touchend", cancelGift);        
//    
//    
//    
//};
//    
//function giftSave(ev){
//    
//    //console.log("trying to find the correct gift list: " + ev.currentTarget.Parent);
//    
// //console.log('giftSave Button has been clicked');    
//
//        let idea = document.getElementById("idea").value;
//    
//    
//    if(idea == ""){
//        
//        cancelGift();
//        console.log("should have click the cancel button");
//    }   
//    
//    else{
//    
//    
//        let at = document.getElementById("at").value;
//        let url = document.getElementById("url").value;
//    
//if(!url == ""){
//var prefix = 'http://';
//if (url.substr(0, prefix.length) !== prefix)
//{
//    url = prefix + url;
//}
//}
//    
//    
//        let cost = document.getElementById("cost").value;
//
//    //let timeStampId = Date.now();
//    
//    gift = {
//        
//    idea:idea,
//      at:at,
//     url:url,
//    cost:cost   
//        
//};    
//        
// let list = JSON.parse(localStorage.getItem(jurt0001));     
// //console.log(list);
// //console.log(currentPerson);
////console.log(list.people);    
////console.log(list.people.length);    
// let index = null    
//    
//for(let i=0; i<list.people.length; i++){
//    
//    if(list.people[i].id == currentPerson){
//    index = i
//    //console.log(index);
//    }
//}    
//    
//    
// list.people[index].ideas.push(gift); 
//    
//localStorage.setItem(jurt0001, JSON.stringify(list));    
//let form = document.getElementById("gift-form");
//     form.reset();   
//   
// 
//giftList();   
//    
//    }
//}
//
//function cancelGift(){
//    
//    //console.log('cancelGift Button has been clicked');
//    
//    let savBtn = document.getElementById("gift-save");
//    savBtn.removeEventListener("touchend", giftSave); 
//    
//    let form = document.getElementById("gift-form");
//    form.reset();
//    
//}