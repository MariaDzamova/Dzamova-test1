
// globalne premenne
var tareaOut = document.getElementById("tareaResponse");
const back4appAppId = "frsqRdf8vciVikI8TekbiZ8WhGkaNJWlyNXZjFyz";
const back4appApiKey = "HnuLl3TbMCkNg93WtU8Nrz4w1lNR6ebWfKsPmR0l";
const url="https://parseapi.back4app.com/classes/PeopleList/";
const responseType = 'json';

var peopleList = [];



getPeople();
var selectedPersonId = "";

// var people=JSON.parse(peopleList);

// var maxId = peopleList.length;

function addPersonToHtml(newPerson){

    var newPerElm = document.createElement("button");

    newPerElm.innerHTML = newPerson.name;
    newPerElm.classList.add("perAsBt");

    newPerElm.setAttribute("type","button");
    newPerElm.setAttribute("data-id",newPerson.objectId);

    newPerElm.addEventListener("click",
        function(){
            document.getElementById("perIdEdt").value = newPerson.objectId;
            document.getElementById("pNameNew").value = newPerson.name;
            document.getElementById("pAgeNew").value = newPerson.age;
            document.getElementById("pSexNew").value = newPerson.sex;
            document.getElementById("perIdRem").value = newPerson.objectId;
        }
    ); 
    document.getElementById("frmPeople").appendChild(newPerElm);
}


// document.getElementById("buttRem").addEventListener("click",
//     function () {   
//             var idPer = document.getElementById("perIdRem").value;
//             deletePerson(idPer);
//             document.getElementById("frmPeople").removeChild(newPerElm);
//         }
// );

// document.getElementById("btAddPerson").addEventListener("click",
//     function () {

//         addPerson();
//         addPersonToHtml(createdPerson);

        
        
//     }
// );




// -------------------------------------------------------------------

function addPerson(){
    tareaOut.value="adding started ...";
    var perName = document.getElementById("pName").value.trim();
    var perAge = document.getElementById("pAge").value.trim();
    var perSex = document.getElementById("pSex").value.trim();

    var createdPerson = {name:perName, age:perAge, sex: perSex};

    const data = JSON.stringify(createdPerson);
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    setupHttpRequest(request);
    
    request.onload = function() {
        var status = request.status;
        if (status === 201) {
            writeSuccResponse && writeSuccResponse(request.response);
            createdPerson.taskId = this.response.objectId;
            peopleList.push(createdPerson);
        } else {
            writeErrMsg && writeErrMsg(status, request.response);
        }
    };
    request.send(data); 
    addPersonToHtml(createdPerson);
    return(createdPerson);
}

function editPerson(){
    tareaOut.value="editing started ...";

    var perName = document.getElementById("pNameNew").value.trim();
    var perAge = document.getElementById("pAgeNew").value.trim();
    var perSex = document.getElementById("pSexNew").value.trim();
  
    var perId = document.getElementById("perIdEdt").value.trim();

    if(perId==""){
        tareaOut.value +="\nSorry, no person id specified.\nDone.";
        return;
    }
    const data = JSON.stringify({name:perName, age:perAge, sex: perSex});

    var request = new XMLHttpRequest();
    request.open('PUT', url+perId, true);
    setupHttpRequest(request);

    request.onload = function() {
        var status = request.status;
        if (status === 200) {
            writeSuccResponse && writeSuccResponse(request.response);
        } else {
            writeErrMsg && writeErrMsg(status, request.response);
        }
    };
    request.send(data);  
}

function deletePerson(){
    tareaOut.value="deleting started ...";

    var perId = document.getElementById("perIdRem").value.trim();
    if(perId==""){
        tareaOut.value +="\nSorry, nothing to delete.\nDone.";
        return;
    }
    var request = new XMLHttpRequest();
    request.open('DELETE', url+perId, true);
    setupHttpRequest(request);
    request.onload = function() {
        var status = request.status;
        if (status === 200) {
            writeSuccResponse && writeSuccResponse(request.response);
        } else {
            writeErrMsg && writeErrMsg(status, request.response);
        }
    };
    request.send();
    
}

function getPeople(){
    tareaOut.value="getting started ...";

    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    setupHttpRequest(request);

    request.onload = function() {
        var status = request.status;
        if (status === 200) {
            writeSuccResponse && writeSuccResponse(request.response);
            var allPeople = request.response.results;
            // nacitanie uloh
            for(var i=0, len=allPeople.length; i<len; i++){
                addPersonToHtml(allPeople[i]);
                console.log(allPeople[i]);
            }
        } else {
            writeErrMsg && writeErrMsg(status, request.response);
        }
    };
    request.send();
}





function writeSuccResponse(response){
    console.log(response);
    tareaOut.value="SUCCESS. \n\nResponse:\n"+JSON.stringify(response);
}


function writeErrMsg(status, response){
    tareaOut.value="ERROR \nStatus:"+status+"\nResponse: "+response;
}


function setupHttpRequest(request) {
    request.responseType = responseType;
    request.setRequestHeader("X-Parse-Application-Id",back4appAppId);
    request.setRequestHeader("X-Parse-REST-API-Key",back4appApiKey);
} 