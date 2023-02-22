import React from "react";
import Model from "./Model";
import { useQuery, gql } from '@apollo/client';

function App() {
  // const [messages, setMessages] = React.useState();
  const [model, setModel] = React.useState({
    boolean: false,
    messageId: null
  });
  // console.log(model.messageId);

  // React.useEffect(() => {
  //   fetch("https://khoros-server-vercel-bikhz4mt9-koushil-mankali.vercel.app/api/messages")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMessages(data[0].data.items);
  //       // console.log(data[0].data.items, "messages")
  //     })
  // }, [])

  const GET_MESSAGES = gql`
  query {
    messages {
      items {
        id
        author {
          login
        }
        subject
        body
      }
    }
  }`;

  // adding readmore and readless for long texts
  const ReadMore = ({ prop }) => {
    const text = prop;
    const [isReadMore, setIsReadMore] = React.useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 150) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "  ...read more" : "  show less"}
        </span>
      </p>
    );
  };

  // displaying messages
  function DisplayMessages() {
    const { loading, error, data } = useQuery(GET_MESSAGES);
    // console.log(data, error, "graphql");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
      <div className="container">
        <div className="messages-container">
          {data.messages.items?.map((message, index) =>
            <div key={index} className="message">
              <p><strong>id:  </strong>{message.id}</p>
              <p><strong>subject:  </strong>{message.subject}</p>
              <div><strong>body:  </strong>
                {message.body.length >= 150 ? <ReadMore prop={message.body} /> : message.body}
              </div>
              <div className="button">
                <button onClick={() => setModel({
                  boolean: true,
                  messageId: message.id
                })}
                >View More...</button>
              </div>
            </div>
          )}
          <br />
          <br />
        </div>
        {model.boolean ? <Model id={model.messageId} setModel={setModel} /> : null}
      </div>
    )
  }

  return (
    <div className="App">
      <div className="header">
        <h2>MESSAGES</h2>
      </div>
      <DisplayMessages />
    </div>
  );
}

export default App;
