import { ChangeEvent, useCallback, useState } from "react";

export const LoginPanel: React.VFC<{
  onLogin: (userName: string, password: string) => void;
}> = ({ onLogin }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUserName(event.target.value);
    },
    []
  );

  const onPasswordInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );
  return (
    <div>
      <p>Please login:</p>
      <input type="text" placeholder="username" onChange={onUsernameInput} />
      <input
        type="password"
        placeholder="password"
        onChange={onPasswordInput}
      />
      <button onClick={() => onLogin(userName, password)}>Login</button>
    </div>
  );
};
