import React from "react";
import { graphql, Link } from "gatsby";
// import SEO from "../components/SEO";
// import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { getYoutubePlayer } from "../components/Paper";
import { StaticImage } from "gatsby-plugin-image";
// import Call from "../components/Call";

function formatDate(dateIsoString) {
  const newsDate = new Date(dateIsoString);
  const month = newsDate.getUTCMonth();
  let monthAbbrev = ""
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

export const Head = () => <title>Robot Perception and Learning Lab</title>;


export const query = graphql`
  query LandingQuery {
    allPaper(
      sort: [{ date: { year: DESC } }, { date: { month: DESC } }]
      filter: { date: { year: { gte: 2023 } } }
    ) {
      nodes {
        id
        children {
          internal {
            type
          }
          ... on uri {
            url
          }
          ... on arxiv {
            url
          }
          ... on doi {
            url
          }
        }
        title
        journal
        authors
        date {
          year
          month
        }
      }
    }
    allNewsYaml(sort: [{ date: DESC }], limit: 3) {
      nodes {
        message
        date
        button_1_text
        button_1_link
        button_2_text
        button_2_link
      }
    }
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;


const Home = (props) => {
//   const intro = props.data.intro;
//   const site = props.data.site.siteMetadata;
//   const services = props.data.services.edges;
//   const features = props.data.features.edges;
//   const introImageClasses = `intro-image ${
//     intro.frontmatter.intro_image_absolute && "intro-image-absolute"
//   } ${
//     intro.frontmatter.intro_image_hide_on_mobile && "intro-image-hide-mobile"
//   }`;

  let latestPapers = [];
  const paperData = props.data.allPaper.nodes;
  for (let paper of paperData) {
    const video = getYoutubePlayer(paper);
    if (video) {
      paper.player = video;
      latestPapers.push(paper);
    }
    if (latestPapers.length >= 2) {
      break;
    }
  }

  return (
    <>
      {/* // <Layout bodyClass="page-home"> */}
      {/* <SEO title={site.title} /> */}
      {/* <Helmet>
        <meta
          name="description"
          content="Small Business Theme. Multiple content types using Markdown and JSON sources. Responsive design and SCSS. This is a beautiful and artfully designed starting theme."
        />
      </Helmet> */}
      <div class="section pt-0 pb-0">
        <Hero
          background_image="/images/hero2.jpg"
          headings={{
            heading: props.data.site.siteMetadata.title,
          }}
        />
      </div>

      <div className="section section-base-bg-2">
        <div className="container">
          <div className="section-heading pb-2">
            <h2>{"news"}</h2>
            <Link to="/news">{"view_all"}</Link>
          </div>
          <div className="row">
            {props.data.allNewsYaml.nodes.map((news) => (
              <div className="col-12 col-md-6 col-lg-4 mb-2">
                <div className="text-secondary">{formatDate(news.date)}</div>
                <div className="pb-1">{news.message}</div>
                {news.button_1_text ? (
                  <div className="pb-2">
                    <a
                      className="btn btn-outline-primary"
                      href={`${news.button_1_link}`}
                      target="_blank"
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

      <div className="section section-base-bg">
        <div className="container">
          <div className="section-heading pb-2">
            <h2>{"our latest research"}</h2>
            <Link to="/research">{"view_all"}</Link>
          </div>
          <div className="row">
            {latestPapers.map((paper) => (
              <div className="col-12 col-md-6 mb-2">
                {paper.player}
                <h3 className="pt-1">{paper.title}</h3>
                <div className="text-secondary">{paper.journal} {paper.date.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* {services.length > 0 && (
        <div className="strip">
          <div className="container pt-6 pb-6 pb-md-10">
            <div className="row justify-content-start">
              {services.map(({ node }) => (
                <div key={node.id} className="col-12 col-md-4 mb-1">
                  <div className="service service-summary">
                    <div className="service-content">
                      <h2 className="service-title">
                        <Link to={node.fields.slug}>
                          {node.frontmatter.title}
                        </Link>
                      </h2>
                      <p>{node.excerpt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row justify-content-center">
              <div className="col-auto">
                <Link className="button button-primary" to="/services/">
                  View All Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {features.length > 0 && (
        <div className="strip strip-grey">
          <div className="container pt-6 pb-6 pt-md-10 pb-md-10">
            <div className="row justify-content-center">
              {features.map(({ node }) => (
                <div key={node.id} className="col-12 col-md-6 col-lg-4 mb-2">
                  <div className="feature">
                    {node.image && (
                      <div className="feature-image">
                        <img src={node.image} />
                      </div>
                    )}
                    <h2 className="feature-title">{node.title}</h2>
                    <div className="feature-content">{node.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} */}
      {/* // </Layout> */}
    </>
  );
};

// export const query = graphql`
//   query {
//     services: allMarkdownRemark(
//       filter: { fileAbsolutePath: { regex: "/services/.*/" } }
//       sort: { fields: [frontmatter___weight], order: ASC }
//       limit: 6
//     ) {
//       edges {
//         node {
//           id
//           frontmatter {
//             title
//             date(formatString: "DD MMMM YYYY")
//           }
//           fields {
//             slug
//           }
//           excerpt
//         }
//       }
//     }
//     intro: markdownRemark(fileAbsolutePath: { regex: "/content/index.md/" }) {
//       html
//       frontmatter {
//         image
//         intro_image
//         intro_image_absolute
//         intro_image_hide_on_mobile
//         title
//       }
//     }
//     features: allFeaturesJson {
//       edges {
//         node {
//           id
//           title
//           description
//           image
//         }
//       }
//     }
//     site {
//       siteMetadata {
//         title
//       }
//     }
//   }
// `;

export default Home;
