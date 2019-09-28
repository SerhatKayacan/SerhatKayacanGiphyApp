import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      offset: 0,
      inputValue: ""
    };
  }
  componentDidMount() {
    this.getTrendingGifs();
  }
  getTrendingGifs = async () => {
    let url =
      "https://api.giphy.com/v1/gifs/trending?api_key=SX7JHg37FphAAZZdTecIWAMbD3ikW8cg&limit=20";
    let data = await fetch(url);
    let foundData = await data.json();
    this.setState({ results: foundData.data });
  };
  addMoreTrendingGifs = async () => {
    this.setState({ offset: this.state.offset + 20 });
    let offset = this.state.offset;
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=SX7JHg37FphAAZZdTecIWAMbD3ikW8cg&limit=20&offset=${offset +
      20}`;
    let data = await fetch(url);
    let foundData = await data.json();
    this.setState({ results: [...this.state.results, ...foundData.data] });
    console.log(this.state);
  };
  getResults = async e => {
    e.preventDefault();
    let input = document.getElementById("gifInput").value;
    this.setState({ inputValue: input });
    this.setState({ offset: 0 });
    let url = `https://api.giphy.com/v1/gifs/search?api_key=SX7JHg37FphAAZZdTecIWAMbD3ikW8cg&q=${input}&limit=20&offset=0`;
    let data = await fetch(url);
    let foundData = await data.json();
    this.setState({ results: foundData.data });
    console.log(this.state);
  };
  getMoreGifs = async () => {
    // scroll en aşağı inince
    if (this.state.inputValue === "") {
      this.addMoreTrendingGifs();
    } else {
      this.setState({ offset: this.state.offset + 20 });
      let offset = this.state.offset;
      let url = `https://api.giphy.com/v1/gifs/search?api_key=SX7JHg37FphAAZZdTecIWAMbD3ikW8cg&q=${
        this.state.inputValue
      }&limit=20&offset=${offset + 20}`;
      let data = await fetch(url);
      let foundData = await data.json();
      this.setState({ results: [...this.state.results, ...foundData.data] });
      console.log(this.state);
    }
  };
  render() {
    return (
      <div className="App">
        <div className="container">
          <form className="form-inline">
            <div className="form-group mx-sm-3 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search gifs..."
                id="gifInput"
              ></input>
            </div>
            <button
              type="submit"
              className="btn btn-primary mb-2"
              onClick={this.getResults}
            >
              search
            </button>
          </form>

          <ul className="allGifs">
            <InfiniteScroll
              dataLength={this.state.results.length}
              next={this.getMoreGifs} // scroll en aşağı inince
              hasMore={true}
              scrollThreshold={"5px"}
            >
              {this.state.results.map(result => (
                <li className="gifs" key={result.id}>
                  <img src={result.images.original.url} alt={result.slug} />
                </li>
              ))}
            </InfiniteScroll>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
