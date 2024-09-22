let _replyMessage: string = "";

export function getReplyMessage(): string {
    return _replyMessage;
}

export function setReplyMessage(value: string): void{
    _replyMessage = value;
}