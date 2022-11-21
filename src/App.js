import Form from "./components/Form";
import Todo from "./components/Todo";
import Footer from "./components/Footer";

export default function App({ tasks }) {
  return (
    <>
      <h1>TODO</h1>
      <span className="visually-hidden">
        <button>switch to dark mode</button>
      </span>
      <Form />
      <Todo tasks={tasks} />
      <Footer />
    </>
  );
}
