const menu = document.querySelector("#menu");
const sidebar = document.querySelector("#sidebar");

const addnote = document.querySelector("#addnote");
const popup = document.querySelector("#popup");
const popupclose = document.querySelector("#popupclose")
const allnotes = document.querySelector("#allnotes")

const search = document.querySelector("#search")



//   GENERAL FUCTIONS

menu.addEventListener("click", ()=>{
    sidebar.classList.toggle("hidden");
})

deleteallnotes = () => {
    while(allnotes.firstChild){
        allnotes.removeChild(allnotes.firstChild);
    }
}


// ADD NOTE POPUP


addnote.addEventListener("click" , () => {
    popup.classList.remove("hidden");
    popup.classList.add("flex");
    allnotes.classList.add("hidden");

});

popup.addEventListener('click', e=>{
    if(e.target.id === "popupclose" || e.target.classList.contains("feather-x")){
        popup.classList.remove("flex");
        popup.classList.toggle("hidden", true);
        allnotes.classList.remove("hidden");
      };

    if(e.target.id === "popup"){
        popup.classList.remove("flex");
        popup.classList.toggle("hidden", true);
        allnotes.classList.remove("hidden")
    };
})

// SEARCH NOTES

const showsearchtermonly = searchterm =>{

    const notetitles = document.querySelectorAll("#allnotes h3")
    Array.from(notetitles)
    .filter( todo => !todo.textContent.toLowerCase().includes(searchterm))
    .forEach( todo => todo.parentElement.parentElement.parentElement.parentElement.classList.add("hidden"))

    Array.from(notetitles)
    .filter( todo => todo.textContent.toLowerCase().includes(searchterm))
    .forEach( todo => todo.parentElement.parentElement.parentElement.parentElement.classList.remove("hidden"))
}

search.addEventListener('keyup', ()=> {
    const searchterm = search.value.trim().toLowerCase();
    showsearchtermonly(searchterm);
})

// ADD NOTE FUNCTIONS

    allnotes.addEventListener("click", (e)=> {
        if(e.target.classList.contains("feather-check-square") || e.target.classList.contains("tobecrossedicon")){
         
            e.target.parentElement.classList.toggle("hidden");
            e.target.parentElement.parentElement.children[2].classList.toggle("hidden")
            e.target.parentElement.parentElement.parentElement.parentElement.classList.add("line-through");
        }; 
        if(e.target.classList.contains("feather-x-square") || e.target.classList.contains("crossedicon")){
            e.target.parentElement.classList.toggle("hidden");
            e.target.parentElement.parentElement.children[1].classList.toggle("hidden")
            e.target.parentElement.parentElement.parentElement.parentElement.classList.remove("line-through");
        };        
        if(e.target.classList.contains("feather-trash") || e.target.classList.contains("deletenote")){
            const id= e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
            e.target.parentElement.parentElement.parentElement.parentElement.remove();
            db.collection('Notes').doc(id).delete().then(()=>{
                console.log('note deleted from firestore')
            })
        };
    })



// ADD NOTE


const addnotesform = document.querySelector("#addnotesform");

const addnotetohtml = (Notes, id) => {

    allnotes.innerHTML += `
    
    <div class=" w-screen md:w-auto  min-w-half max-w-lg flex-1 bg-primary rounded  p-8 noteelements ">
                        <li data-id="${id}">
                            <div class=" mb-4 flex justify-between items-center">
                                <div class="flex items-center">
                                    <h3 class=" text-gray-600 text-2xl font-medium mr-3">${Notes.Title}</h3>
                                    <button class="tobecrossedicon"><i data-feather="check-square" stroke-width="1" color="black" width="25" height="25" class=" cursor-pointer inline opacity-60 hover:opacity-90"></i> </button>
                                    <button class="crossedicon hidden"><i data-feather="x-square" stroke-width="1" color="black" width="25" height="25" class=" cursor-pointer inline opacity-60 hover:opacity-90"></i> </button>
                                </div>
                                <button class="deletenote"><i data-feather="trash" stroke-width="1" color="black" width="25" height="25" class="cursor-pointer inline opacity-60 hover:opacity-90"></i></button>
                            </div>    
                            <p>${Notes.notedata}</p>
                        </li>
                    </div>  

                    `
}

addnotesform.addEventListener('submit', e =>{
    e.preventDefault();
    const title = addnotesform.titlebox.value.trim();
    const note = addnotesform.note.value.trim();
    
    Notes = {
        Title: title,
        notedata: note 
    }

    if(title.length || note.length){
        db.collection('Notes').add(Notes).then(()=>{
            console.log('Note added to firestore')
        }) 
        addnotesform.reset();
    }
    feather.replace();
    popup.classList.toggle("hidden")
    allnotes.classList.remove("hidden")
    popup.classList.toggle("flex")
})




// CHANGE IN DATABASE FUNCTION


db.collection('Notes').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(element => {
        const doc = element.doc;
        console.log(element.type)
        if(element.type === 'added'){
            addnotetohtml(doc.data(), doc.id);
            feather.replace();
        }
        
    });
})