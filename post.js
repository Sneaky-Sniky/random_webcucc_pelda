import createComment from "./comment.js";

function createPost(post) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("individualPost");

    const postTitle = document.createElement("h3");
    postTitle.classList.add("individualPostTitle");

    const postText = document.createElement("p");
    postText.classList.add("individualPostText");

    const postAuthor = document.createElement("p");
    postAuthor.classList.add("individualPostAuthor");


    postTitle.textContent = post.title;
    postText.textContent = post.body;
    fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
    .then((response) => response.json())
    .then((json) => {
        postAuthor.textContent = json.name;
    });

    const postButton = document.createElement("button");
    postButton.classList.add("individualPostButton");
    postButton.textContent = "Show Comments";

    postDiv.appendChild(postTitle);
    postDiv.appendChild(postText);
    postDiv.appendChild(postAuthor);
    postDiv.appendChild(postButton);

    const allComments = document.createElement("div");
    allComments.classList.add("postComments");
    postDiv.appendChild(allComments);

    document.getElementById("Messages").appendChild(postDiv);

    postButton.addEventListener("click", ()=>{
        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        .then((response) => response.json())
        .then((json) => {
            if(postButton.textContent === "Show Comments"){
                postButton.textContent = "Hide Comments";
                json.forEach((comment)=>createComment(comment, allComments));
                localStorage.setItem(`post/${post.id}`, true);
            }else{
                postButton.textContent = "Show Comments";
                allComments.replaceChildren();
                localStorage.removeItem(`post/${post.id}`);
            }
            
        });
    })

    const shown = localStorage.getItem(`post/${post.id}`);
    if(shown){
        postButton.click();
    }

}

export default createPost;