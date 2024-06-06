document.addEventListener('DOMContentLoaded', () => {
    const voiceButton = document.getElementById('voiceButton');
    const queryInput = document.getElementById('query');

    // Speech Recognition API Check
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'pt-BR';

        let isRecording = false;

        voiceButton.addEventListener('click', () => {
            if (!isRecording) {
                recognition.start();
                isRecording = true;
                voiceButton.textContent = 'Fale agora...';
            } else {
                recognition.stop();
                isRecording = false;
            }
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            queryInput.value = transcript;
            document.getElementById('searchForm').submit();
        };

        recognition.onerror = (event) => {
            console.error('Erro no reconhecimento de voz:', event.error);
            isRecording = false;
            voiceButton.textContent = 'Perguntar';
        };

        recognition.onend = () => {
            if (isRecording) {
                isRecording = false;
                voiceButton.textContent = 'Perguntar';
            }
        };
    } else {
        console.warn('Reconhecimento de voz não suportado neste navegador.');
        voiceButton.disabled = true;
        voiceButton.textContent = 'Reconhecimento de voz não suportado';
    }
});
