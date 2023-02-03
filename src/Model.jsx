import React from "react";

export default function Model({ messages, setModel }) {
    // console.log(messages, "model")
    return (
        <div className="model">
            <div className="title">
                <h3>Details</h3>
            </div>
            <div className="model-mini-container">
                <div className="model-values">
                    <label>Id:</label><br />
                    <input value={messages?.id} readOnly></input>
                </div>

                <div className="model-values">
                    <label>Author:</label><br />
                    <input value={messages?.author.login} readOnly></input>
                </div>
            </div>
            <br />
            <div className="model-mini-container">
                <div className="model-values">
                    <label>Subject:</label><br />
                    <textarea value={messages?.subject} readOnly></textarea>
                </div>

                <div className="model-values">
                    <label>Body:</label><br />
                    <textarea value={messages?.body} readOnly></textarea>
                </div>
            </div>
            <br />
            <div className="model-mini-container">
                <div className="model-values">
                    <label>Language:</label><br />
                    <input value={messages?.language} readOnly></input>
                </div>

                <div className="model-values">
                    <label>Views:</label><br />
                    <input value={messages?.metrics.views} readOnly></input>
                </div>
            </div>
            <br />
            <div className="model-mini-container">
                <div className="model-values">
                    <label>Link:</label><br />
                    <textarea value={messages?.view_href} readOnly></textarea>
                    {/* <a href={messages?.view_href}>{messages?.view_href}</a> */}
                </div>

                <div className="model-values">
                    <label>Post Time:</label><br />
                    <textarea value={messages?.post_time} readOnly></textarea>
                </div>
            </div>

            <br />
            <div className="button">
                <button onClick={() => setModel({ boolean: false })} className="back-button">Back</button>
            </div>
        </div>
    )
}