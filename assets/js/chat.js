document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send-btn');
    const resetBtn = document.getElementById('chat-reset-btn');
    const chatBox = document.getElementById('chat-box');

    if (!chatInput || !sendBtn || !resetBtn || !chatBox) return;

    // Enhanced similarity function with typo tolerance
    function calculateSimilarity(str1, str2) {
        const s1 = str1.toLowerCase();
        const s2 = str2.toLowerCase();

        // Exact match
        if (s1 === s2) return 1.0;

        // Contains match
        if (s1.includes(s2) || s2.includes(s1)) return 0.9;

        // Common typo patterns
        const typoMap = {
            'skill': ['skll', 'skil', 'skils', 'skilz', 'skl', 'sklz'],
            'skills': ['sklls', 'skils', 'skilz', 'skls', 'sklz'],
            'project': ['projct', 'projet', 'proj', 'prject', 'projec'],
            'projects': ['projcts', 'projets', 'projs', 'prjects'],
            'education': ['educatn', 'eduction', 'educ', 'edcuation', 'educaton'],
            'experience': ['exp', 'exprence', 'experince', 'expirience', 'exprnce'],
            'contact': ['cntact', 'contct', 'cntct', 'conatct', 'contat'],
            'plc': ['plc', 'p l c', 'p-l-c'],
            'iot': ['iot', 'i o t', 'i-o-t', 'internet of things'],
            'python': ['pyton', 'pythn', 'pyth', 'pyhton'],
            'automation': ['automation', 'automatn', 'automte', 'automat'],
            'robotics': ['robotic', 'robotcs', 'robts', 'robot'],
            'solar': ['solr', 'solar', 'solr pv', 'solar energy'],
            'pvsyst': ['pvsist', 'pvsyt', 'pvsys', 'pv syst'],
            'digital twin': ['digitaltwin', 'dig twin', 'digi twin', 'dtwin']
        };

        // Check for known typo patterns
        for (const [correct, typos] of Object.entries(typoMap)) {
            if (typos.includes(s1) && s2.includes(correct)) return 0.85;
            if (typos.includes(s2) && s1.includes(correct)) return 0.85;
        }

        // Levenshtein distance for general similarity
        function levenshteinDistance(a, b) {
            const matrix = [];
            for (let i = 0; i <= b.length; i++) {
                matrix[i] = [i];
            }
            for (let j = 0; j <= a.length; j++) {
                matrix[0][j] = j;
            }
            for (let i = 1; i <= b.length; i++) {
                for (let j = 1; j <= a.length; j++) {
                    if (b.charAt(i - 1) === a.charAt(j - 1)) {
                        matrix[i][j] = matrix[i - 1][j - 1];
                    } else {
                        matrix[i][j] = Math.min(
                            matrix[i - 1][j - 1] + 1,
                            matrix[i][j - 1] + 1,
                            matrix[i - 1][j] + 1
                        );
                    }
                }
            }
            return matrix[b.length][a.length];
        }

        const distance = levenshteinDistance(s1, s2);
        const maxLength = Math.max(s1.length, s2.length);
        const similarity = 1 - (distance / maxLength);

        return similarity;
    }

    // Enhanced keyword extraction
    function extractKeywords(input) {
        const words = input.toLowerCase()
            .replace(/[^\w\s]/g, ' ')  // Remove punctuation
            .split(/\s+/)
            .filter(word => word.length > 2);  // Filter out short words

        // Combine adjacent words for multi-word terms
        const phrases = [];
        for (let i = 0; i < words.length; i++) {
            phrases.push(words[i]);
            if (i < words.length - 1) {
                phrases.push(words[i] + ' ' + words[i + 1]);
            }
            if (i < words.length - 2) {
                phrases.push(words[i] + ' ' + words[i + 1] + ' ' + words[i + 2]);
            }
        }

        return [...new Set(phrases)]; // Remove duplicates
    }

    function getBotResponse(input) {
        if (!input.trim()) return "Please say something!";

        const lowerInput = input.toLowerCase();

        // Quick exact match check for common queries
        const quickChecks = {
            'hello': 'Hi! How can I help you today?',
            'hi': 'Hello! Ask me about Andre\'s skills, projects, or experience.',
            'hey': 'Hey there! What would you like to know?',
            'thanks': 'You\'re welcome! Is there anything else you\'d like to know?',
            'thank you': 'You\'re welcome! Feel free to ask more questions.',
            'bye': 'Goodbye! Feel free to come back if you have more questions.',
            'who are you': knowledgeBase.find(e => e.id === 'intro')?.response || 'I\'m Andre\'s AI assistant!'
        };

        for (const [query, response] of Object.entries(quickChecks)) {
            if (lowerInput === query || lowerInput.includes(query)) {
                return response;
            }
        }

        // Extract all possible keywords from input
        const extractedKeywords = extractKeywords(lowerInput);

        // Find best matching knowledge base entry
        let bestMatch = null;
        let bestScore = 0;
        const threshold = 0.3; // Similarity threshold

        for (const entry of knowledgeBase) {
            let entryScore = 0;
            let matchedKeywords = [];

            // Check each extracted keyword against entry keywords
            for (const keyword of extractedKeywords) {
                for (const entryKeyword of entry.keywords) {
                    const similarity = calculateSimilarity(keyword, entryKeyword);
                    if (similarity > 0.7) { // Good match
                        entryScore += similarity;
                        matchedKeywords.push({ keyword, entryKeyword, similarity });
                    }
                }
            }

            // Also check direct input against entry keywords
            for (const entryKeyword of entry.keywords) {
                const similarity = calculateSimilarity(lowerInput, entryKeyword);
                if (similarity > 0.6) {
                    entryScore += similarity * 1.5; // Boost for direct matches
                }
            }

            // Normalize score by number of keywords
            if (entry.keywords.length > 0) {
                entryScore = entryScore / (entry.keywords.length * 0.5);
            }

            if (entryScore > bestScore && entryScore > threshold) {
                bestScore = entryScore;
                bestMatch = entry;
            }
        }

        if (bestMatch) {
            return bestMatch.response;
        }

        // Enhanced fallback with suggestions
        const fallbacks = [
            "I'm not sure I understand. Try asking about 'skills', 'projects', or 'education'.",
            "Could you rephrase that? I can tell you about Andre's work in IoT, Automation, or Solar Energy.",
            "Hmm, I'm not familiar with that term. Try asking about PLC programming, IoT projects, or Renewable Energy systems.",
            "I specialize in Andre's technical portfolio. You could ask about his Python projects, PLC experience, or Solar PV simulations."
        ];

        // Check for partially matched terms to give more specific suggestions
        const suggestionTerms = [
            { term: 'skill', suggestion: 'skills' },
            { term: 'project', suggestion: 'projects' },
            { term: 'educat', suggestion: 'education' },
            { term: 'experien', suggestion: 'experience' },
            { term: 'contact', suggestion: 'contact information' },
            { term: 'plc', suggestion: 'PLC programming' },
            { term: 'iot', suggestion: 'IoT projects' },
            { term: 'robot', suggestion: 'robotics' },
            { term: 'solar', suggestion: 'solar PV systems' },
            { term: 'python', suggestion: 'Python programming' },
            { term: 'automat', suggestion: 'automation' }
        ];

        for (const { term, suggestion } of suggestionTerms) {
            if (lowerInput.includes(term)) {
                return `Are you asking about ${suggestion}? I can tell you about Andre's ${suggestion}!`;
            }
        }

        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    // Function to parse markdown (currently only supports **bold**)
    function parseMarkdown(text) {
        // Replace **text** with <b>text</b>
        return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    }

    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        if (isUser) {
            messageDiv.classList.add('user-message');
        } else {
            messageDiv.classList.add('bot-message');
        }

        // Format bot responses with line breaks and markdown
        let formattedText = text;
        if (!isUser) {
            formattedText = parseMarkdown(text).replace(/\n/g, '<br>');
        }

        const textP = document.createElement(isUser ? 'p' : 'div');
        if (isUser) {
            textP.innerText = text;
        } else {
            textP.innerHTML = formattedText;
        }
        messageDiv.appendChild(textP);

        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function handleSend() {
        const text = chatInput.value.trim();
        if (text === "") return;

        addMessage(text, true);
        chatInput.value = "";

        setTimeout(() => {
            const response = getBotResponse(text);
            addMessage(response, false);
        }, 300 + Math.random() * 400); // Variable delay for natural feel
    }

    function handleReset() {
        chatBox.innerHTML = '';
        addMessage("Hi! I'm Andre's AI assistant. You can ask me about his skills, projects, education, or experience in Mechatronics, AI, and Renewable Energy!", false);
    }

    // Event Listeners
    sendBtn.addEventListener('click', handleSend);
    resetBtn.addEventListener('click', handleReset);

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    // Add some initial greeting
    setTimeout(() => {
        addMessage("Hi! I'm Andre's AI assistant. You can ask me about his skills, projects, education, or experience in Mechatronics, AI, and Renewable Energy!", false);
    }, 500);
});