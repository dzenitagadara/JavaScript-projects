const scheduledMessages = [
    {
        id: 1,
        message: 'Kraj casa!',
        time: {
            hours: '00',
            minutes: '00',
            seconds: '05'
        }
    },
    {
        id: 2,
        message: 'Happy New Year!',
        time: {
            hours: '00',
            minutes: '10',
            seconds: '05'
        }
    },

];

const columns = ['id', 'message', 'time'];

const tableBody = document.querySelector('.table tbody');// fetch <tbody></tbody> so we can append rows to it
const addScheduledMessageBtn = document.getElementById('addScheduledMessageBtn');
const closeBtn = document.getElementById('closeBtn');
const saveBtn = document.getElementById('saveBtn');
const messageInput = document.getElementById('message');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondslInput = document.getElementById('seconds');
const messageError = document.getElementById('messageError');
const timeError = document.getElementById('timeError');

function getRandomId() {
    return Math.floor(Math.random() * 100);
}

function refreshList() {
    // Refresh list:
    tableBody.innerHTML = ''; // remove old content
    generateList(); // re-render list
}

function createNewTableRow(message) {
    const createdRow = document.createElement('tr');

    let cells = columns.map(column => {
        let cell = document.createElement('td');
        if (column === 'time') {
            cell.innerText = `${message.time.hours}:${message.time.minutes}:${message.time.seconds}`
        } else {
            cell.innerText = message[column];
        }
        return cell;
    });

    // Action cell (Start & Delete buttons)
    let cell = document.createElement('td');

    let startButton = document.createElement('button');
    startButton.innerText = 'Start';
    startButton.classList.add('btn', 'btn-success');

    startButton.onclick = function () {
        startScheduler(message);
    }
    cell.appendChild(startButton);


    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('btn', 'btn-danger');

    deleteButton.onclick = function () {
        deleteMessage(message.id);
    }
    cell.appendChild(deleteButton);

    cells.push(cell);
    // Action cell END

    createdRow.append(...cells);
    tableBody.appendChild(createdRow);
}

function generateList() {
    scheduledMessages.forEach(message => {
        createNewTableRow(message);
    });
}

function cleanUpForm() {
    hideAllErros();
    messageInput.value = '';
    hoursInput.value = '';
    minutesInput.value = '';
    secondslInput.value = '';
}

function openModal() {
    addModal.classList.add('show');
    addModal.style.display = 'block';
}

function closeModal() {
    addModal.classList.remove('show');
    addModal.style.display = 'none';
    cleanUpForm();
}

function hideAllErros() {
    messageError.classList.add('hide');
    timeError.classList.add('hide');
}

function checkIsFormValid() {
    let isValid = true;
    hideAllErros();
    isNaN

    if (!messageInput.value) {
        messageError.classList.remove('hide');
        isValid = false;
    }

    if (!hoursInput.value || !minutesInput.value || !secondslInput.value) {
        timeError.classList.remove('hide');
        isValid = false;
    }
    else if (isNaN(hoursInput.value) || isNaN(minutesInput.value) || isNaN(secondslInput.value)) {
        timeError.classList.remove('hide');
        isValid = false;
    }

    return isValid;
}

function formatTime(number) { // adds zero as prefix (for 6 we got 06)
    number = parseInt(number);

    if (!isNaN(number)) {
        if (number.toString().length === 1) {
            return `0${number}`;
        }
    }
    return number;
}

function deleteMessage(messageId) {
    const foundIndex = scheduledMessages.findIndex((obj => obj.id == messageId));
    if (foundIndex !== -1) {
        scheduledMessages.splice(foundIndex, 1);
        refreshList();
    }
}

addScheduledMessageBtn.onclick = function () {
    openModal();
}

closeBtn.onclick = function () {
    closeModal();
}

saveBtn.onclick = function () {
    if (!checkIsFormValid()) {
        return;
    }

    const newSchedulesMsg = {
        id: getRandomId(),
        message: messageInput.value,
        time: {
            hours: formatTime(hoursInput.value),
            minutes: formatTime(minutesInput.value),
            seconds: formatTime(secondslInput.value)
        }
    };

    scheduledMessages.push(newSchedulesMsg);
    refreshList();
    closeModal();
}

function convertTimeToMiliseconds(hours, mins, seconds) {
    return ((parseInt(hours) * 60 * 60 + parseInt(mins) * 60 + parseInt(seconds)) * 1000);
}

function startScheduler(message) {
    const miliseconds = convertTimeToMiliseconds(message.time.hours, message.time.minutes, message.time.seconds);
    setTimeout(function () {
        alert(message.message);
        deleteMessage(message.id);
    }, miliseconds);
}

generateList();