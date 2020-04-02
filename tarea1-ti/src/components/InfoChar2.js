import React, { Component } from "react";
import { Link } from "react-router-dom";

class InfoChar2 extends Component {
  constructor(props) {
    super(props);
    this.state = { info: "" };
  }
  componentDidMount() {
    console.log(this.props.url);
    fetch(this.props.url)
      .then(res => res.json())
      .then(data1 => {
        this.setState({ info: data1 });
        // console.log(this.state.info.name)
      });
  }

  render() {
    return (
      <div>
        <Link to={"/characters/" + this.state.info.id}>
          {this.state.info.name}
        </Link>
      </div>
    );
  }
}

export default InfoChar2;
