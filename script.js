let myLibrary = [];

class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
        
    }
}

const addBookBtn = document.querySelector("#add-new-book");
const submitBtn = document.querySelector("#form-submit");
const form = document.querySelector("form");
const startText = document.querySelector("#initial-text");
const table = document.querySelector("#table");
const removeAllBtn = document.querySelector("#remove-all-btn");

addBookBtn.addEventListener("click", () => {
    addBookBtn.style.visibility = "hidden";  
    form.style.visibility = "visible";  
})

form.addEventListener('submit', submitBook);

function submitBook() {
    let title = document.querySelector("#book-title").value;
    let author = document.querySelector("#book-author").value;
    let pages = document.querySelector("#book-pages").value;
    let readStatus = getReadStatus(); 

    if (isNaN(pages)) {
        alert("Pages needs to be a number!");
    } else {
        addBookToLibrary(title, author, pages, readStatus);
        startText.style.visibility = "hidden";
        updateTable(myLibrary);
        form.reset();                                //reset form after submit
    }
                                        

    if (myLibrary.length > 2) {
        removeAllBtn.style.visibility = "visible";
    }
}

// submitBtn.addEventListener("click", () => {
//     let title = document.querySelector("#book-title").value;
//     let author = document.querySelector("#book-author").value;
//     let pages = document.querySelector("#book-pages").value;
//     let readStatus = getReadStatus(); 

//     if (isNaN(pages)) {
//         alert("Pages needs to be a number!");
//     } else {
//         addBookToLibrary(title, author, pages, readStatus);
//         startText.style.visibility = "hidden";
//         updateTable(myLibrary);
//         form.reset();                                //reset form after submit
//     }
                                        

//     if (myLibrary.length > 2) {
//         removeAllBtn.style.visibility = "visible";
//     }
    
// })

function addBookToLibrary(title, author, pages, readStatus) {
    let newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
}

function getReadStatus() {
    if (document.querySelector("#read-yes").checked) {
        return "read";
    } else {
        return "unread";
    }
}

function updateTable() {    
    let addedRows = document.querySelectorAll(".added").forEach(function(a){
        a.remove()
        });
    
    for (let i = 0; i < myLibrary.length; i++) {  
        let book = myLibrary[i];       
        let newRow = table.insertRow(-1);
        newRow.setAttribute("class", "added");

        let bookProps = Object.keys(book);  
       
            for (let j = 0; j < bookProps.length; j++) {   
                let cell = newRow.insertCell(j);            
                cell.textContent = book[bookProps[j]] 
                    if (bookProps[j] === "readStatus") {
                        cell.classList.add(book[bookProps[j]]);  
                    } else {
                        cell.classList.add("book-info");
                    }                    
            }  
        addRemoveBtn(newRow, book);
        addToggleReadStatus(newRow, book);        
    }       
}

function addRemoveBtn(newRow, book) {
    let btnCell = newRow.insertCell(4);
    const rmBtn = document.createElement("button");
    rmBtn.classList.add("remove");
    rmBtn.textContent = "Remove";
    btnCell.appendChild(rmBtn);
    rmBtn.addEventListener("click", () => {
    removeBook(myLibrary.indexOf(book)); 
    }); 
}

function addToggleReadStatus(newRow, book) {
    let btnCell = newRow.insertCell(-1);
    const toggleBtn = document.createElement("button");
    toggleBtn.classList.add("toggle-read");

        if (book.readStatus === "read") {
            toggleBtn.textContent = "Mark unread";
        } else {
            toggleBtn.textContent = "Mark read"; 
        }        
    
    btnCell.appendChild(toggleBtn);
    toggleBtn.addEventListener("click", () => {       
        if (book.readStatus === "read") {
            book.readStatus = "unread"
           } else {
            book.readStatus = "read"
        }          
        updateTable();
    }); 
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    updateTable();
}

removeAllBtn.addEventListener("click", () => {
    myLibrary = [];
    updateTable();
    startText.style.visibility = "visible";
    removeAllBtn.style.visibility = "hidden";
})
