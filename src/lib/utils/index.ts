import { ETC } from "./ETC";

function monthRangeEt(year: number, month: number) {
    return month === 13 ? ((year % 4 === 3) ? 6 : 5) : 30;
}

function monthBeginningEt(year: number, month: number) {
    const ameteFida = 5500;
    const ameteAlem = ameteFida + year;
    const rabeet = Math.floor(ameteAlem / 4);
    const firstDay = (ameteAlem + rabeet) % 7;
    return (firstDay + (month - 1) * 2) % 7;
}

export function getCalendar(year: number, month: number) {
    let etDayNumbers = ['፩', '፪', '፫', '፬', '፭', '፮', '፯', '፰', '፱', '፲', '፲፩', '፲፪', '፲፫', '፲፬', '፲፭', '፲፮', '፲፯', '፲፰', '፲፱', '፳', '፳፩', '፳፪', '፳፫', '፳፬', '፳፭', '፳፮', '፳፯', '፳፰', '፳፱', '፴'];
    etDayNumbers = etDayNumbers.slice(0, monthRangeEt(year, month));
    const dayNumbers = Array.from({ length: monthRangeEt(year, month) }, (_, i) => i + 1)
    const monthBeginning = monthBeginningEt(year, month);
    const isToday = new ETC()
    const calendar = [];
    let mo = -monthBeginning;
    for (let week = 0; week < 5; week++) {
        const week = [];
        for (let days = 0; days < 7; days++) {
            week.push({
                value: dayNumbers[mo] ? dayNumbers[mo] : '',
                etValue: etDayNumbers[mo] ? etDayNumbers[mo] : '',
                disabled: dayNumbers[mo] ? false : true,
                today: isToday.isToday(year, month, dayNumbers[mo])
            });
            mo++;
        }
        calendar.push(week);
    }
    return calendar
}