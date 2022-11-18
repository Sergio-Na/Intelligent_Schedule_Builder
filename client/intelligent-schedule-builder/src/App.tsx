import TermSchedule from "./components/TermSchedule";
import AddTermToBoardModal from "./components/AddTermToBoard";
import useCourseModal from "./hooks/useCourseModal";
import "./App.css";

function App() {
  const { isOpen, toggle } = useCourseModal();
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="text-3xl font-bold underline">Fall Term</th>
            <th>Winter Term</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
            <button onClick={toggle}>Open Modal </button>
            <AddTermToBoardModal isOpen={isOpen} toggle={toggle}/>
            </td>
            <td>
            <button onClick={toggle}>Open Modal </button>
            <AddTermToBoardModal isOpen={isOpen} toggle={toggle}/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
