import { useState } from "react";
import Button from "./components/Button";
import Connect from "./components/Connect";
import Alert from "./components/Alert";
/*import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";*/

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <div>
      <Connect />
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>
          Hello <b>World</b>
        </Alert>
      )}
      <Button color="success" onClick={() => setAlertVisibility(true)}>
        Show Alert!
      </Button>
    </div>
  );
}

export default App;
