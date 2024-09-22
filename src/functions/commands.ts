export default function commands (){
    CommandCombine({
        Tag: "reply",
        "Description": "reply to a chat message",
        Action: (args:string)  => {
            console.log(args.split(" "))
            const [targetNumber, ...messageParts] = args.split(" ");
            const message = messageParts.join(" ");
            ServerSend(
            "ChatRoomChat",
            {
                Content: message,
                Type: "Chat",
                Target: null,
                Dictionary: [
                    {targetId: targetNumber},
                    {repliedMessageId: Player.ExtensionSettings.BCA.repliedMessageId},
                    {targetUser: Player.ExtensionSettings.BCA.targetUser}
                ]
            }as any
        )
    }
})
}
