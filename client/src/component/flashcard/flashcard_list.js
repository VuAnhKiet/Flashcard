import Flashcard from "./flashcard";
function Flashcardlist ({flashcards}){  
    return(
      <div className="flashcards">
        {flashcards.map(
          (flashcard,key) => {
            return <Flashcard key={flashcard.id} card={flashcard}/>;}
        )
        }
        </div>
    )
  }
  
  export default Flashcardlist;