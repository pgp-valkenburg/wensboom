import React, { useCallback, useState } from "react";
import { Field } from "./components/Field";
import { Tree } from "./components/Tree";

const App = () => {
  const [counter, setCounter] = useState(0);
  const onClick = useCallback(() => {
    setCounter((count) => count + 1);
  }, []);

  return (
    <div>
      <h1>The Tree Project</h1>

      <Field>
        <Tree counter={counter} />
      </Field>
      <hr />

      <button onClick={onClick}>Make a wish</button>
    </div>
  );
};

export default App;
