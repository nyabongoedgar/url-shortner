import React from "react";
import PropTypes from "prop-types";
import CopyIcon from "../../assets/icons/Copy";
import Loader from "../common/Loader";

const Table = ({ data, heading, loading }) => {
  return (
    <div>
      <h1 className="table-header">{heading}</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Full Url</th>
            <th>Short URL</th>
            <th>Created on</th>
            <th>Copy</th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr style={{ textAlign: "center", background: "lightgrey" }}>
              <td colSpan="4">
                <Loader />
              </td>
            </tr>
          )}
          {!loading && data && data.results.length === 0 && (
            <tr style={{ textAlign: "center", background: "lightgrey" }}>
              <td colSpan="4">
                <span className="black">No records</span>
              </td>
            </tr>
          )}
          {!loading && data && data.results.length > 0 && (
            <>
              {data.results.map((record, index) => {
                return (
                  <tr key={index}>
                    <td>{record.fullUrl}</td>
                    <td>
                      <a
                        href={`${process.env.REACT_APP_API_ROOT_URL}/${record.shortUrl}`}
                        target="_blank" rel="noreferrer"
                      >{`${process.env.REACT_APP_API_ROOT_URL}/${record.shortUrl}`}</a>
                    </td>
                    <td>
                      {record.createdAt &&
                        new Date(record.createdAt).toDateString()}
                    </td>
                    <td>
                      <CopyIcon
                        width={14}
                        height={14}
                        className="copy-icon"
                        onClick={() => {
                          window.navigator.clipboard
                            .writeText(
                              `${process.env.REACT_APP_API_ROOT_URL}/${record.shortUrl}`
                            )
                            .then(
                              function () {
                                window.alert("Link copied!");
                              },
                              function () {
                                window.alert(
                                  "Link not copied, try again later!"
                                );
                              }
                            );
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.shape({
    results: PropTypes.array,
  }),
  heading: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default Table;
