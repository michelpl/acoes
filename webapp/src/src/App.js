import './App.css';
import Form from "./components/Form";
import Card from "./components/Card";

function App() {
  return (
    <div className="App">
        <div className="wrapper">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
        <div className="wrapper">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
    </div>
  );
}

export default App;
