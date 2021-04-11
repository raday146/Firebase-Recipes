class Firecast{
 
    constructor(){
         this.firebaseConfig = {
            apiKey: "AIzaSyDnivTF3vVIIe7TAbN73Xzg54rOK_D-uGo",
            authDomain: "js-project-2ae43.firebaseapp.com",
            projectId: "js-project-2ae43",
            storageBucket: "js-project-2ae43.appspot.com",
            messagingSenderId: "154149386417",
            appId: "1:154149386417:web:2f05286645ae7012010a90",
            measurementId: "G-8RZE703PSW"
          };
          firebase.initializeApp(this.firebaseConfig);
          this.db = firebase.firestore();
    }

    unSub(docRef){
        this.db.collection(docRef).onSnapshot(snapshot =>{
        snapshot.docChanges().forEach(element => {
            const doc = element.doc;
            if(element.type ==='added'){
                addRecipes(doc.data(), doc.id);
            }else if(element.type ==='removed'){
                deleteRecipe(doc.id);
            }
 
       });
     });
    }

    addRec(ref, recipe){
        this.db.collection(ref).add(recipe).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
    delRec(docRef, id){
        this.db.collection(docRef).doc(id).delete().then(() =>{
            console.log("recipe deleted");
         });
    }

}