
// globalne premenne
var tareaOut = document.getElementById("tareaResponse");
const back4appAppId = "frsqRdf8vciVikI8TekbiZ8WhGkaNJWlyNXZjFyz";
const back4appApiKey = "HnuLl3TbMCkNg93WtU8Nrz4w1lNR6ebWfKsPmR0l";
const url="https://parseapi.back4app.com/classes/PeopleList/";
const responseType = 'json';

var peopleList = [];

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
    request.open('PUT', url+perId+perName+perAge+perSex, true);
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
                // addPersonToHtml(allPeople[i]);
                console.log(allPeople[i]);
            }
        } else {
            writeErrMsg && writeErrMsg(status, request.response);
        }
    };
    request.send();
}

// function addPersonToHtml(newPerson){
//     while(newPerson.objectId>maxId){
//         maxId++;
//     }

//     // var newPerElm = document.createElement("button");

//     newPerElm.innerHTML = newPerson.task;
//     newPerElm.classList.add("taskAsBt");

//     if(newTask.isDone){
//         newTaskElm.classList.add("completedTask");
//     }
//     else{
//         newTaskElm.classList.add("activeTask");
//     }    

//     newTaskElm.setAttribute("type","button");
//     newTaskElm.setAttribute("data-id",newTask.objectId);

//     newTaskElm.addEventListener("click",
//         function(){
//             newTaskElm.classList.toggle("completedTask");
//             newTaskElm.classList.toggle("activeTask");
//             newTask.isDone = !newTask.isDone;
//             editTask(newTask);
//         }
//     ); 
//     document.getElementById("frmTasks").appendChild(newTaskElm);
// }





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