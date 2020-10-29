import { getTime, delayToString } from '.';

   
test('Anna kloaika aikastringistä', () => {
    const aNewDateToString = new Date('2020-10-29T06:48:39.870Z');
    expect(getTime(aNewDateToString)).toBe('08:48:39');  /// UTC + 2
});

test('täydennä viiveen minuuttien ja sekuntien esitys (muoto 00:00) nollilla jos numerot alle 10', () => {
    const delay1 = 9;
    expect(delayToString(delay1)).toBe('00:09');
    const delay2 = 61;
    expect(delayToString(delay2)).toBe('01:01');
    const delay3 = 549;
    expect(delayToString(delay3)).toBe('09:09');
    const delay4 = 601;
    expect(delayToString(delay4)).toBe('10:01');
});

 










