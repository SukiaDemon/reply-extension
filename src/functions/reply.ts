import {mod} from "mod";
import {ReplyContent} from "../models/replyContent";
import constants from "../utils/constants";
import {customFocusColor} from "../css/css";
import {
    chatArrow,
    drawIcon,
    DrawTextWithRectangle,
    initBCRMessage,
    replyToInitBCRMessage,
    waitFor
} from "../utils/utils";

export let isReplyMode: boolean = false;
export let isWaitingForReply: boolean = false;
export let isWaitingForAddButton: boolean = false;

export default function reply() {


    mod.hookFunction("ChatRoomCharacterViewDrawOverlay", 2, (args, next) => {
        next(args);
        const [C, CharX, CharY, Zoom] = args;
        if (C.BCR && ChatRoomHideIconState == 0) {
            drawIcon(MainCanvas, chatArrow, CharX + 330 * Zoom, CharY + 5, 15 * Zoom, 15 * Zoom, 700, 0.7, 4, "#f32a40");
            if (MouseHovering(CharX + 330 * Zoom, CharY + 10 * Zoom, 50 * Zoom, 50 * Zoom)) {
                if (C.MemberNumber === 35982) {
                    DrawTextWithRectangle(MainCanvas, "Blue haired Mistress", 25 * Zoom, CharX + 150 * Zoom, CharY + 60 * Zoom, 250 * Zoom, 40 * Zoom, "Black", "White");
                } else {
                    DrawTextWithRectangle(MainCanvas, C.BCR + " version", 25 * Zoom, CharX + 250 * Zoom, CharY + 60 * Zoom, 145 * Zoom, 40 * Zoom, "Black", "White");
                }
            }
        }
    });

    mod.hookFunction("ChatRoomLoad", 2, (args, next) => {
        next(args);
        initBCRMessage();
    });

    mod.hookFunction("ChatRoomMessage", 1, (args, next) => {

        if (args[0] && args[0].Type && args[0].Type == "Chat") {
            let chatMessage = args[0];
            let replyMessageData: ReplyContent = null;
            let bcrID: number = null;
            let repliedBcrID: number = null
            // @ts-ignore
            if (chatMessage.Dictionary) {

                chatMessage.Dictionary.find(obj => {
                    if (obj['uniqueBcrID']) {
                        bcrID = obj['uniqueBcrID'];
                    }
                    if (obj['repliedBcrID']) {
                        repliedBcrID = obj['repliedBcrID'];
                    }
                })

                replyMessageData = chatMessage.Dictionary.find(obj => {
                    if (obj[constants.IS_REPLY_MESSAGE] && obj[constants.IS_REPLY_MESSAGE] == true) {
                        return obj as unknown as ReplyContent;
                    }
                    return false;
                });
            }

            if (replyMessageData && replyMessageData.repliedMessage && replyMessageData.repliedMessageAuthor) {
                isWaitingForReply = true;
            }

            if (chatMessage.Content && chatMessage.Sender) {
                isWaitingForAddButton = true;
            }

            next(args)

            const chatContainer = document.querySelector(constants.TEXT_AREA_CHAT_LOG) as HTMLElement;
            let lastMessage = null;

            if (chatContainer) {
                lastMessage = chatContainer.querySelector(constants.CHAT_MESSAGE_CHAT_LAST_OF_TYPE);
            }
            if (lastMessage) {
                lastMessage.setAttribute("bcrID", bcrID)
            }


            if (chatMessage.Content && chatMessage.Sender) {
                addButtonToLastMessage(lastMessage, args[0].Content, args[0].Sender, bcrID);
            }

            if (chatMessage.Dictionary && replyMessageData && replyMessageData.repliedMessage && replyMessageData.repliedMessageAuthor) {
                addReplyBoxToLastMessage(chatContainer, lastMessage, replyMessageData.repliedMessage, replyMessageData.repliedMessageAuthor, repliedBcrID)
            }

        } else {
            next(args);
            if (args[0]) {
                if (args[0].Type === constants.HIDDEN && args[0].Content === constants.CONTENT) {

                    if (args[0].Dictionary[0].message.type == constants.INIT_TYPE && args[0].Sender != Player.MemberNumber) {
                        replyToInitBCRMessage(args[0].Sender);
                    }

                    const sender = Character.find((a) => a.MemberNumber === args[0].Sender);
                    if (sender && sender.ID != 0 && args[0].Dictionary[0].message.bcrVersion) {
                        // @ts-ignore
                        sender.BCR = args[0].Dictionary[0].message.bcrVersion
                    }
                }
            }
        }
    })

    mod.hookFunction("ServerSend", 1, (args, next) => {
        let replyMessageData: ReplyContent = {
            isReplyMessage: isReplyMode,
            targetId: repliedMessageAuthorNumber,
            repliedMessage: repliedMessage,
            repliedMessageAuthor: repliedMessageAuthor,
            repliedBcrID: repliedBcrID,
            uniqueBcrID: Date.now()
        };
        if (args[1] && args[1]["Content"] && args[1]["Type"] == "Chat") {
            if (isReplyMode) {
                args[1]["Dictionary"].push(replyMessageData);
            } else {
                args[1]["Dictionary"].push(
                    {uniqueBcrID: Date.now()})
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
            next(args);
        }
        if (isWaitingForAddButton) {
            await waitFor(() => !!addButtonToLastMessage);
            isWaitingForAddButton = false;
            next(args);
        }
        next(args)
    })
}

export let repliedMessage: string = "";
export let repliedMessageAuthor: string;
export let repliedMessageAuthorNumber: number;
export let repliedBcrID: number;

function addButtonToLastMessage(lastMessage: HTMLElement | null, messageText: string, messageSenderNumber: number, bcrID: number) {

    if (lastMessage) {

        const userNameDiv = lastMessage.querySelector('.ChatMessageName') as HTMLElement;
        const userName = userNameDiv.innerText;

        const span = document.createElement("span");
        span.classList.add("ChatReplyButton");

        lastMessage.onmouseenter = () => {
            span.style.visibility = "visible";
        };
        lastMessage.onmouseleave = () => {
            span.style.visibility = "hidden";
        };

        span.innerHTML = "&nbsp\u21a9\ufe0f"
        span.onclick = () => {
            {

                const closeButtonHtml = document.getElementById(constants.CHAT_ROOM_REPLY_CLOSE) as HTMLElement

                repliedMessage = messageText;
                repliedMessageAuthor = userName;
                repliedMessageAuthorNumber = messageSenderNumber;
                repliedBcrID = bcrID;

                const chatInput: HTMLTextAreaElement | null = document.getElementById(constants.InputChat_DIV_ID) as HTMLTextAreaElement | null;
                //chatInput.value = `/reply ${sender} ${chatInput.value.replace(/\/reply\s*\d+ ?/u, "")}`;
                isReplyMode = true;

                let placeholderText = messageText
                if (messageText.length > 10) {
                    placeholderText = placeholderText.slice(0, 10) + "..."
                }

                chatInput.placeholder = "Reply to " + repliedMessageAuthor + ": " + placeholderText;

                if (Player.ExtensionSettings.BCR.settings.enableCustomFocusColor) {
                    customFocusColor.enable(Player.ExtensionSettings.BCR.settings.customFocusColor);
                }
                chatInput.focus();

                if (!closeButtonHtml) {
                    const closeButton = ElementButton.Create(
                        constants.CHAT_ROOM_REPLY_CLOSE, () => {
                            isReplyMode = false;
                            if (Player.ExtensionSettings.BCR.settings.enableCustomFocusColor) {
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
            }

        }
        lastMessage.appendChild(span)
    }
}

function addReplyBoxToLastMessage(chatContainer: HTMLElement, lastMessage: HTMLElement, messageText: string, messageSender: string, bcrID: number) {

    if (messageText && messageSender) {
        const replyDiv = ElementCreateDiv("replyMessageDiv" + new Date().getTime());
        replyDiv.setAttribute("repliedBcrID", bcrID);
        let targetReplyBoxDiv = chatContainer.querySelector(`[bcrID="${bcrID}"]`) as HTMLElement;

        replyDiv.onclick = () => {
            if (chatContainer) {
                if (targetReplyBoxDiv) {
                    chatContainer.scrollTo({
                        // @ts-ignore
                        top: targetReplyBoxDiv.offsetTop - chatContainer.offsetTop - 200,
                        behavior: 'smooth',
                    });
                    targetReplyBoxDiv.classList.add('flash-animation');

                    setTimeout(() => {
                        targetReplyBoxDiv.classList.remove('flash-animation');
                    }, 2000);
                } else {
                    console.log("No ReplyBox with that bcrID!")
                }
            }
        }

        const maxLength = 100;

        if (messageText.length >= maxLength) {
            messageText = messageText.slice(0, maxLength) + "...";
        }

        replyDiv.textContent = messageSender + ": " + messageText;
        replyDiv.classList.add("ChatReplyBox");

        if (lastMessage) {
            if (targetReplyBoxDiv) {
                replyDiv.style.cursor = 'pointer'
            }
            chatContainer.insertBefore(replyDiv, lastMessage);
        }

        isWaitingForReply = false;
    }

}