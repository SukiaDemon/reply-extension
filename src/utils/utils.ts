import constants from "./constants";

export function sleep(ms: number): Promise<number> {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise(resolve => window.setTimeout(resolve, ms));
}

export async function waitFor(func: () => boolean, cancelFunc: () => boolean = () => false): Promise<boolean> {
    while (!func()) {
        if (cancelFunc()) {
            return false;
        }
        // eslint-disable-next-line no-await-in-loop
        await sleep(10);
    }
    return true;
}

export function initBCRMessage() {
    const bcrInitMessage = {
        Type: constants.HIDDEN,
        Content: constants.CONTENT,
        Sender: Player.MemberNumber,
        Dictionary: [
            {
                message: {
                    type: constants.INIT_TYPE,
                    bcrVersion: constants.MOD_VERSION,
                    target: null,
                },
            },
        ],
    };

    // @ts-ignore
    ServerSend("ChatRoomChat", bcrInitMessage);
}

export function replyToInitBCRMessage(target: number) {
    const bcrReplyToInitMessage = {
        Type: constants.HIDDEN,
        Content: constants.CONTENT,
        Sender: Player.MemberNumber,
        Dictionary: [
            {
                message: {
                    type: constants.INIT_REPLY_TYPE,
                    bcrVersion: constants.MOD_VERSION,
                    target: target,
                },
            },
        ],
    };

    // @ts-ignore
    ServerSend("ChatRoomChat", bcrReplyToInitMessage);
}

export const chatArrow = `M78.1 0v6.2c22.4 0 40.5 18.2 40.5 40.6s-18.1 40.6-40.5 40.6H17.9l27.9-28-4.5-4.5L5.5 90.8l36 36.2 4.5-4.5-28.8-28.9h60.9c25.8 0 46.7-21 46.7-46.8S103.9 0 78.1 0z`

export function drawIcon(
    ctx: CanvasRenderingContext2D,
    icon: string,
    x: number, y: number,
    width: number, height: number,
    baseSize: number,
    alpha: number,
    lineWidth: number,
    fillColor: string,
    strokeColor: string = "black"
) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.scale(width / baseSize, height / baseSize);
    ctx.fillStyle = fillColor;
    if (strokeColor) {
        ctx.strokeStyle = strokeColor;
    }
    ctx.lineWidth = lineWidth;
    const p = new Path2D(icon);
    ctx.fill(p);
    if (strokeColor) {
        ctx.stroke(p);
    }
    ctx.restore();
}