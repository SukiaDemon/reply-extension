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

export const chatArrow = `M1513.827 1278.28c-96.772 0-182.634 43.765-241.415 111.531l-564.2-325.737c11.807-33.498 19.508-69.049 19.508-106.654 0-34.91-7.06-68.022-17.327-99.595l563.815-325.48c58.782 66.482 143.746 109.35 239.619 109.35 177.243 0 320.86-143.618 320.86-320.86 0-177.244-143.617-320.86-320.86-320.86-177.243 0-320.86 143.616-320.86 320.86 0 35.165 7.059 68.407 17.454 99.98l-563.686 325.48C587.953 679.554 502.86 636.56 406.86 636.56 229.617 636.56 86 780.177 86 957.42c0 177.243 143.617 320.86 320.86 320.86 93.434 0 176.601-40.428 235.254-104.215l567.537 327.662c-9.882 30.803-16.684 63.145-16.684 97.413 0 177.243 143.617 320.86 320.86 320.86 177.243 0 320.86-143.617 320.86-320.86 0-177.243-143.617-320.86-320.86-320.86`

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

export function DrawTextWithRectangle(
    ctx: CanvasRenderingContext2D,
    text: string,
    textSize: number,
    rectX: number, rectY: number,
    rectWidth: number, rectHeight: number,
    rectColor: string,
    textColor: string,
) {
    ctx.save();
    ctx.fillStyle = rectColor
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

    ctx.font = `${textSize}px Arial`
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = textColor;

    ctx.fillText(text, rectX + rectWidth / 2, rectY + rectHeight / 2);

    ctx.restore()
}