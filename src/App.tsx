import React from 'react';
import './App.scss';

const API_KEY = "fa555146006a08cf60f33c23067c8370";

class Search extends React.Component<{}, { value: string, assumption: Array<String>}> {
  constructor(props: any) {
    super(props);
    this.state = {value: '', assumption: []};
    this.handleChange = this.handleChange.bind(this);
    this.makeRequest = this.makeRequest.bind(this);
  }

  handleChange(event: any) {
    let newState = event.target.value;
    this.setState({value: newState});
    this.makeRequest(newState);
  }

  async makeRequest(query: string) {
    if(query != "") {
      let api_quiery = "https://api.themoviedb.org/3/search/movie?api_key=" +  API_KEY + "&language=en-US&query=" + query.replace(" ", "%20");
      let response = await fetch(api_quiery);
      let json = await response.json();
      let resTitles = []
      for (let i = 0; i < 4; i++) {
        resTitles.push(json.results[i].title);
      }
      this.setState({
        assumption: resTitles
      })
    } else {
      this.setState({
        assumption: ["", "", "", ""]
      });
    }
  }

  render() {
    return (
      <div className="App">
        <input type="text" className="main_input" onChange={this.handleChange}></input>
        <AssumeBox assumption={this.state.assumption}/>
      </div>
    );
  }
}

function Assumption(props: any) {
  return(
    <div className="assumption">
      <p>
        { props.text }
      </p>
    </div>
  );
}

function AssumeBox(props: any) {
  return (
    <div className="assume_box">
      <Assumption text={props.assumption[0]}/>
      <Assumption text={props.assumption[1]}/>
      <Assumption text={props.assumption[2]}/>
      <Assumption text={props.assumption[3]}/>
    </div>
  );
}

function App() {
  return (
      <Search />
  );
}

export default App;
