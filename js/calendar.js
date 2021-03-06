today = new Date();
currentDay = today.getDate()
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
// selectMonth = document.getElementById("month");

months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

function showCalendar(month, year, jsonData) {

    

    calendar = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    calendar.innerHTML = "";

    // filing data about month and in the page via DOM.
    // monthAndYear.innerHTML = months[month] + " " + year;
    // selectYear.value = year;
    // selectMonth.value = month;


    for (let k = 0; k<=month; k++){
        let monthDiv = document.createElement("div")
        monthDiv.classList.add("month")
        let monthTitle = document.createElement("h2")
        monthTitle.textContent = months[k]
        monthDiv.appendChild(monthTitle)

        let monthPictures = document.createElement("div")
        let firstDay = ((new Date(year, k)).getDay() + 6)%7
        let date = 1;
        for (let i = 0; i < 6; i++) {
            // creates a table row
            let row = document.createElement("div");
            row.classList.add("row")

            //creating individual cells, filing them up with data.
            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < firstDay) || date > daysInMonth(k, year) || (date >= currentDay+1 && year === currentYear && k === currentMonth )) {
                    let polaroid = document.createElement("div");
                    polaroid.classList.add("col", "polaroid");
                    row.appendChild(polaroid);
                }

                else {
                    let polaroid = document.createElement("div");
                    polaroid.id = String(year) + "-" + String(k+1).padStart(2, "0") + "-" + String(date).padStart(2, "0")
                    let isRotated = Math.random() > 0.8
                    if (isRotated){
                        let rotation = String(Math.random()*10 - 10/2);  
                        polaroid.style.transform="rotate("+rotation+"deg)"
                    }
                    polaroid.classList.add("col", "polaroid");

                    if (date === currentDay && year === currentYear && k === currentMonth) {
                        polaroid.classList.add("bg-info");
                    } // color today's date

                    if (typeof jsonData.moods?.[year]?.[k+1]?.[date] !== "undefined"){
                        let dayText = jsonData.moods?.[year]?.[k+1]?.[date]?.entries?.[0]?.optionalDescription.split(/[\r?\n]{2,}/);
                        
                        let dayAnnotation = document.createElement("div");
                        dayAnnotation.classList.add("dayAnnotation")

                        let dayDate = document.createElement("div");
                        dayDate.innerText = String(date)+":"
                        dayDate.classList.add("dayDate")

                        let dayTitle = document.createElement("div");
                        dayTitle.innerText = dayText[0]
                        dayTitle.classList.add("dayTitle")

                        dayAnnotation.appendChild(dayDate)
                        dayAnnotation.appendChild(dayTitle)
                        polaroid.appendChild(dayAnnotation)
                        // dayText.forEach(item => console.log(item))
                    }
                    let frame = document.createElement("img")
                    frame.classList.add("img-fluid")
                    frame.src = "resources/frame.jpg"

                    let image = document.createElement("img")
                    image.classList.add("picture")
                    
                    polaroid.appendChild(frame)
                    polaroid.appendChild(image)
                    row.appendChild(polaroid);
                    date++;
                }
            }
            monthPictures.appendChild(row); // appending each row into calendar body.
            if (date >= currentDay+1 && year === currentYear && k === currentMonth ) {
                break;
            }
        }
        monthDiv.appendChild(monthPictures)
        calendar.appendChild(monthDiv)
    }
}


// check how many days in a month code from https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

let jsonText;
$.getJSON("Moodflow Backup.json", function(json) {
    jsonText = json; // this will show the info it in firebug console
    test(jsonText)
    showCalendar(currentMonth, currentYear, jsonText)
});

function test(jsonFile) {
    console.log(jsonFile)
}
$(window).on('load', function() {
    $(".dayTitle").fitText(1);
});

let jsonImg;
$.getJSON("https://api.onedrive.com/v1.0/shares/u!aHR0cHM6Ly8xZHJ2Lm1zL2YvcyFBbF82UEhpR3ViWlVoUHNxSHdLVXRQdE4zWGhCM0E=/root?expand=children", function(json) {
    jsonImg = json; // this will show the info it in firebug console
    test(jsonImg.children[0])
    populateImages(jsonImg)
});

function populateImages(json){
    json.children.forEach(function(obj){
        if (obj.file.mimeType === "image/jpeg"){
            try {
                console.log(obj.file.mimeType);
            link = obj["@content.downloadUrl"]
            console.log(link);
            date = obj.photo.takenDateTime.substring(0, 10);
            console.log(date);
            $("#"+date +"> .picture")[0].src = link
            // polaroid = document.getElementById(date);
            // polaroid.lastChild.src = link
            } catch (error) {
                console.log(error)
            }
            
        }
    })
}
