import React, { useCallback, useState } from "react";
import { Field } from "./components/Field";
import { Note } from "./components/Note";
import { Sky } from "./components/Sky";
import { Tree } from "./components/Tree";

const App = () => {
  const [counter, setCounter] = useState(0);
  const onSubmit = useCallback((contents: string) => {
    console.log(contents);
    setCounter((count) => Math.min(1.0, count + 0.01));
  }, []);

  return (
    <div>
      <Sky>
        <Field>
          <Tree growth={0.04 + counter * 0.96} />
        </Field>
      </Sky>
      <p>{Math.round(counter * 100)}% wensen in de boom!</p>

      <Note onSubmit={onSubmit} />
    </div>
  );
};

export default App;
