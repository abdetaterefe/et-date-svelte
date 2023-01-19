import { ethiopicEpoch, hourMilliSec, minMilliSec, months, months_eng, secMilliSec, unixEpoch } from "./constants";

export class ETC {
    now() {
        return this.fixedFromUnix(Date.now())
    }
    get year() {
        const fixed = unixEpoch + Math.floor(Date.now() / 86400000);
        return Math.floor((4 * (fixed - ethiopicEpoch) + 1463) / 1461);
    }
    get month() {
        const fixed = unixEpoch + Math.floor(Date.now() / 86400000);
        return Math.floor((fixed - this.fixedFromEthiopic(this.year, 1, 1)) / 30) + 1;
    }
    get day() {
        const fixed = unixEpoch + Math.floor(Date.now() / 86400000);
        return fixed + 1 - this.fixedFromEthiopic(this.year, this.month, 1);
    }
    get hour() {
        return Math.floor(Date.now() / hourMilliSec) % 24;
    }
    get minute() {
        return Math.floor(Date.now() / minMilliSec) % 60;
    }
    get second() {
        return Math.floor((Date.now() / secMilliSec) % 60);
    }
    get millisecond() {
        return Date.now() % 1000;
    }
    isToday(year: number, month: number, day: number) {
        if (year == this.year && month == this.month && day == this.day) {
            return true
        } else {
            return false
        }
    }
    fixedFromEthiopic(year: number, month: number, day: number) {
        return Math.floor(ethiopicEpoch - 1 + 365 * (year - 1) + year / 4 + 30 * (month - 1) + day);
    }
    fixedFromUnix(ms: number) {
        return unixEpoch + Math.floor(ms / 86400000)
    }
    getMonthName(month: number, eng: boolean) {
        if (!eng)
            return months_eng[month - 1]
        else
            return months[month - 1]
    }
    getMonthsName(eng: boolean) {
        if (!eng)
            return months_eng
        else
            return months
    }
}