import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";

export const Head = () => <title>Open Student Projects - Robot Perception and Learning Lab</title>;

const projectDatePattern = /^(\d{4})-(\d{2})-(\d{2})/;

function getProjectTimestamp(project) {
  const dateMatch = project.name.match(projectDatePattern);

  if (!dateMatch) {
    return 0;
  }

  const [, year, month, day] = dateMatch;
  return Date.UTC(Number(year), Number(month) - 1, Number(day));
}

function compareProjectsNewestFirst(projectA, projectB) {
  const dateDifference =
    getProjectTimestamp(projectB) - getProjectTimestamp(projectA);

  if (dateDifference !== 0) {
    return dateDifference;
  }

  return projectA.childMarkdownRemark.frontmatter.title.localeCompare(
    projectB.childMarkdownRemark.frontmatter.title
  );
}

export const query = graphql`
  query PaperQuery {
    allFile(
      filter: { sourceInstanceName: { in: ["studentprojects", "images"] } }
    ) {
      nodes {
        id
        name
        relativePath
        sourceInstanceName
        childMarkdownRemark {
          frontmatter {
            title
            image
            type
            visible
          }
          html
        }
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`;

const StudentProjects = ({ data }) => {
  const projects = data.allFile.nodes
    .filter((node) => node.childMarkdownRemark)
    .filter((node) => node.childMarkdownRemark.frontmatter.visible)
    .sort(compareProjectsNewestFirst);

  return (
    <>
      <div className="section pb-0">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8">
              <h1>Open Topics for Student Projects</h1>
              Below we have a collection of proposed topics for Bachelor or
              Master thesises and/or for lab courseworks. All students are also
              invited to contact us with their own topic ideas.
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="row mt-2 mb-2">
            {projects
              .map((project) => (
                <div className="col-sm-6 mb-2 mt-2 mb-sm-0" key={project.id}>
                  <div className="card">
                    {project.childMarkdownRemark.frontmatter.image ? (
                      <GatsbyImage
                        className="card-img-top"
                        alt=""
                        image={getImage(
                          data.allFile.nodes.find(
                            (node) =>
                              project.childMarkdownRemark.frontmatter.image ===
                              `/${node.relativePath}`
                          )
                        )}
                      />
                    ) : (
                      ""
                    )}
                    <div className="card-body">
                      <div className="mb-1">
                        {`${project.childMarkdownRemark.frontmatter.type}`
                          .split(",")
                          .map((projectType) => (
                            <span className="badge text-bg-secondary ps-1 pe-1 me-1" key={projectType}>
                              {projectType}
                            </span>
                          ))}
                      </div>
                      <h4 className="card-title">
                        {project.childMarkdownRemark.frontmatter.title}
                      </h4>
                      <div
                        className="card-text studentProjectDescription"
                        dangerouslySetInnerHTML={{
                          __html: project.childMarkdownRemark.html,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default StudentProjects;
