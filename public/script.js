
const menu = document.querySelector("#menu");
const sidebar = document.querySelector("#sidebar");


menu.addEventListener("click", ()=>{
    sidebar.classList.toggle("hidden")
})


// ADD NOTE POPUP

const addnote = document.querySelector("#addnote");
const popup = document.querySelector("#popup");
const popupclose = document.querySelector("#popupclose")
const allnotes = document.querySelector("#allnotes")

deleteallnotes = () => {
    while(allnotes.firstChild){
        allnotes.removeChild(allnotes.firstChild);
    }
}

addnote.addEventListener("click" , () => {
    popup.classList.toggle("hidden")
    popup.classList.toggle("flex")
    allnotes.classList.toggle("hidden")
});

popupclose.addEventListener("click", () => {
    popup.classList.add("hidden")
    popup.classList.toggle("flex")
    allnotes.classList.toggle("hidden")
});

addEventListener("keydown", e=>{
    if(e.key=="Escape"){
        popup.classList.add("hidden")
        popup.classList.toggle("flex")
        allnotes.classList.toggle("hidden")
    }
})

popup.addEventListener("click", (e) =>{
    if(e.target.id==="popup"){
        popup.classList.add("hidden")
        popup.classList.toggle("flex")
        allnotes.classList.toggle("hidden")
    }
})


const noteelements = document.querySelectorAll(".noteelements");
const crossedicon = document.querySelector("#crossedicon");
const tobecrossedicon = document.querySelector("#tobecrossedicon");


noteelements.forEach(noteelement => {
    noteelement.addEventListener("click", (e)=> {
        console.log(e.target.firstChild);
        if(e.target.classList.contains("feather-check-square") || e.target.id === "tobecrossedicon" ){
            crossedicon.classList.toggle("hidden")
            tobecrossedicon.classList.toggle("hidden")
            noteelement.classList.add("line-through")
        }; 
        if(e.target.classList.contains("feather-x-square") || e.target.id === "crossedicon" ){
            crossedicon.classList.toggle("hidden")
            tobecrossedicon.classList.toggle("hidden")
            noteelement.classList.remove("line-through")
        };        
        if(e.target.classList.contains("feather-trash") || e.target.firstChild.classList.contains("feather-trash")){
            noteelement.remove();
        };
    })
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
                                    <button id="tobecrossedicon" class=""><i data-feather="check-square" stroke-width="1" color="black" width="25" height="25" class=" cursor-pointer inline opacity-60 hover:opacity-90"></i> </button>
                                    <button id="crossedicon" class="hidden"><i data-feather="x-square" stroke-width="1" color="black" width="25" height="25" class=" cursor-pointer inline opacity-60 hover:opacity-90"></i> </button>
                                </div>
                                <button><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash ml-8 cursor-pointer inline opacity-60 hover:opacity-90" color="black"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
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
    }
    popup.classList.add("hidden")
    popup.classList.toggle("flex")
    allnotes.classList.toggle("hidden")
})
