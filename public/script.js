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
    popup.classList.remove("hidden")
    allnotes.classList.toggle("hidden")
});

popupclose.addEventListener("click", () => {
    popup.classList.add("hidden")
    allnotes.classList.toggle("hidden")
});

addEventListener("keydown", e=>{
    if(e.key=="Escape"){
        popup.classList.add("hidden")
        allnotes.classList.toggle("hidden")
    }
})

popup.addEventListener("click", (e) =>{
    if(e.target.id==="popup"){
        popup.classList.add("hidden")
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
