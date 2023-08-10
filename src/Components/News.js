import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultPorps = {
    country: "in",
    pageSize: 10,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResult: 0,
    };
    document.title = `${this.props.category} - News`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(60);
    this.setState({
      articles: parseData.articles,
      totalResult: parseData.totalResult,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=09a8238cda294e15b23b48572a168d72&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    // this.setState({loading : true})
    // let data  = await fetch(url);
    // let parseData = await data.json();
    // this.setState(
    //     {
    //         articles : parseData.articles ,
    //         totalResult:parseData.totalResult,
    //         loading:false
    //     })
    this.updateNews();
  }

  handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=09a8238cda294e15b23b48572a168d72&pageSize=${this.props.pageSize}&page=${this.state.page - 1}`;
    // this.setState({loading : true})
    // let data  = await fetch(url);
    // let parseData = await data.json();
    // this.setState(
    //     {
    //         page:this.state.page-1 ,
    //         articles : parseData.articles,
    //         loading:false
    //     }
    // )
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    //   if(this.state.page + 1 > Math.ceil(this.state.totalResult/this.props.pageSize)){} else {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=09a8238cda294e15b23b48572a168d72&pageSize=${this.props.pageSize}&page=${this.state.page+1}`;
    //   this.setState({loading : true})
    //   let data  = await fetch(url);
    //   let parseData = await data.json();
    //   this.setState(
    //       {
    //           page:this.state.page+1 ,
    //           articles : parseData.articles,
    //           loading:false
    //       }
    //   )
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResult: parseData.totalResult,
    });
  };
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">TopHeadlines from {this.props.category}</h2>
        {this.state.loading && <Loading />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles !== this.state.totalResult}
          loader={<Loading />}
        >
          <div className="row my-5">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div key={element.url} className="col-md-4">
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      url={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
          <button
            className="btn btn-dark"
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
          >
            &#8592; previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResult / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            next &#8594;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
