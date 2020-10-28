import { getTime, delayToString } from '.';

   
test('Anna kloaika aikastringistä', () => {
    const aNewDateToString = 'Wed Oct 28 2020 09:42:08 GMT+0200 (GMT+02:00)';
    expect(getTime(aNewDateToString)).toBe('09:42:08');
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

 










