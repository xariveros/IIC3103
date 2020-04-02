import React, { Component } from "react";
import { Link } from "react-router-dom";
import InfoLocation from "./InfoLocation";

class InfoChar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lugares1: this.props.lugares,
      origen1: this.props.origen,
      caps1: this.props.caps,
      info_chars: []
    };
  }
  componentDidMount() {
    for (let index = 0; index < this.props.caps.length; index++) {
      //var n = index.toString()
      fetch(this.props.caps[index])
        .then(res => res.json())
        .then(data1 => {
          this.setState({ info_chars: this.state.info_chars.concat(data1) });
          //console.log(this.state.info_chars[index].name)
        });
    }
  }

  render() {
    return (
      <div>
        <h1>Lugares:</h1>
        <InfoLocation url={this.state.lugares1.url} />

        <h1>Origen:</h1>
        <InfoLocation url={this.state.origen1.url} />

        <h1>Aparece en:</h1>
        {this.state.info_chars.map(info1 => (
          <div>
            <Link to={"/" + info1.id}>
              <li>{info1.name}</li>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default InfoChar;
