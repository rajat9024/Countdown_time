document.addEventListener('DOMContentLoaded', () => {
    const countdownList = document.getElementById('countdown-list');
    const addTimerButton = document.getElementById('addTimerButton');
    const countdownTemplate = document.getElementById('countdownTemplate');
    const timerEndSound = document.getElementById('timerEndSound');

    addTimerButton.addEventListener('click', addCountdownTimer);

    function addCountdownTimer() {
        const newTimer = countdownTemplate.content.cloneNode(true);
        countdownList.appendChild(newTimer);
        initializeCountdown(countdownList.lastElementChild);
    }

    function initializeCountdown(timerElement) {
        const targetDateInput = timerElement.querySelector('.targetDate');
        const targetTimeInput = timerElement.querySelector('.targetTime');
        const startButton = timerElement.querySelector('.startButton');
        const removeButton = timerElement.querySelector('.removeButton');
        const daysDisplay = timerElement.querySelector('.days');
        const hoursDisplay = timerElement.querySelector('.hours');
        const minutesDisplay = timerElement.querySelector('.minutes');
        const secondsDisplay = timerElement.querySelector('.seconds');
        const messageDisplay = timerElement.querySelector('.message');
        const countdownDisplay = timerElement.querySelector('.countdown');
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

            clearInterval(countdownInterval);
            messageDisplay.textContent = '';
            timerElement.classList.remove('finished');

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
                    timerElement.classList.add('finished');
                    timerEndSound.play();
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

        removeButton.addEventListener('click', () => {
            clearInterval(countdownInterval);
            timerElement.remove();
        });
    }

    // Add the first timer on page load
    addCountdownTimer();
});