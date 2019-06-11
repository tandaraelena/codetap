import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  GET_ALL_USERS_LIST,
  GET_GENERAL_CHANNEL_HISTORY
} from "./chatConstants";
import { StyledChannelMessages } from "./chatStyle.js";
import { UserSpan } from "./chatUserComponent";
import ChatAvatar from "./chatAvatar";

export const Chat = () => {
  const [channelMessageList, setChannelMessageList] = useState([]);
  /* I will retrieve fullname or nickname from the profile.  
    Sometimes I have display_name, sometimes real_name
  */
  const getNames = profile => {
    const { display_name, real_name, image_48 } = profile;
    return {
      name: display_name || real_name,
      avatar: image_48
    };
  };

  const convertMessageToComponentData = (text2, pni) => {
    return [...text2].reduce((a, c) => {
      return [
        ...a,
        {
          type: "span",
          text: c
        },
        {
          type: "user",
          text: pni.name
        }
      ];
    }, []);
  };

  useEffect(() => {
    axios
      .all([
        axios.get(GET_GENERAL_CHANNEL_HISTORY),
        axios.get(GET_ALL_USERS_LIST)
      ])
      .then(
        axios.spread((messagesResponse, usersResponse) => {
          const userList = usersResponse.data.members;
          console.log(userList);
          const messageList = messagesResponse.data.messages.map(message => {
            const something = userList.filter(user => user.id === message.user);
            // U1BLREAAE
            const mentionedUserId = message.text.match(/<@[A-Z0-9]+>/gm) || [];
            const pairedNiceIdList = mentionedUserId.map(FBI => {
              const name =
                "@" +
                getNames(
                  userList
                    .filter(user => user.id === FBI.slice(2, -1))
                    .reduce(a => a).profile
                ).name;
              return {
                id: FBI,
                name
              };
            });

            const niceNameAndAvatar = getNames(
              something.reduce(a => a).profile
            );
            let textToBeSplit = message.text;
            let text2List = [];
            pairedNiceIdList.forEach(pni => {
              const text2 = textToBeSplit.split(pni.id);
              if (!text2List.length) {
                text2List = convertMessageToComponentData(text2, pni);
                text2List = text2List.slice(0, -1);
              } else {
                text2List = text2List.map(t => {
                  const text2 = t.text.split(pni.id);
                  if (t.type !== "span" || text2.length === 1) return t;
                  else if (text2.length > 1) {
                    const gigiKent = convertMessageToComponentData(text2, pni);
                    return gigiKent.slice(0, -1);
                  }
                  return t;
                });
              }
            });
            const text = pairedNiceIdList.length
              ? text2List
                  .flatMap(z => z)
                  .map(({ type, text }, key) => {
                    return type === "span" ? (
                      <span key={`${text}-${key}`}>{text}</span>
                    ) : (
                      <UserSpan key={`${text}-${key}`} text={text} />
                    );
                  })
              : message.text;

            return {
              ...message,
              text,
              niceName: niceNameAndAvatar.name,
              avatar: niceNameAndAvatar.avatar
            };
          });
          setChannelMessageList(messageList);
        })
      );
  }, []);

  const renderChatMessages = () => {
    return channelMessageList.map(({ text, ts, niceName, avatar }) => {
      return (
        <StyledChannelMessages key={ts}>
          <ChatAvatar imagePath={avatar} />
          <div>
            <b>{niceName}</b> {moment(ts * 1000).fromNow()}
            <div>{text}</div>
          </div>
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
