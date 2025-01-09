import React, { useState } from "react";



const NewsItem = ({ data }) => {
  return (
    <div className="news_item" data-id={data.id}>
      <div className="news_item__image">
        <img src={data.img} alt="images" />
      </div>
      <div>
        <p className="news_item__title clamp-2">{data.title}</p>
        <p>{data.date}</p>
      </div>
    </div>
  );
}

export default NewsItem;