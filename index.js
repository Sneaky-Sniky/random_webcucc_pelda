import createPost from "./post.js";

function openDialog() {
    document.getElementById('dialog').style.display = 'block';
}
window.openDialog = openDialog;

function closeDialog() {
    document.getElementById('dialog').style.display = 'none';
}
window.closeDialog = closeDialog;

function closeUserDialog() {
    document.getElementById('dialogUser').style.display = 'none';
}

window.closeUserDialog = closeUserDialog;

function loglog(){
    const button = document.getElementById("loginButton");
    const user = document.getElementById("us").value;
    const passv = document.getElementById("pass").value;
    if(button.innerText === "Login" && user === "luke" && passv === "force"){

        button.innerText = "Logout";

        document.getElementById("SearchDiv").style.display = "flex";
        document.getElementById("Messages").style.display = "block";

        document.getElementById("us").value = "";
        document.getElementById("pass").value = "";

        localStorage.setItem("username", user);
        localStorage.setItem("password", passv);
        
    }else if(button.innerText === "Logout"){
        button.innerText = "Login";
        
        localStorage.clear();
        document.getElementById("SearchDiv").style.display = "none";
        document.getElementById("Messages").style.display = "none";

    }else{
        alert("Username or password is incorrect");
        document.getElementById("us").value = "";
        document.getElementById("pass").value = "";
    }
}
window.loglog = loglog;

function visibility() {
    const passv2 = document.getElementById("pass");
    const type = passv2.type;
    if(type === "password"){
        passv2.setAttribute("type", "text");
        document.getElementById("eye").innerHTML="";
    }else{
        document.getElementById("eye").innerHTML="👁";
        passv2.setAttribute("type", "password");
    }
}
window.visibility = visibility;

function getPosts(){
    const keyWord = document.getElementById("searchText").value;
    document.getElementById("Messages").replaceChildren();
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => {
        const filteredPosts = json.filter(post=>post.title.includes(keyWord));
        filteredPosts.forEach(createPost);
    });
    localStorage.setItem("keyWord", keyWord);
}

window.getPosts = getPosts;



document.addEventListener("DOMContentLoaded", ()=> {
    document.getElementById("eye").addEventListener("click", visibility);
    const username = localStorage.getItem("username");
    const ps = localStorage.getItem("password");
    document.getElementById("us").value = username;
    document.getElementById("pass").value = ps;
    
    const key = localStorage.getItem("keyWord");
    document.getElementById("searchText").value = key;
    if(username){
        loglog();
    }
} )
