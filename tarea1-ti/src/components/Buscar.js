import React, { Component } from "react";
import InfoChar3 from "./InfoChar3";
import InfoLocation2 from "./InfoLocation2";
import InfoEpisodio2 from "./InfoEpisodio2";

class Buscar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: this.props.query,
      paginas_chars: 0,
      info_chars: [],
      info_locations: [],
      paginas_locations: 0,
      info_episodios1: [],
      info_episodios2: [],
    };
  }
  componentDidMount() {
    fetch("https://integracion-rick-morty-api.herokuapp.com/api/character")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ paginas_chars: data.info.pages });
        console.log(this.state.paginas_chars);

        for (let index = 1; index < this.state.paginas_chars + 1; index++) {
          var n = index.toString();
          fetch(
            "https://integracion-rick-morty-api.herokuapp.com/api/character/?page=" +
              n
          )
            .then((res) => res.json())
            .then((data1) => {
              this.setState({
                info_chars: this.state.info_chars.concat(data1.results),
              });
            });
        }
      });

    fetch("https://integracion-rick-morty-api.herokuapp.com/api/location")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ paginas_locations: data.info.pages });

        for (let index = 1; index < this.state.paginas_locations + 1; index++) {
          var n = index.toString();
          fetch(
            "https://integracion-rick-morty-api.herokuapp.com/api/location/?page=" +
              n
          )
            .then((res) => res.json())
            .then((data1) => {
              this.setState({
                info_locations: this.state.info_locations.concat(data1.results),
              });
              //console.log(this.state.info_locations)
            });
        }
      });

    fetch("https://integracion-rick-morty-api.herokuapp.com/api/episode")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ info_episodios1: data.results, link: data.info.next });

        fetch(data.info.next)
          .then((res) => res.json())
          .then((data1) => {
            this.setState({
              info_episodios1: this.state.info_episodios1.concat(data1.results),
            });
          });
      });
  }

  render() {
    return (
      <div>
        <center>
          <p> Buscaste:</p>
          <h1>{this.state.info}</h1>
        </center>
        <h1>Personajes</h1>
        {this.state.info_chars.map((info) => (
          <p>
            <InfoChar3 info1={info} query1={this.state.info} />
          </p>
        ))}
        <h1>Lugares</h1>
        {this.state.info_locations.map((info) => (
          <p>
            <InfoLocation2 info1={info} query1={this.state.info} />
          </p>
        ))}
        <h1>Episodios</h1>
        {this.state.info_episodios1.map((info) => (
          <p>
            <InfoEpisodio2 info1={info} query1={this.state.info} />
          </p>
        ))}
      </div>
    );
  }
}

export default Buscar;
