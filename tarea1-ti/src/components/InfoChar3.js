import React, { Component } from "react";
import { Link } from "react-router-dom";

class InfoChar3 extends Component {
  constructor(props) {
    super(props);
    this.state = { char: this.props.info1 };
  }
  componentDidMount() {
    //console.log("monto info 3")
    //console.log(this.props.info1.name)
    var aux = this.state.char.name.toLowerCase();

    var aux2 = this.props.query1.toLowerCase();
    if (aux.indexOf(aux2) !== -1) {
    } else {
      this.setState({ char: { ...this.state.char, name: "" } });
      //this.state.char.name = ""
    }
  }

  render() {
    return (
      <div>
        <Link to={"/characters/" + this.state.char.id}>
          {this.state.char.name}
        </Link>
      </div>
    );
  }
}

export default InfoChar3;
