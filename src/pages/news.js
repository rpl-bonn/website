import React from "react";
import { graphql } from "gatsby";
import Hero from "../components/Hero";

function formatDate(dateIsoString) {
  const newsDate = new Date(dateIsoString);
  const month = newsDate.getUTCMonth();
  let monthAbbrev = "";
  if (month === 0) {
    monthAbbrev = "Jan";
  } else if (month === 1) {
    monthAbbrev = "Feb";
  } else if (month === 2) {
    monthAbbrev = "Mar";
  } else if (month === 3) {
    monthAbbrev = "Apr";
  } else if (month === 4) {
    monthAbbrev = "Mai";
  } else if (month === 5) {
    monthAbbrev = "Jun";
  } else if (month === 6) {
    monthAbbrev = "Jul";
  } else if (month === 7) {
    monthAbbrev = "Aug";
  } else if (month === 8) {
    monthAbbrev = "Sep";
  } else if (month === 9) {
    monthAbbrev = "Oct";
  } else if (month === 10) {
    monthAbbrev = "Nov";
  } else if (month === 11) {
    monthAbbrev = "Dec";
  }
  return `${monthAbbrev} ${newsDate.getUTCDate()}, ${newsDate.getUTCFullYear()}`;
}

export const Head = () => (
  <title>News - Robot Perception and Learning Lab</title>
);

export const query = graphql`
  query NewsQuery {
    allNewsYaml(sort: [{ date: DESC }]) {
      nodes {
        message
        date
        button_1_text
        button_1_link
        button_2_text
        button_2_link
      }
    }
  }
`;

const NewsPage = ({ data }) => {
  return (
    <>
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8">
              <h1>News</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="row">
            {data.allNewsYaml.nodes.map((news) => (
              <div key={news.date} className="col-12 col-md-8 mb-4">
                <div className="text-secondary">{formatDate(news.date)}</div>
                <div className="pb-2">{news.message}</div>
                {news.button_1_text ? (
                  <div className="pb-2">
                    <a
                      className="btn btn-outline-primary"
                      href={`${news.button_1_link}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {news.button_1_text}
                    </a>
                  </div>
                ) : (
                  ""
                )}
                {news.button_2_text ? (
                  <div>
                    <a
                      className="btn btn-outline-primary"
                      href={`${news.button_2_link}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {news.button_2_text}
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsPage;
