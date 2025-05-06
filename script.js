document.addEventListener('DOMContentLoaded', () => {
    const targetDateInput = document.getElementById('targetDate');
    const targetTimeInput = document.getElementById('targetTime');
    const startButton = document.getElementById('startButton');
    const daysDisplay = document.getElementById('days');
    const hoursDisplay = document.getElementById('hours');
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const messageDisplay = document.getElementById('message');
    let countdownInterval;

    startButton.addEventListener('click', () => {
        const targetDateValue = targetDateInput.value;
        const targetTimeValue = targetTimeInput.value;

        if (!targetDateValue || !targetTimeValue) {
            alert('Please select both the date and time.');
            return;
        }

        const targetDateTimeString = `${targetDateValue}T${targetTimeValue}:00`;
        const targetDate = new Date(targetDateTimeString).getTime();

        if (isNaN(targetDate)) {
            alert('Invalid date or time format.');
            return;
        }

        clearInterval(countdownInterval); // Clear any existing interval
        messageDisplay.textContent = ''; // Clear any previous message

        countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference < 0) {
                clearInterval(countdownInterval);
                messageDisplay.textContent = 'Countdown Finished!';
                daysDisplay.textContent = '00';
                hoursDisplay.textContent = '00';
                minutesDisplay.textContent = '00';
                secondsDisplay.textContent = '00';
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            daysDisplay.textContent = String(days).padStart(2, '0');
            hoursDisplay.textContent = String(hours).padStart(2, '0');
            minutesDisplay.textContent = String(minutes).padStart(2, '0');
            secondsDisplay.textContent = String(seconds).padStart(2, '0');
        }, 1000);
    });
});