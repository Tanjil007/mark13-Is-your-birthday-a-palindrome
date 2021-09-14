function reverseString(str) {
    var listOfCharacter = str.split('');
    var reverseListOfCharacter = listOfCharacter.reverse();
    var reversedString = reverseListOfCharacter.join('')
    return reversedString;
}

function isPalandrome(str) {
    var reverse = reverseString(str);
    if(str === reverse) {
        return true;
    } else {
        return false;
    }

}

function convertDateToString(date) {
    var dateString = {day: '', month: '', year: ''};

    if(date.day < 10) {
        dateString.day = '0' + date.day;
    } else {
        dateString.day = date.day.toString();
    }
    if(date.month < 10) {
        dateString.month = '0' + date.month;
    } else {
        dateString.month = date.month.toString();
    }

    dateString.year = date.year.toString();

    return dateString;
}


function getAllDateFormat(date) {
    var dateStr = convertDateToString(date);
    
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmyyyydd = dateStr.month + dateStr.year + dateStr.day;
    var yyyyddmm = dateStr.year + dateStr.day + dateStr.month;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmyydd = dateStr.month + dateStr.year.slice(-2) + dateStr.day;
    var yyddmm = dateStr.year.slice(-2) + dateStr.day + dateStr.month;

    return [ddmmyyyy, mmyyyydd, yyyyddmm, ddmmyy, mmyydd, yyddmm];

}

function checkPalandromeForAllDateFormat(date) {
    var listOfPalandrome = getAllDateFormat(date);
    // console.log(listOfPalandrome);

    var flag = false;

    for(i = 0; i < listOfPalandrome.length; i++) {
        if(isPalandrome(listOfPalandrome[i])) {
            flag =  true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {
    if(year % 400 === 0) {
        return true;
    }
    if(year % 100 === 0) {
        return false;
    }
    if(year % 4 === 0) {
        return true;
    }

        return false;

}

function getNextDate(date) {
    day = date.day + 1;
    month = date.month;
    year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(day === 2) {
       if(isLeapYear(year)) {
           if(day > 29) {
               day = 1;
               month++;
           }
           else {
               if(day > 28) {
                   day = 1;
                   month++;
               }
           }
       }
    }
    else {
        if(day > daysInMonth[month-1]) {
            day = 1;
            month++;
        }
    }
    if(month > 12) {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    }
}

function getnextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date)

    while(1) {
        ctr++;
        var isPalindrome = checkPalandromeForAllDateFormat(nextDate);

        if(isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}


var date = {
    day: 31,
    month: 12,
    year: 2020
};

// console.log(getnextPalindromeDate(date));

var dateInput = document.querySelector("#bday-input");
var showButton = document.querySelector("#show-button");
var outputRef = document.querySelector("#output");

function clickHandler() {
    var bdayStr = dateInput.value;
    
    if(bdayStr !== "") {
        var listOfDate = bdayStr.split("-");
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };

        var isPalindrome = checkPalandromeForAllDateFormat(date);
        
        if(isPalindrome) {
            outputRef.innerText = 'Yay! your birthday is a palindrome 🎈'
        } else {
            var [ctr, nextDate] = getnextPalindromeDate(date);
            outputRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days!`
        }
    }

}

showButton.addEventListener('click', clickHandler)