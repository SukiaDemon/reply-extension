import {mod} from "mod";
import {ReplyContent} from "../models/replyContent";
import constants from "../utils/constants";
import {customFocusColor} from "../css/css";
import {waitFor} from "./utils";

export let isReplyMode: boolean = false;
export let isWaitingForReply: boolean = false

export default function reply() {

    mod.hookFunction("ChatRoomMessage", 1, (args, next) => {

        if (args[0] && args[0].Type && args[0].Type == "Chat") {
            let chatMessage = args[0];

            // @ts-ignore
            let replyMessageData: ReplyContent = chatMessage.Dictionary.find(obj => {
                if (obj[constants.IS_REPLY_MESSAGE] && obj[constants.IS_REPLY_MESSAGE] == true) {
                    return obj as unknown as ReplyContent;
                }
                return false;
            });

            if (chatMessage.Dictionary && replyMessageData && replyMessageData.repliedMessage && replyMessageData.repliedMessageAuthor) {
                isWaitingForReply = true;
            }

            next(args)

            if (chatMessage.Content && chatMessage.Sender) {
                addButtonToLastMessage(args[0].Content, args[0].Sender);
            }

            if (chatMessage.Dictionary && replyMessageData && replyMessageData.repliedMessage && replyMessageData.repliedMessageAuthor) {
                addReplyBoxToLastMessage(replyMessageData.repliedMessage, replyMessageData.repliedMessageAuthor)
            }

        } else {
            next(args);
        }
    })

    mod.hookFunction("ServerSend", 1, (args, next) => {
        let replyMessageData: ReplyContent = {
            isReplyMessage: isReplyMode,
            targetId: repliedMessageAuthorNumber,
            repliedMessage: repliedMessage,
            repliedMessageAuthor: repliedMessageAuthor
        };
        if (args[1] && args[1]["Content"] && args[1]["Type"] == "Chat") {
            if (isReplyMode) {
                args[1]["Dictionary"].push(replyMessageData);
            }

            next(args);
            isReplyMode = false;
            customFocusColor.disable();

            const chatInput: HTMLTextAreaElement | null = document.getElementById(constants.InputChat_DIV_ID) as HTMLTextAreaElement | null;
            if (chatInput) {
                chatInput.placeholder = constants.TALK_TO_EVERYONE_PLACEHOLDER;
            }

            const closeButtonHtml = document.getElementById(constants.CHAT_ROOM_REPLY_CLOSE) as HTMLElement;
            if (closeButtonHtml) {
                closeButtonHtml.remove();
            }

        } else {
            next(args);
        }
    });

    mod.hookFunction("ElementScrollToEnd", 1, async (args, next) => {
        if (isWaitingForReply) {
            await waitFor(() => !!addReplyBoxToLastMessage);
            next(args)
        }
        next(args)
    })
}

export let repliedMessage: string = "";
export let repliedMessageAuthor: string
export let repliedMessageAuthorNumber: number

function addButtonToLastMessage(messageText: string, messageSenderNumber: number) {
    const chatContainer = document.querySelector(constants.TEXT_AREA_CHAT_LOG);
    let lastMessage = null;

    if (chatContainer) {
        lastMessage = chatContainer.querySelector(constants.CHAT_MESSAGE_CHAT_LAST_OF_TYPE);
    }

    if (lastMessage) {

        const userNameDiv = lastMessage.querySelector('.ChatMessageName');
        const userName = userNameDiv.innerText;

        let button = ElementButton.Create(
            null,
            () => {

                const closeButtonHtml = document.getElementById(constants.CHAT_ROOM_REPLY_CLOSE) as HTMLElement

                repliedMessage = messageText;
                repliedMessageAuthor = userName;
                repliedMessageAuthorNumber = messageSenderNumber;

                const chatInput: HTMLTextAreaElement | null = document.getElementById(constants.InputChat_DIV_ID) as HTMLTextAreaElement | null;
                //chatInput.value = `/reply ${sender} ${chatInput.value.replace(/\/reply\s*\d+ ?/u, "")}`;
                isReplyMode = true;
                chatInput.placeholder = "Reply to " + repliedMessageAuthor;

                if (Player.ExtensionSettings.BCA.settings.enableCustomFocusColor) {
                    customFocusColor.enable(Player.ExtensionSettings.BCA.settings.customFocusColor);
                }
                chatInput.focus();

                if (!closeButtonHtml) {
                    const closeButton = ElementButton.Create(
                        constants.CHAT_ROOM_REPLY_CLOSE, () => {
                            isReplyMode = false;
                            if (Player.ExtensionSettings.BCA.settings.enableCustomFocusColor) {
                                customFocusColor.disable();
                            }
                            chatInput.placeholder = constants.TALK_TO_EVERYONE_PLACEHOLDER
                            repliedMessage = "";
                            repliedMessageAuthor = "";
                            repliedMessageAuthorNumber = null;
                            const closeButtonHtmlAfterClick = document.getElementById(constants.CHAT_ROOM_REPLY_CLOSE) as HTMLElement
                            closeButtonHtmlAfterClick.remove();
                            collapseButton.setAttribute("aria-expanded", "false");
                            collapseButton.textContent = "<"
                        },
                        // @ts-ignore
                        {noStyling: true},
                        {button: {classList: ["chat-room-button"]}},
                    )
                    const buttonBox = document.getElementById("chat-room-buttons") as HTMLTextAreaElement
                    const collapseButton = document.getElementById("chat-room-buttons-collapse") as HTMLElement;
                    collapseButton.setAttribute("aria-expanded", "true");
                    collapseButton.textContent = ">"
                    buttonBox.appendChild(closeButton);
                }
            },
            // @ts-ignore
            {noStyling: true},
            {button: {classList: ["ChatReplyButton"], children: [" \u21a9\ufe0f"]}}
        )
        lastMessage.onmouseenter = () => {
            button.style.display = "inline-block";
        };
        lastMessage.onmouseleave = () => {
            button.style.display = "none";
        };
        lastMessage.appendChild(button);
    }
}

function addReplyBoxToLastMessage(messageText: string, messageSender: string) {

    if (messageText && messageSender) {
        const replyDiv = ElementCreateDiv("replyMessageDiv" + new Date().getTime());

        const maxLength = 100;

        if (messageText.length >= maxLength) {
            messageText = messageText.slice(0, maxLength) + "...";
        }

        replyDiv.textContent = messageSender + ": " + messageText;
        replyDiv.classList.add("ChatReplyBox");

        const chatContainer = document.querySelector(constants.TEXT_AREA_CHAT_LOG);
        let lastMessage = null;

        if (chatContainer) {
            lastMessage = chatContainer.querySelector(constants.CHAT_MESSAGE_CHAT_LAST_OF_TYPE);
        }

        if (lastMessage) {
            chatContainer.insertBefore(replyDiv, lastMessage);
        }

        isWaitingForReply = false;
    }

}