function createComment(comment, postDiv) {
    const postComment = document.createElement("div");
    postComment.classList.add("individualComment");

    const commentText = document.createElement("p");
    commentText.classList.add("individualCommentText");
    commentText.textContent = comment.body;

    const commentAuthor = document.createElement("p");
    commentAuthor.classList.add("individualCommentAuthor");

    commentAuthor.textContent = comment.email;


    postComment.appendChild(commentText);
    postComment.appendChild(commentAuthor);

    postDiv.appendChild(postComment);

    commentAuthor.addEventListener("click", ()=>{
        fetch(`https://jsonplaceholder.typicode.com/users?email=${comment.email}`)
        .then((response) => response.json())
        .then((json) => {
            let user = json[0];

            if(json.length === 0)
            {
                user ={
                    name:"not found",
                    username: "not found",
                    email:comment.email

                };
            }


            document.getElementById('dialogUser').style.display = 'block';
            document.getElementById('dialog-message-user').children[0].textContent = user.name;


        });
    });

}

export default createComment;