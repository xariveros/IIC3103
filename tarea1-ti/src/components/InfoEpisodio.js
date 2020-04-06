import React, { Component } from "react";
import { Link } from "react-router-dom";

class InfoEpisodio extends Component {
  constructor(props) {
    super(props);
    this.state = { info: [], lista_chars: [], test: [], char_id: [] };
  }

  componentDidMount() {
    fetch(
      "https://integracion-rick-morty-api.herokuapp.com/api/episode?name=" +
        this.props.name
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          info: data.results,
          lista_chars: data.results.characters,
          url_actual: "",
        });

        console.log(this.state.info[0].characters[0]);

        for (
          let index = 0;
          index < this.state.info[0].characters.length;
          index++
        ) {
          fetch(this.state.info[0].characters[index])
            .then((res) => res.json())
            .then((data1) => {
              this.setState({
                test: this.state.test.concat(data1.name),
                char_id: this.state.char_id.concat([[data1.name, data1.id]]),
              });
            });
        }
      });
  }

  render() {
    return (
      <div>
        {this.state.info.map((info) => (
          <div>
            <center>
              <li>ID: {info.id}</li>
              <li>Nombre Episodio: {info.name}</li>
              <li>Fecha emisión: {info.air_date}</li>
              <li>Extra: {info.episode}</li>
              <h1>
                <p>Personajes</p>
              </h1>
              {this.state.char_id.map((info1) => (
                <div>
                  <Link to={"/characters/" + info1[1]}>
                    <li>{info1[0]}</li>
                  </Link>
                </div>
              ))}
            </center>
          </div>
        ))}
      </div>
    );
  }
}

export default InfoEpisodio;
