import React from "react";
import Model from "./Model";

function App() {
  const [messages, setMessages] = React.useState();
  const [model, setModel] = React.useState({
    boolean: false,
    message: null
  });
  // console.log(model.message);

  React.useEffect(() => {
    fetch("https://khoros-server-vercel-bikhz4mt9-koushil-mankali.vercel.app/api/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data[0].data.items);
        // console.log(data[0].data.items, "messages")
      })
  }, [])

  return (
    <div className="App">
      <h2>MESSAGES</h2>
      {messages?.map((message, index) =>
        <div key={index} className="message">
          <p><strong>id:  </strong>{message.id}</p>
          <p><strong>subject:  </strong>{message.subject}</p>
          <p><strong>body:  </strong>{message.body}</p>
          <p><strong>views:  </strong>{message.metrics.views}</p>
          <div className="button">
            <button onClick={() => setModel({
              boolean: true,
              message: { ...message }
            })}
            >View All Fields</button>
          </div>
        </div>
      )}
      <br />
      {model.boolean ? <Model messages={model.message} setModel={setModel} /> : null}
    </div>
  );
}

export default App;
