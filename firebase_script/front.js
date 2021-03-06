const list = document.querySelector('.list');
const form = document.querySelector('form');
const button = document.querySelector('.unsubBtn');
const nav = document.querySelector('.ham-menu');
const navList = document.querySelector('.nav2');

const firecast = new Firecast();

const addRecipes = (recipe, id) =>{
  //  let time = recipe.created.toDate();
    const when = dateFns.distanceInWordsToNow(
        recipe.created.toDate(),
        {addSuffix: true}
    );
    console.log(when);
    let html = `
    <div class='rep my-3' data-id="${id}">
      <li data-id="${id}">
        <div>${recipe.title}</div>
        <div>${when}</div>
        <button class="btn btn-danger btn-sm my-2">Delete</button>
      </li>
    </div>
    `;
    console.log(document.querySelectorAll('.rep').length);
    if(document.querySelectorAll('.rep').length ===0){
        list.textContent = ``;
    }
    list.innerHTML += html;
    scrollBy(0,120);
}

const deleteRecipe = (id) =>{
    const recipes = document.querySelectorAll('.rep');
    recipes.forEach(recipe =>{
        if(recipe.getAttribute('data-id')===id){
            recipe.remove();
        }
    });
    console.log(document.querySelectorAll('.rep').length);
    if(document.querySelectorAll('.rep').length === 0){
        list.textContent = `The recipe list is empty, it's time to fill it.`;
    }
};

firecast.unSub('recipes');
setTimeout(() => checkList(),500);

form.addEventListener('submit',e => {
    e.preventDefault();
    const now = new Date();
    const recipe = {
        title:form.recipe.value,
        created: firebase.firestore.Timestamp.fromDate(now)
    };
   
   // Add a second document with a generated ID.
   firecast.addRec('recipes',recipe);

   form.reset();
});

list.addEventListener('click', e => {
    if(e.target.tagName ==='BUTTON'){
        const id = e.target.parentElement.getAttribute('data-id');
        console.log(id);
        firecast.delRec('recipes',id);
    }    
});

function checkList(){
    if(document.querySelectorAll('.rep').length === 0){
        list.textContent = `The recipes list is empty, it's time to fill it.`;
    }else{
        list.textContent = ``;
    }
}

const toggleNav = () =>{
    navList.classList.toggle('pop-nav-list');

};
nav.addEventListener('click', () =>{
    toggleNav();
});
navList.addEventListener('click', e =>{
    const tabs = document.querySelector('.exmp-recipe');    
    Array.from(tabs.children).forEach(tab => {
            tab.classList.remove('active');
    });
    const tab = tabs.querySelectorAll(`#${e.target.textContent}`);
    console.log(tab.children);
    tab.forEach(t =>{
        t.classList.add('active');
    });
    toggleNav();
    setTimeout(() => scrollBy(0, window.screenY +window.screenX), 500);
    //scrollBy(0,window.screenY +100);
    //tabs.classList.remove('active');

    
});