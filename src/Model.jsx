import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from '@apollo/client';


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


const UPDATE_MESSAGE = gql`
  mutation UpdateMessageData($updateMessageInput: updateMessageInput!) {
    updateMessage(input: $updateMessageInput) {
      id
      subject
      body
    }
  }
`;


export default function Model({ setModel, id }) {
    const [formData, setFormData] = useState("");
    const { loading, error, data } = useQuery(GET_MESSAGE, {
        variables: { id: id },
    });

    const [UpdateMessageData] = useMutation(UPDATE_MESSAGE);

    useEffect(() => {
        setFormData(data?.message);
    }, [data]);
    console.log(formData, "form data")

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;


    const handleFormData = (e) => {
        e.preventDefault();
        console.log(e.target.name, e.target.value);
        // useEffect(() => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        // }, [])
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("form submitted!")
        UpdateMessageData({
            variables: {
                updateMessageInput: {
                    id: formData?.id,
                    subject: formData?.subject,
                    body: formData?.body,
                }

            },
        });
    }

    return (
        <form className="model" onSubmit={onSubmit}>
            <div className="title">
                <h3>Details</h3>
            </div>

            <div className="model-mini-container">
                <div className="model-values">
                    <label>Id:</label><br />
                    <input defaultValue={formData?.id}
                        readOnly></input>
                </div>

                <div className="model-values">
                    <label>Author:</label><br />
                    <input defaultValue={formData?.author?.login} readOnly></input>
                </div>
            </div>

            <div className="model-mini-container">
                <div className="model-values">
                    <label>Subject:</label><br />
                    <textarea
                        defaultValue={formData?.subject}
                        name="subject"
                        onChange={(e) => handleFormData(e)}
                    ></textarea>
                </div>

                <div className="model-values">
                    <label>Body:</label><br />
                    <textarea
                        defaultValue={formData?.body}
                        name="body"
                        onChange={(e) => handleFormData(e)}
                    ></textarea>
                </div>
            </div>

            <div className="model-mini-container">
                <div className="model-values">
                    <label>Language:</label><br />
                    <input defaultValue={formData?.language} readOnly></input>
                </div>

                <div className="model-values">
                    <label>Views:</label><br />
                    <input defaultValue={formData?.metrics?.views} readOnly></input>
                </div>
            </div>

            <div className="model-mini-container">
                <div className="model-values">
                    <label>Link:</label><br />
                    <div className="message-link">
                        <a href={formData?.view_href} target="_blank">{formData?.view_href}</a>
                    </div>
                </div>

                <div className="model-values">
                    <label>Post Time:</label><br />
                    <textarea defaultValue={formData?.post_time} readOnly></textarea>
                </div>
            </div>

            <div className="button-container">
                <div className="button">
                    <button type="submit" className="back-button" >Update</button>
                </div>

                <div className="button">
                    <button onClick={() => setModel({ boolean: false })} className="back-button">Close</button>
                </div>
            </div>

        </form>
    )
}