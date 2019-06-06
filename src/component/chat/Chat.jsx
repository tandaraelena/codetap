import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  GET_ALL_USERS_LIST,
  GET_GENERAL_CHANNEL_HISTORY
} from "./chatConstants";
import { StyledChannelMessages } from "./chatStyle.js";

export const Chat = () => {
  const [channelMessageList, setChannelMessageList] = useState([]);
  useEffect(() => {
    // ditch fetch
    axios.get(GET_GENERAL_CHANNEL_HISTORY).then(({ data }) => {
      /* 
      "client_msg_id": "0b368fa2-2e0c-466c-8c95-04a49b2f2f3c",
      "type": "message",
      "text": "So let’s see when can we schedule a time to do that.",
      "user": "U1BLREAAE",
      "ts": "1559728336.059200"
      */
      console.log(data);
      setChannelMessageList(data.messages);
    });
  }, []);

  const renderChatMessages = () => {
    return channelMessageList.map(({ text, ts, user }) => {
      return (
        <StyledChannelMessages>
          <div>{user}</div>
          <div>{text}</div>
          <div>{moment(ts * 1000).fromNow()}</div>
        </StyledChannelMessages>
      );
    });
  };

  return (
    <div>
      <h1>CodeTap Members Chat</h1>
      {renderChatMessages()}
    </div>
  );
};
