
import { firestore } from "./firebase";
import Home from "./Home";
import Login from "./Login";
import AuthProvider from "./AuthProvider";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import Profile from "./Profile";

function App() {
   
  return (
    <Router>
      <AuthProvider>
      <Switch>
<Route path="/home">
  <Home />
</Route>
<Route path="/profile">
  <Profile/>
</Route>
<Route path="/">
  <Login />
</Route>
</Switch>
</AuthProvider>
    </Router>
  
  );
}


export default App;
