today = new Date();
currentDay = today.getDate()
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
// selectMonth = document.getElementById("month");

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

showCalendar(currentMonth, currentYear)

function chooseYear() {
    var yearElem = document.getElementById("year")
    let selectYear = parseInt(yearElem.options[yearElem.selectedIndex].value);
    console.log(currentYear, selectYear)
    if (currentYear !== selectYear) {
        showCalendar(11, selectYear);
    }
    else {
        showCalendar(currentMonth, currentYear)
        console.log(currentMonth, currentYear)
    }
}


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    

    calendar = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    calendar.innerHTML = "";

    // filing data about month and in the page via DOM.
    // monthAndYear.innerHTML = months[month] + " " + year;
    // selectYear.value = year;
    // selectMonth.value = month;


    for (let k = 0; k<=month; k++){
        let monthTitle = document.createElement("h2")
        monthTitle.textContent = months[k]
        calendar.appendChild(monthTitle)

        let monthPictures = document.createElement("div")
        let firstDay = ((new Date(year, k)).getDay() + 6)%7
        console.log(firstDay)
        let date = 1;
        for (let i = 0; i < 6; i++) {
            // creates a table row
            let row = document.createElement("div");
            row.classList.add("row")

            //creating individual cells, filing them up with data.
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    let polaroid = document.createElement("div");
                    polaroid.classList.add("col");
                    row.appendChild(polaroid);
                }
                else if (date > daysInMonth(k, year) || (date >= currentDay+1 && year === currentYear && k === currentMonth )) {
                    break;
                }

                else {
                    let polaroid = document.createElement("div");
                    polaroid.classList.add("col");
                    polaroid.textContent = date;
                    if (date === currentDay && year === currentYear && k === currentMonth) {
                        polaroid.classList.add("bg-info");
                    } // color today's date
                    let frame = document.createElement("img")
                    frame.classList.add("img-fluid")
                    frame.src = "resources/frame.jpg"
                    polaroid.appendChild(frame)
                    row.appendChild(polaroid);
                    date++;
                }


            }

            monthPictures.appendChild(row); // appending each row into calendar body.
        }
        calendar.appendChild(monthPictures)
    }
}


// check how many days in a month code from https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}
