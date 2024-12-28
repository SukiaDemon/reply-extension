import {ReplyContent} from "models/replyContent";
import {repliedMessage, sender} from "./reply";

export default function commands() {
    CommandCombine({
        Tag: "reply",
        "Description": "reply to a chat message",
        Action: (args: string) => {
            console.log(args.split(" "))
            const [targetNumber, ...messageParts] = args.split(" ");
            const message: string = messageParts.join(" ");
            if (message && message != "") {
                let generatedMessage = ChatRoomGenerateChatRoomChatMessage("Chat", message);
                ServerSend(
                    "ChatRoomChat",
                    {
                        Content: generatedMessage.Content,
                        Type: generatedMessage.Type,
                        Target: generatedMessage.Target,
                        Dictionary: [
                            {targetId: targetNumber, repliedMessage: repliedMessage, targetUser: sender},
                        ] as ReplyContent[]
                    } as any
                )
            }
            Player.ExtensionSettings.BCA.repliedMessage = "";
            Player.ExtensionSettings.BCA.targetUser = "";
        }
    })
}
