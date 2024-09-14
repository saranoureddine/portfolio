const socket = new WebSocket('ws://localhost:8080');

const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

// Show typing dots
function showTypingDots() {
    const typingDots = document.createElement('div');
    typingDots.className = 'message bot';
    typingDots.id = 'typing-dots';
    typingDots.innerHTML = '<div class="loading-dots"><span></span><span></span><span></span></div>';
    messages.appendChild(typingDots);
    messages.scrollTop = messages.scrollHeight;
}

// Remove typing dots
function hideTypingDots() {
    const typingDots = document.getElementById('typing-dots');
    if (typingDots) {
        typingDots.remove();
    }
}

socket.addEventListener('message', function (event) {
    hideTypingDots();  // Hide typing dots 
    const botMessageText = event.data;
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot';
    botMessage.textContent = botMessageText;
    messages.appendChild(botMessage);
    messages.scrollTop = messages.scrollHeight;
});

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const message = input.value;

    if (message) {
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.textContent = message;
        messages.appendChild(userMessage);

        // Show typing dots 
        showTypingDots();

        socket.send(message);

        input.value = '';
        messages.scrollTop = messages.scrollHeight;
    }
});
