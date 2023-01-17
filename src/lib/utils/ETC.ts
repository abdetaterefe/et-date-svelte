export class ETC {
    now() {
        return this.year, this.month, this.day
    }
    get year() {
        const unixEpoch = 719163;
        const ethiopicEpoch = 2796;
        const fixed = unixEpoch + Math.floor(Date.now() / 86400000);
        return Math.floor((4 * (fixed - ethiopicEpoch) + 1463) / 1461);
    }
    get month() {
        const unixEpoch = 719163;
        const fixed = unixEpoch + Math.floor(Date.now() / 86400000);
        return Math.floor((fixed - this.fixedFromEthiopic(this.year, 1, 1)) / 30) + 1;
    }
    get day() {
        const unixEpoch = 719163;
        const fixed = unixEpoch + Math.floor(Date.now() / 86400000);
        return fixed + 1 - this.fixedFromEthiopic(this.year, this.month, 1);
    }

    isToday(year: number, month: number, day: number) {
        if (year == this.year && month == this.month && day == this.day) {
            return true
        } else {
            return false
        }
    }
    fixedFromEthiopic(year: number, month: number, day: number) {
        const ethiopicEpoch = 2796;
        return Math.floor(ethiopicEpoch - 1 + 365 * (year - 1) + year / 4 + 30 * (month - 1) + day);
    }
    getMonthName(month: number, eng: boolean) {
        const months = ['መስከረም', 'ጥቅምት', 'ኅዳር', 'ታኅሳስ', 'ጥር', 'የካቲት', 'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ኃምሌ', 'ነሐሴ', 'ጷጉሜን'];
        const months_eng = ["Meskerem", "Tikimet", "Hidar", "Tahisas", "Tir", "Yekatit", "Megabit", "Miyaziya", "Ginbot", "Sene", "Hamle", "Nehassie", "Pagumen"];
        if (!eng)
            return months_eng[month - 1]
        else
            return months[month - 1]
    }
}