import moment from 'moment'

export class DateUtils {
    GetDateFormatted = (dateTime) => {
        //"October 16, 2020"
        return moment((new Date(dateTime)).getTime()).format('MMMM DD, YYYY');
    }

    GetDateTimeFormatted = (dateTime) => {
        //"October 16, 2020, 09:34 PM"
        return moment((new Date(dateTime)).getTime()).format('MMMM DD, YYYY, HH:mm A');
    }

    GetTimeDifferenceFromNow = (dateString) => {
        var rightNow = new Date();
        var then = new Date(dateString);
        var diff = rightNow - then;

        var second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

        if (isNaN(diff) || diff < 0) {
        return ""; // return blank string if unknown
        }

        if (diff < second * 2) {
        // within 2 seconds
        return "2s";
        }

        if (diff < minute) {
        return Math.floor(diff / second) + "s";
        }

        if (diff < minute * 2) {
        return "1min";
        }

        if (diff < hour) {
        return Math.floor(diff / minute) + "min";
        }

        if (diff < hour * 2) {
        return "1hr";
        }

        if (diff < day) {
        return Math.floor(diff / hour) + "hr";
        }

        if (diff > day && diff < day * 2) {
        return "1d";
        }

        if (diff < day * 365) {
        return Math.floor(diff / day) + "d";
        }

        else {
            return "over 1yr";
        }
     }
}

export default new DateUtils();
