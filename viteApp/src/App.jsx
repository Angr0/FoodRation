import { Button } from "@mui/joy";
import style from "../styles/App.module.scss";

function App() {
  return (
    <div className={style.container}>
      <Button color="primary" variant="outlined">
        Hello world
      </Button>
    </div>
  );
}

export default App;
