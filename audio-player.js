function initAudioPlayer(audioUrl) {
    const playBtn = document.getElementById('playBtn');
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');

    const audio = new Audio(audioUrl);

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    audio.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = percent + '%';
        currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener('ended', () => {
        playBtn.textContent = '▶';
        playBtn.classList.remove('playing');
        progressFill.style.width = '0%';
    });

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playBtn.textContent = '⏸';
            playBtn.classList.add('playing');
        } else {
            audio.pause();
            playBtn.textContent = '▶';
            playBtn.classList.remove('playing');
        }
    });

    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    });
}