
const list = document.querySelector('ul');
const form = document.querySelector('form');
const button = document.querySelector('.unsubBtn');
const section = document.querySelector('section');

const addRecipes = (recipe, id) =>{
    let time = recipe.created.toDate();
    let html = `<li data-id="${id}">
    <div>${recipe.title}</div>
    <div>${time}</div>
    <button class="btn btn-danger btn-sm my-2">Delete</button>
    </li>
    `;
    list.innerHTML += html;
}

const deleteRecipe = (id) =>{

    const recipes = document.querySelectorAll('li');
    recipes.forEach(recipe =>{
        if(recipe.getAttribute('data-id')===id){
            recipe.remove();
        }
    });
};
const unSub = db.collection('recipes').onSnapshot(snapshot =>{
    snapshot.forEach(element => {
        const doc = element.doc;
        if(element.type ==='added'){
            addRecipes(doc.data(), doc.id);
        }else if(element.type ==='removed'){
            deleteRecipe(doc.id);
        }
    });
});
/* 
db.collection("recipes").get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
        console.log(doc.data());
       addRecipes(doc.data(), doc.id);
    });
}).catch((error) => {
    console.log(error);
});
*/
form.addEventListener('submit',e => {
    e.preventDefault();
    const now = new Date();
    const recipe = {
        title:form.recipe.value,
        created: firebase.firestore.Timestamp.fromDate(now)
    };
   
   // Add a second document with a generated ID.
db.collection("recipes").add(recipe).then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});
form.reset();
});


list.addEventListener('click', e => {
 if(e.target.tagName == 'BUTTON'){
     const id = e.target.parentElement.getAttribute('data-id');
     console.log(id);
     db.collection('recipes').doc(id).delete().then(() =>{
        console.log("recipe deleted");
     });
 }
 
});
button.addEventListener('click', () =>{

    unSub();
    console.log('Unsubscribed form is on');
});