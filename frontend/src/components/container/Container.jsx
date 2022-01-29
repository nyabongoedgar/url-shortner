import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Form from "../form/UrlShortnerForm";
import Table from "../table/Table";
import { validURL } from "../../utils";
import Link from "../../assets/icons/Link";
import Button from "../common/Button";

const Container = () => {
  const [fullUrl, setFullUrl] = useState("");
  const [lastShortnedUrl, setLastShortnedUrl] = useState(null);
  const [copyFeedBack, setCopyFeedBack] = useState("");
  const [formError, setFormError] = useState(null);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery("urls", () =>
    axios.get(`${process.env.REACT_APP_API_ROOT_URL}/short-urls`).then((res) => res.data)
  );

  const mutation = useMutation(
    () => {
      return axios.post(`${process.env.REACT_APP_API_ROOT_URL}/short-urls`, { fullUrl });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("urls");
        let {
          data: {
            result: { shortUrl },
          },
        } = data;
        setLastShortnedUrl(shortUrl);
        setFormError(null);
        setCopyFeedBack(null);
      },
    }
  );

  const handleChange = (e) => setFullUrl(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validURL(fullUrl)) {
      mutation.mutate();
      setFullUrl("");
    } else {
      setFormError("Please enter a valid url!");
      return;
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="inner-form">
          <Form
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={mutation.isLoading}
            error={formError}
            value={fullUrl}
            setCopyFeedBack={setCopyFeedBack}
            lastShortnedUrl={lastShortnedUrl}
          />

          {lastShortnedUrl && (
            <div>
              <div className="layout horizontal center-center">
                <span className="white bold pr-10">{`${process.env.REACT_APP_API_ROOT_URL}/${lastShortnedUrl}`}</span>
                <Button
                  className="link-btn layout center-center center-justified"
                  text={
                    <>
                      <Link stroke="#fff" /> Copy
                    </>
                  }
                  onClick={() => {
                    window.navigator.clipboard
                      .writeText(`${process.env.REACT_APP_API_ROOT_URL}/${lastShortnedUrl}`)
                      .then(() => {
                        setCopyFeedBack("Link copied!");
                      });
                  }}
                />
              </div>
              <div>
                <span className="green bold pr-10 center-text">
                  {copyFeedBack}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="body">
        {error && (
          <div className="layout center-center center-justified">
            <span className="white bold" data-testid="get-server-error">
              Failed to load recent urls
            </span>
          </div>
        )}
        {data && (
          <div className="table-container">
            <Table data={data} loading={isLoading} heading="Recent URLs" />
          </div>
        )}
      </div>

      <div className="footer">&copy; 2022 STORD url shortner</div>
    </div>
  );
};

export default Container;
