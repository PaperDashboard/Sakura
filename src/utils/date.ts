export function getDay(date) {
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
}

export function isToday(date) {
    if (date === null) {
        return false;
    }

    if (getDay(new Date(date)) === getDay(new Date())) {
        return true;
    }

    return false;
}
