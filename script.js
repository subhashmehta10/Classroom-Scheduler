document.addEventListener("DOMContentLoaded", showNotes);
const title = document.querySelector("#title");
const textArea = document.querySelector("#note-text");
const subText = document.querySelector("#sub-text");
const button = document.querySelector(".note-btn");

button.addEventListener("click", function (e) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: title.value,
        textArea: textArea.value,
        subText: subText.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    textArea.value = '';
    subText.value = '';
    title.value = '';
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = '';
    notesObj.forEach(function (element, index) {
        html += `
        <div class="card">
            <h2>${element.textArea}</h2>
            <p>${element.title}</p>
            <p>${element.subText}</p>
            <button onClick="deleteNote(${index})" class="deleteBtn">Delete Note</button>
        </div>`;
    });

    let insertNotes = document.getElementById("notes");
    if (notesObj.length == 0) {
        insertNotes.innerHTML = `Nothing to show! Please click on "Schedule Batch" button to add a new class.`;
        insertNotes.style.color = "gray";
        insertNotes.style.paddingTop = "10px";
        insertNotes.style.fontSize = "15px";
    } else {
        insertNotes.innerHTML = html;
    }
}

function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", function () {
    let inputVal = searchTxt.value.toLowerCase();
    let cards = document.getElementsByClassName("card");
    Array.from(cards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('h2')[0].innerHTML.toLowerCase();
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});
