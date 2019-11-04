// import React, { Component } from "react";
// import { Chat, addResponseMessage } from "react-chat-popup";

// class ChatPopUP extends Component {
//   componentDidMount() {
//     addResponseMessage("Welcome to this awesome chat nidhi!");
//   }

//   handleNewUserMessage = newMessage => {
//     console.log(`New message incoming! ${newMessage}`);
//     axios
//       .post("http://localhost:3001/send-msg", data)
//       .then(response => {
//         if (response.status === 200)
//           if (response === 200) {
//             console.log("Order Updated");
//           }
//       })
//       .catch(err => {
//         if (err) {
//           this.setState({
//             errorRedirect: true
//           });
//         }
//       });
//     // Now send the message throught the backend API
//     //addResponseMessage(response);
//   };

//   render() {
//     return (
//       <div className="App">
//         <Chat handleNewUserMessage={this.handleNewUserMessage} />
//       </div>
//     );
//   }
// }

// export default ChatPopUP;
