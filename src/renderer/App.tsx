import { CssBaseline } from "@mui/material";
import MainWindow from "./components/main-window";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <MainWindow />
    </Provider>
  );
}

export default App;
