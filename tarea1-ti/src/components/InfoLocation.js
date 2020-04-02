import React, { Component } from "react";
import { Link } from "react-router-dom";

class InfoLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lugares1: this.props.lugares,
      origen1: this.props.origen,
      caps1: this.props.caps,
      info_loc: []
    };
  }

  componentDidMount() {
    fetch(this.props.url)
      .then(res => res.json())
      .then(data1 => {
        this.setState({ info_loc: this.state.info_loc.concat(data1) });
        console.log(this.state.info_loc[0]);
      });
  }

  render() {
    return (
      <div>
        {this.state.info_loc.map(info1 => (
          <div>
            <Link to={"/location/" + info1.id}>
              <li>{info1.name}</li>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default InfoLocation;
