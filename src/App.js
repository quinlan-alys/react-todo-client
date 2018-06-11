import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            items: []
        }

        this.inputChange = this.inputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('/tasks')
            .then(res => res.json())
            .then(items => {
                this.setState({ items })
            });
    }

    handleSubmit() {
      var params = { name: this.state.input };
      fetch('/tasks', {
              method: 'POST',
              body: JSON.stringify(params),

              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
          })
          .then(response => response.json())
          .then(response => {
              this.setState({ items: response,
              input: '' })
          })
  }

    inputChange(event) {
        this.setState({ input: event.target.value });
    }

    render() {
        return ( 
        <div className = "App">
            <h1> To do list: </h1><br/>
            <input type = "text"
                value = { this.state.input }
                ref = "text"
                name = "todo"
                onChange = { this.inputChange }
                placeholder = "Enter your task" />
                <br/>
            <input type = "submit"
                value = "Submit"
                onClick = { this.handleSubmit }/>   />  
            <ul> 
            {
            this.state.items.map(item =>
                <div key = { item.id }> <li> { item.name } </li></div> )
                }   
            </ul>
        </div>
        );
    }
}

export default App;