import React, { useState } from "react";
import Image from 'next/image'

const NewsItem = ({ data }) => {
  return (
    <div className="news_item" data-id={data.id}>
      <div className="news_item__image">
        <Image src={data.img} alt="images" />
      </div>
      <div>
        <p className="news_item__title clamp-2">{data.title}</p>
        <p>{data.date}</p>
      </div>
    </div>
  );
}

export default NewsItem;