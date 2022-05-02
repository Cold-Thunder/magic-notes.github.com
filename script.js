
let addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", () => {
    let addTxt = document.querySelector(".addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }

    noteObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    addTxt.value = " ";
    console.log(noteObj);
    showNotes();
})

//fucntion to show notes from local storage

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    let html = "";
    noteObj.forEach(function (element, index) {
        html += `
        <div class="noteCard note">
        <h5 class="card-title">Note ${index + 1}</h5><hr>
        <p class="card-text">${element}</p>
        <button id="${index}" onclick="deleteNotes(this.id)" class="delete">Delete Note</button>
        </div>
        `;
    })
    let notesElm = document.querySelector("#notes");
    if (noteObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add Note" to add notes.`;
    }
}

// function to delete note


function deleteNotes(index) {

    let del = confirm("Do you want to delete the note?");

    if (del == true) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            noteObj = [];
        }
        else {
            noteObj = JSON.parse(notes);
        }

        noteObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(noteObj));
        showNotes();

        return true;
    }

    else {
        return false;
    }

}




// for search

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();

    let noteCards = document.querySelector(".noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;

        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})
