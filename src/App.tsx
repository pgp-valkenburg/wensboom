import React, { useCallback, useState } from "react";
import { Field } from "./components/Field";
import { Sky } from "./components/Sky";
import { Tree } from "./components/Tree";

const App = () => {
  const [counter, setCounter] = useState(0);
  const onClick = useCallback(() => {
    setCounter((count) => Math.min(1.0, count + 0.01));
  }, []);
  const onTestClick = useCallback(() => {
    setCounter((count) => Math.max(0.0, count - 0.02));
  }, []);

  return (
    <div>
      <h1>The Tree Project</h1>

      <Sky>
        <Field>
          <Tree growth={0.04 + counter * 0.96} />
        </Field>
      </Sky>
      <p>{Math.round(counter * 100)}% wensen in de boom!</p>

      <button onClick={onClick}>Make a wish</button>
      <button onClick={onTestClick}>Retract a wish</button>
    </div>
  );
};

export default App;
