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


    // const img = document.createElement("img");
    // img.setAttribute("src", butterfly.image);

    // const h2 = document.createElement("h2");
    // h2.innerHTML = butterfly.name;

    // const pDiv = document.createElement("div")
    // const p = document.createElement("p");
    // p.innerHTML = butterfly.description;
    


    // pDiv.appendChild(p);
    // pDiv.classList.add("description")
    // div.append(img, h2, descriptionButton, pDiv);

    const container = document.getElementById("card-container");
    container.appendChild(div);
    addDescriptionListener(btn);

    
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
    deleteButton.classList.add("delete-button")
    deleteButton.innerText = "Delete"
    //add eventlistener for deleteButton
    const p = document.createElement('p');
    p.innerText = comment.text;
    p.classList.add("comment-text");
    const editForm = document.createElement("form")
    editForm.innerHTML = `
        <input type="text" name="comment-text"></input>
        <input type="submit" value="Edit"></input>
    `
    commentDiv.append(p, editForm, editButton, deleteButton);
    commentContainer.appendChild(commentDiv);
}

function addEditListener(button) {
    button.addEventListener("click", )
}

function addDeleteListener(button) {
    
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
    //create new user js object, set as currentUser
    const user = new User(form.name.value);
    currentUser = user;
    //show add comment button for butterflies
    document.querySelectorAll(".comment-form").forEach(form => form.style.display = "block")
    //eventually show other options based on the kind of user
} 

class User {
    constructor(name) {
        this.name = name;
    }

    comment(event) {
        newComment(event)
    }
}

