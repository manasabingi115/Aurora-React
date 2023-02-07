import React from "react";
import Model from "./Model";
import { useQuery, gql } from '@apollo/client';

function App() {
  // const [messages, setMessages] = React.useState();
  const [model, setModel] = React.useState({
    boolean: false,
    message: null
  });
  // console.log(model.message);

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
    messages{
    items {
      id
      author {
        id
        login
      }
      subject
      body
      metrics{
        views
      }
      view_href
      language
      post_time
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
    console.log(data, error, "graphql");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
      <div className="messages-container">
        {data.messages.items?.map((message, index) =>
          <div key={index} className="message">
            <p><strong>id:  </strong>{message.id}</p>
            <p><strong>subject:  </strong>{message.subject}</p>
            <p><strong>body:  </strong>
              {message.body.length >= 150 ? <ReadMore prop={message.body} /> : message.body}
            </p>
            <p><strong>views:  </strong>{message.metrics.views}</p>
            <div className="button">
              <button onClick={() => setModel({
                boolean: true,
                message: { ...message }
              })}
              >View More...</button>
            </div>
          </div>
        )}
        <br />
        {model.boolean ? <Model messages={model.message} setModel={setModel} /> : null}
        <br />
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
