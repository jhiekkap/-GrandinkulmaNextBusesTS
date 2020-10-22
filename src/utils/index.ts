
export const getTime = (date:string) => date.split(' ')[4];

export const delayToString = (delay:number) => {
    const delayAbs = Math.abs(delay);
    let minutes: string =(Math.floor(delayAbs / 60)).toString();
    minutes = parseInt(minutes) === 0 ? '00' : (parseInt(minutes) < 10 ? '0' + minutes : minutes);
    let seconds = delayAbs < 10 ? '0' + delayAbs : delayAbs > 59 ? (delayAbs % 60 < 10 ? '0' + delayAbs % 60 : delayAbs % 60) : delayAbs;
    return `${delay < 0 ? '+' : ''}${minutes}:${seconds}`;
}
