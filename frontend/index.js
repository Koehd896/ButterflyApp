document.addEventListener("DOMContentLoaded", getButterflies);

let currentUser = null;

function renderButterfly(butterfly) {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
        <img src="${butterfly.image}"></img>
        <h2>${butterfly.name}</h2>
        <div class="description-container">
            <p class="description-text">${butterfly.description}</p>
        </div>
        <form class="comment-form">
            <input type="hidden" name="butterflyId" value="${butterfly.id}">
            <input type="text" name="comment" placeholder="Comment..." >
            <input type="submit" name="submit" class="comment-submit" value="Comment">
        </form>
        <div class="comment-container">
        </div>
    `

    const btn = document.createElement("button");
    btn.classList.add("description-btn");
    btn.innerText = "Description"

    const descriptionContainer = div.querySelector("div.description-container");
    descriptionContainer.prepend(btn);
    const commentForm = div.querySelector("form")
    addCommentListener(commentForm)
    const container = document.getElementById("card-container");
    container.appendChild(div);
    addDescriptionListener(btn);
    butterfly.comments.forEach(comment => addComment(comment, container))

    
}

function addDescriptionListener(description) {
    description.addEventListener("click", function() {
        const text = this.nextElementSibling;
        if (text.style.display === "block") {
            text.style.display = "none"
        } else {
            text.style.display = "block"
        }
    })
}

function addCommentListener(form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        currentUser.comment(event)
    })
}

function newComment(event) {
    const butterflyId = event.target.butterflyId.value
    fetch(`http://localhost:3000/butterflies/${butterflyId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "text": event.target.comment.value,
            "user": currentUser
        })
    })
    .then(response => response.json())
    .then(comment => addComment(comment, event.target.parentNode))
    //fetch post call with text argument
    //post call returns new comment object
    //create new p in event.target and add comment text
}

function addComment(comment, card) {
    //adds comment in a p to card div
    const commentContainer = card.querySelector(".comment-container");
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment-div");
    commentDiv.id = comment.id
    // const editButton = document.createElement("button");
    // editButton.classList.add("edit-button");
    // editButton.innerText = "Edit"
    //add eventlistener for editButton
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn")
    deleteButton.innerText = "Delete"
    //add eventlistener for deleteButton
    const p = document.createElement('p');
    p.innerText = comment.text;
    p.classList.add("comment-text");
    const editForm = document.createElement("form")
    editForm.classList.add("edit-form");
    editForm.innerHTML = `
        <input type="text" name="comment-text" class="comment-text"></input>
        <input type="submit" value="Edit"></input>
    `
    commentDiv.append(p, editForm, deleteButton);
    commentContainer.appendChild(commentDiv);
    addEditListener(editForm);
    addDeleteListener(deleteButton);
}

function addEditListener(form) {
    const commentId = form.parentNode.id;
    const commentText = form.querySelector(".comment-text");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        currentUser.edit(commentId, commentText, form);
    })
}

function editComment(commentId, commentText, form) {
    fetch(`http://localhost:3000/comments/${commentId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "text": commentText.value,
            "user": currentUser
        })
    })
    .then(response => response.json())
    .then(comment => form.previousSibling.innerText = comment.text)
}

function addDeleteListener(button) {
    commentId = button.parentNode.id
    button.addEventListener("click", function() {
        currentUser.delete(button, commentId)
    })
}

function deleteComment(button, commentId) {
    fetch(`http://localhost:3000/comments/${commentId}`, {
        method: "DELETE"
    });
    button.parentNode.remove()
}

function getButterflies() {
    fetch("http://localhost:3000/butterflies")
        .then(res => res.json())
        .then(butterflies => butterflies.forEach(butterfly => renderButterfly(butterfly)))
}

const loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", event => {
    event.preventDefault()
    newUser(event.target.parentNode)
})

function newUser(form) {
    //conditional statement to determine what kind of user to create 
    //and what buttons to display
    switch (form.querySelector("#user-types").value) {
        case "user":
            const user = new User(form.name.value);
            currentUser = user;
            break;
        case "super-user":
            const superUser = new SuperUser(form.name.value);
            currentUser = superUser;
            document.querySelectorAll(".edit-form").forEach(form => form.style.display = "block");
            break;
        case "expert":
            const expert = new Expert(form.name.value);
            currentUser = expert;
            document.querySelectorAll(".delete-btn").forEach(btn => btn.style.display = "block");
            document.querySelectorAll(".edit-form").forEach(form => form.style.display = "block");
    }
    document.querySelectorAll(".comment-form").forEach(form => form.style.display = "block")
} 

class User {
    constructor(name) {
        this.name = name;
    }

    comment(event) {
        newComment(event)
    }
}

class SuperUser extends User {
    edit(commentId, commentText, form) {
        editComment(commentId, commentText, form)
    }

}

class Expert extends SuperUser {
    delete(button, commentId) {
        deleteComment(button, commentId)
    }
}

