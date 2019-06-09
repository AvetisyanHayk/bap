function addMinutes (minutes, date) {
    if (!date) {
        date = new Date();
    } else {
        date = new Date(date.getTime())
    }
    date.setMinutes(date.getMinutes() + minutes);
    return date;
}

module.exports = {
    addMinutes,
}