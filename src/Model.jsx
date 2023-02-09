import React from "react";
import { useQuery, gql } from '@apollo/client';

export default function Model({  setModel, id }) {
    // console.log(id, "model")

    const GET_MESSAGE = gql`
    query MESSAGE_QUERY($id: String!){
        message(id: $id) {
          id
          author {
            login
          }
          subject
          body
          language
          metrics {
            views
          }
          view_href
          post_time
        }
      }`;

    const { loading, error, data } = useQuery(GET_MESSAGE, {
        variables: { id: id },
    });
    // console.log(data, error, "message");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div className="model">
            <div className="title">
                <h3>Details</h3>
            </div>

            <div className="model-mini-container">
                <div className="model-values">
                    <label>Id:</label><br />
                    <input value={data?.message?.id} readOnly></input>
                </div>

                <div className="model-values">
                    <label>Author:</label><br />
                    <input value={data?.message?.author.login} readOnly></input>
                </div>
            </div>

            <div className="model-mini-container">
                <div className="model-values">
                    <label>Subject:</label><br />
                    <textarea value={data?.message?.subject} readOnly></textarea>
                </div>

                <div className="model-values">
                    <label>Body:</label><br />
                    <textarea value={data?.message?.body} readOnly></textarea>
                </div>
            </div>
            
            <div className="model-mini-container">
                <div className="model-values">
                    <label>Language:</label><br />
                    <input value={data?.message?.language} readOnly></input>
                </div>

                <div className="model-values">
                    <label>Views:</label><br />
                    <input value={data?.message?.metrics.views} readOnly></input>
                </div>
            </div>

            <div className="model-mini-container">
                <div className="model-values">
                    <label>Link:</label><br />
                    <div className="message-link">
                        <a href={data?.message?.view_href} target="_blank">{data?.message?.view_href}</a>
                    </div>
                </div>

                <div className="model-values">
                    <label>Post Time:</label><br />
                    <textarea value={data?.message?.post_time} readOnly></textarea>
                </div>
            </div>
            
            <div className="button">
                <button onClick={() => setModel({ boolean: false })} className="back-button">Close</button>
            </div>
        </div>
    )
}