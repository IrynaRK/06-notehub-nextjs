
import {  getNotes } from "@/lib/api";




const Notes = async () => {
  const notes = await getNotes();
  console.log("notes", notes);

  return <div>Note page</div>
}
export default Notes;


