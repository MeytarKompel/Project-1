function saveNote(){
    const existingNote = getAllNotesFromStorage();
    const newNote = parseNoteFormDetails();
    if(!newNote){
    alert("Missing details in the Note");
    event.preventDefault();
        return;
    }
    existingNote.push(newNote);
    saveNotesArrayToStorage(existingNote);
    displayNotesFromStorage();
}


function getAllNotesFromStorage(){
    const currentJsonArray= localStorage.getItem("allNotes");
    let existingNote= JSON.parse(currentJsonArray);
    if(!existingNote){
        existingNote= [];
    }
    return existingNote;
}

function saveNotesArrayToStorage(existingNote){
    const updatedJsonArray= JSON.stringify(existingNote);
    if(!existingNote){
        event.preventDefault();
        return;
    } else {
    localStorage.setItem("allNotes", updatedJsonArray);
    }
}



function displayEroor(){
    const noteBox= document.getElementById("noteBox");
    const dateBox= document.getElementById("dateBox");
    const timeBox= document.getElementById("timeBox");
}

function parseNoteFormDetails(){

    const isValid= isNoteValid();

    if(!isValid){
        displayEroor();
        return;
    }

    const noteBox= document.getElementById("noteBox");
    const noteBoxValue= noteBox.value;
    const dateBox= document.getElementById("dateBox");
    const dateBoxValue= dateBox.value;
    const timeBox= document.getElementById("timeBox");
    const timeBoxValue= timeBox.value;

        return{
            noteInfo: noteBoxValue,
            date: dateBoxValue,
            time: timeBoxValue,
        };
    }

function isNoteValid(){
    const noteBox= document.getElementById("noteBox");
    const noteBoxValue= noteBox.value;
    const dateBox= document.getElementById("dateBox");
    const dateBoxValue= dateBox.value;
    const timeBox= document.getElementById("timeBox");
    const timeBoxValue= timeBox.value;

    if((noteBoxValue=== "") || (dateBoxValue=== "") || (timeBoxValue=== "")){
        return ;
    }

    let validNote= {
        noteInfo: noteBoxValue,
            date: dateBoxValue,
            time: timeBoxValue,
    };

    return validNote;
}


    function displayNotesFromStorage(){
        const existingNote = getAllNotesFromStorage();
        console.log(existingNote)
        for(let i = 0 ; i < existingNote.length ; i ++){
            addNoteToElement(existingNote[i]);
        }
    }


    function addNoteToElement(noteObject){
        const index = findMyIndex(noteObject);
        console.log(index);
        console.log(noteObject);

        const noteContainer= document.querySelector(".notesContainer")

        const noteEl = document.createElement('div');
        noteEl.setAttribute('id', `note-${index}`);
        noteEl.setAttribute('class', `noteDetail`)

        
        const getNoteData= document.createElement('textarea');
        const getDate= document.createElement('p');
        const getTime= document.createElement('p');

        getNoteData.setAttribute('class', `dataDesign`);
        getDate.setAttribute('class', `dateDesign`);
        getTime.setAttribute('class', `timeDesign`);
        const delBtn= document.createElement('span');
        const deleteNoteButton= document.createElement('button');
        deleteNoteButton.appendChild(delBtn);
        // deleteNoteButton.innerText = 'X';
        noteEl.appendChild(deleteNoteButton);
        deleteNoteButton.setAttribute('onclick', `deleteNote(${index})`);
        deleteNoteButton.setAttribute('class', `deleteButton`);
        delBtn.setAttribute('class', `glyphicon glyphicon-remove`)
    



        getNoteData.innerText= noteObject.noteInfo;
        getDate.innerText= noteObject.date.split('-').reverse().join('/');
        getTime.innerText= noteObject.time;

        noteEl.appendChild(getNoteData);
        noteEl.appendChild(getDate);
        noteEl.appendChild(getTime);

        noteContainer.appendChild(noteEl);






    }


    function findMyIndex(obj) {
        const myNotes = JSON.parse(localStorage.getItem('allNotes'))
    
        let index = myNotes.length;
    
        for (let i = 0; i < myNotes.length; i++) {
            if ((obj.time === myNotes[i].time) && (obj.date === myNotes[i].date)) {
                index = i;
            }
        }
    
        return index;
    
    }

    function deleteNote(index){
        const existingNote= JSON.parse(localStorage.getItem("allNotes"));
        existingNote.splice(index,1);
        localStorage.setItem("allNotes", JSON.stringify(existingNote));


        const noteToRemove= document.getElementById(`note-${index}`);
        noteToRemove.remove();
    }
