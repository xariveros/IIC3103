import React, { Component } from "react";
import "./App.css";
import Episodio from "./components/Episodio.js";
import { Route, Link } from "react-router-dom";
import InfoEpisodio from "./components/InfoEpisodio";
import InfoChar from "./components/InfoChar";
import InfoChar2 from "./components/InfoChar2";
import Buscar from "./components/Buscar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      link: "",
      info2: [],
      info_chars: [],
      paginas_chars: 0,
      paginas_locations: 0,
      info_locations: [],
      busqueda: "",
    };
  }

  componentDidMount() {
    fetch("https://integracion-rick-morty-api.herokuapp.com/api/episode")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ info: data.results, link: data.info.next });

        fetch(data.info.next)
          .then((res) => res.json())
          .then((data1) => {
            this.setState({ info2: data1.results });
          });
      });

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
              //console.log(data1)
              this.setState({
                info_chars: this.state.info_chars.concat(data1.results),
              });
              // console.log(this.state.info_chars)
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
  }

  handleSubmit = (event) => {
    //event.preventDefault()
    //console.log("apreto enter")
    this.setState({ busqueda: event.target.value });
    //this.forceUpdate()
    //console.log(buscar)
  };

  handleChange = (event) => {
    //event.preventDefault()
    this.setState({ busqueda: event.target.value });
    console.log(this.state.busqueda);
  };

  handleClick = (event) => {
    //this.setState({busqueda:event.target.value})
    this.forceUpdate();
  };

  render() {
    return (
      <div>
        <center>
          <Link to="/">
            <button type="button">Home</button>
          </Link>
        </center>

        {this.state.info.map((info) => (
          <div>
            <Route exact path={"/" + info.id}>
              <center>
                <form onSubmit={this.handleSubmit}>
                  <input
                    placeholder="Ingrese su búsqueda"
                    value={this.state.busqueda}
                    type="text"
                    onChange={this.handleChange}
                  />

                  <Link to={"/resultados"}>
                    <button type="submit" onClick={this.handleClick}>
                      Buscar
                    </button>
                  </Link>
                </form>
              </center>
              <InfoEpisodio name={info.name} />
            </Route>
          </div>
        ))}

        {this.state.info2.map((info) => (
          <div>
            <Route exact path={"/" + info.id}>
              <InfoEpisodio name={info.name} />
            </Route>
          </div>
        ))}

        {/* personajes */}

        {this.state.info_chars.map((info) => (
          <div>
            <Route exact path={"/characters/" + info.id}>
              <center>
                <form onSubmit={this.handleSubmit}>
                  <input
                    placeholder="Ingrese su búsqueda"
                    value={this.state.busqueda}
                    type="text"
                    onChange={this.handleChange}
                  />

                  <Link to={"/resultados"}>
                    <button type="submit" onClick={this.handleClick}>
                      Buscar
                    </button>
                  </Link>
                </form>
              </center>
              <center>
                <h1>{info.name}</h1>
                <img src={info.image} alt="Logo" />;
                <h2>Estado: {info.status}</h2>
                <h2>Especie: {info.species}</h2>
                <h2>Género: {info.gender}</h2>
                <h2>Tipo: {info.type}</h2>
                <InfoChar
                  lugares={info.location}
                  origen={info.origin}
                  caps={info.episode}
                />
              </center>
            </Route>
          </div>
        ))}

        {this.state.info_locations.map((info) => (
          <div>
            <Route exact path={"/location/" + info.id}>
              <center>
                <form onSubmit={this.handleSubmit}>
                  <input
                    placeholder="Ingrese su búsqueda"
                    value={this.state.busqueda}
                    type="text"
                    onChange={this.handleChange}
                  />

                  <Link to={"/resultados"}>
                    <button type="submit" onClick={this.handleClick}>
                      Buscar
                    </button>
                  </Link>
                </form>
              </center>
              <center>
                <h1>{info.name}</h1>
                <h2>Tipo: {info.type}</h2>
                <h2>Dimensión: {info.dimension}</h2>

                <h1>Personajes que aparecen:</h1>
                {info.residents.map((info) => (
                  <div>
                    <InfoChar2 url={info} />
                  </div>
                ))}
              </center>
            </Route>
          </div>
        ))}

        <Route exact path="/">
          <center>
            <form onSubmit={this.handleSubmit}>
              <input
                placeholder="Ingrese su búsqueda"
                value={this.state.busqueda}
                type="text"
                onChange={this.handleChange}
              />

              <Link to={"/resultados"}>
                <button type="submit" onClick={this.handleClick}>
                  Buscar
                </button>
              </Link>
            </form>
          </center>

          <center>
            <h1>Lista de episodios</h1>
            <Episodio info={this.state.info} />
            <Episodio info={this.state.info2} />
          </center>
        </Route>
        <center>
          <Route exact path="/resultados">
            <Buscar query={this.state.busqueda} />
            {/* {this.state.busqueda} */}
          </Route>
        </center>
      </div>
    );
  }
}

export default App;
