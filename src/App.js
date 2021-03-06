import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema, DOMParser } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import { exampleSetup } from "prosemirror-example-setup";

const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks,
});

const view = new EditorView(document.createElement("div"), {
  state: EditorState.create({
    doc: DOMParser.fromSchema(mySchema).parse(
      document.querySelector("#content")
    ),
    plugins: exampleSetup({ schema: mySchema }),
  }),
});

window.view = view;

function App() {
  return (
    <div className="App">
      <div
        ref={(ref) => {
          ref.appendChild(view.dom);
          setTimeout(() => {
            view.dom.focus();
            document.querySelector(
              "#content"
            ).textContent = `Focused: ${view.hasFocus()}`;
          }, 100);
          document.querySelector(
            "#content"
          ).textContent = `Focused: ${view.hasFocus()}`;
        }}
      />
    </div>
  );
}

export default App;
