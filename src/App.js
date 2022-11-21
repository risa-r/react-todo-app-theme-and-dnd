import Form from "./components/Form";
import Todo from "./components/Todo";
import Footer from "./components/Footer";

export default function App({ tasks }) {
  return (
    <>
      <h1>TODO</h1>
      <button>switch to dark mode</button>
      <Form />
      <Todo tasks={tasks} />
      <Footer />
    </>
  );
}
