const menu = document.querySelector("#menu");
const sidebar = document.querySelector("#sidebar");

const addnote = document.querySelector("#addnote");
const popup = document.querySelector("#popup");
const popupclose = document.querySelector("#popupclose")
const allnotes = document.querySelector("#allnotes")

menu.addEventListener("click", ()=>{
    sidebar.classList.toggle("hidden");
})

deleteallnotes = () => {
    while(allnotes.firstChild){
        allnotes.removeChild(allnotes.firstChild);
    }
}

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
            e.target.parentElement.parentElement.parentElement.parentElement.remove();
        };
    })



// ADD NOTE


const addnotesform = document.querySelector("#addnotesform");

const addnotetohtml = (title, note) => {

    allnotes.innerHTML += `
    
    <div class=" min-w-half max-w-lg flex-1 bg-primary rounded  p-8 noteelements ">
                        <li>
                            <div class=" mb-4 flex justify-between items-center">
                                <div class="flex items-center">
                                    <h3 class=" text-gray-600 text-2xl font-medium mr-3">${title}</h3>
                                    <button class="tobecrossedicon"><i data-feather="check-square" stroke-width="1" color="black" width="25" height="25" class=" cursor-pointer inline opacity-60 hover:opacity-90"></i> </button>
                                    <button class="crossedicon hidden"><i data-feather="x-square" stroke-width="1" color="black" width="25" height="25" class=" cursor-pointer inline opacity-60 hover:opacity-90"></i> </button>
                                </div>
                                <button class="deletenote"><i data-feather="trash" stroke-width="1" color="black" width="25" height="25" class="cursor-pointer inline opacity-60 hover:opacity-90"></i></button>
                            </div>    
                            <p>${note}</p>
                        </li>
                    </div>  

                    `
}

addnotesform.addEventListener('submit', e =>{
    e.preventDefault();
    const title = addnotesform.titlebox.value.trim();
    const note = addnotesform.note.value.trim();

    if(title.length || note.length){

        addnotetohtml(title, note)
        addnotesform.reset();
    }
    feather.replace();
    popup.classList.toggle("hidden")
    allnotes.classList.toggle("hidden")
})


// ADD NOTE POPUP


addnote.addEventListener("click" , () => {
    popup.classList.remove("hidden");
    popup.classList.add("flex");
    allnotes.classList.toggle("hidden");

});

popup.addEventListener('click', e=>{
    if(e.target.id === "popupclose" || e.target.classList.contains("feather-x")){
        popup.classList.remove(flex);
        popup.classList.toggle("hidden", true);
        allnotes.classList.toggle("hidden");
    };

    if(e.target.id === "popup"){
        popup.classList.remove("flex");
        popup.classList.toggle("hidden", true);
        allnotes.classList.toggle("hidden");
    };
})



// popupclose.addEventListener("click", () => {
//     popup.classList.add("hidden")
//     allnotes.classList.toggle("hidden")
// });

// addEventListener("keydown", e=>{
//     if(e.key=="Escape"){
//         popup.classList.add("hidden")
//         allnotes.classList.toggle("hidden")
//     }
// });

// popup.addEventListener("click", (e) =>{
//     if(e.target.id==="popup"){
//         popup.classList.add("hidden")
//         allnotes.classList.toggle("hidden")
//     }
// })




