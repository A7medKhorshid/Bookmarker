var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteUrl");
var submit = document.getElementById("submit");
var data;



// validation
function nameValidation() {
    var regex = /^[A-Z][a-z]{3,20}[0-9]*$/

    if (regex.test(siteName.value) == true) {
        document.getElementById("nameAlert").classList.replace("d-block", "d-none");
        return true;
    }

    document.getElementById("nameAlert").classList.replace("d-none", "d-block");
    return false;
}

function urlValidation() {
    var regex = /^(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/

    if (regex.test(siteURL.value) == true) {
        document.getElementById("urlAlert").classList.replace("d-block", "d-none");
        return true;
    }

    document.getElementById("urlAlert").classList.replace("d-none", "d-block");
    return false;
}


if (localStorage.site != null) {
    data = JSON.parse(localStorage.site)
}
else {
    data = [];
}



// create
submit.onclick = function getData() {

    if (nameValidation() == true && urlValidation() == true) {
        var siteDet = {
            name: siteName.value,
            url: siteURL.value,
        }
    
        data.push(siteDet);
        localStorage.setItem('site', JSON.stringify(data));
        clearInput();
        display();
    }
}

// clear
function clearInput() {
    siteName.value = "";
    siteURL.value = "";
}

// display
function display() {
    var table = "";
    for (var i = 0; i < data.length; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${data[i].name}</td>
            <td><a class="btn btn-primary visit" href="https://${data[i].url}" target="_blank"><i class="fa-solid fa-eye"></i> Visit</a></td>
            <td><button class="btn btn-primary delete" onclick="deleteData(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>
        `
    }

    document.getElementById("tbody").innerHTML = table;
}
display();


// delete
function deleteData (i){
    data.splice(i, 1);
    localStorage.site = JSON.stringify(data);
    display();
}

/* function openLink(i) {
    window.open("https//" + data[i].url);
} */








