import React, { useState , useEffect} from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
  
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalResult, setTotalResult] = useState(0)
   
  const updateNews= async() =>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(60);
    setArticles(parseData.articles);
    setLoading(false);
    setTotalResult(parseData.totalResult);
    props.setProgress(100);
  }

  useEffect(() => {
     document.title = `${props.category} - News`;
    updateNews();
    // eslint-disable-next-line
  }, [])
  

  const fetchMoreData = async() => {
    setPage(page+1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalResult(parseData.totalResult);
  };

    return (
      <div className="container" style={{marginTop:"80px"}}>
        <h2 className="text-center">TopHeadlines from {props.category}</h2>
        {loading && <Loading />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles !== totalResult}
          loader={<Loading />}
        >
          <div className="row my-5">
            {!loading &&
              articles.map((element , id) => {
                return (
                  <div key={id} className="col-md-4">
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
      </div>
    );
}




News.defaultPorps = {
  country: "in",
  pageSize: 10,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;