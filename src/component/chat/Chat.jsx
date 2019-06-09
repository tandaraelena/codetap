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
    axios
      .all([
        axios.get(GET_GENERAL_CHANNEL_HISTORY),
        axios.get(GET_ALL_USERS_LIST)
      ])
      .then(
        axios.spread((messagesResponse, usersResponse) => {
          const userList = usersResponse.data.members;
          const messageList = messagesResponse.data.messages.map(message => {
            const ceva = userList.filter(user => user.id === message.user);
            return {
              ...message,
              niceName: ceva.reduce(a => a).real_name
            };
          });
          setChannelMessageList(messageList);
        })
      );
  }, []);

  const renderChatMessages = () => {
    return channelMessageList.map(({ text, ts, niceName }) => {
      return (
        <StyledChannelMessages>
          <div>{niceName}</div>
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
