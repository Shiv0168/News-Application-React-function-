import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title , description , imageUrl , url ,author , date , source} = this.props;
    return (
      <div>
        <div className="card" >
          <span className="badge rounded-pill bg-danger d-flex" style={{justifyContent:"center" , position:"absolute" , right:"0"}}>{source}</span>
          <img src={imageUrl} className="card-img-top" alt={title} />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
                {description}
            </p>
            <p className="card-text"><small className="text-muted">By-{author?author:"Unknown"} on {new Date(date).toUTCString()}</small></p>
            <a href={url} rel="noreferrer" target="_blank" className="btn btn-dark">
              Read more..
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
