import { ReplyContent } from "models/replyContent";

export default function commands (){
    CommandCombine({
        Tag: "reply",
        "Description": "reply to a chat message",
        Action: (args:string)  => {
            console.log(args.split(" "))
            const [targetNumber, ...messageParts] = args.split(" ");
            const message: string = messageParts.join(" ");
            if(message && message != ""){
                ServerSend(
                    "ChatRoomChat",
                    {
                        Content: message,
                        Type: "Chat",
                        Target: null,
                        Dictionary: [
                            {targetId: targetNumber},
                            {repliedMessage: Player.ExtensionSettings.BCA.repliedMessage},
                            {targetUser: Player.ExtensionSettings.BCA.targetUser}
                        ] as ReplyContent[]
                    }as any
                )
            }
            Player.ExtensionSettings.BCA = {}
    }
})
}
