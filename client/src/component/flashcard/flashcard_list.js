import Flashcard from "./flashcard";
function Flashcardlist ({flashcards,del,edit,setlistcards}){  
    return(
      <div className="flashcards">
        {flashcards.map(
          (flashcard,key) => {
            return <Flashcard key={flashcard.id} card={flashcard} del={del} edit={edit} />;}
        )
        }
        </div>
    )
  }
  
  export default Flashcardlist;