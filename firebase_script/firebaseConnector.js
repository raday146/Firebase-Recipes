class Firecast{
 
 // ADD YOUR SERVERLESS INFO 
    constructor(){
         this.firebaseConfig = {
            apiKey: "",
            authDomain: "",
            projectId: "",
            storageBucket: "",
            messagingSenderId: "",
            appId: "",
            measurementId: ""
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
