import { Provider } from "react-redux";
import "./App.css";
import Layout from "./Layout";
import UserContextWrapper from "./state/context/user-context";
import { store } from "./state/redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <UserContextWrapper>
          <Layout />
        </UserContextWrapper>
      </Provider>
    </>
  );
}

export default App;
