 // ============================================
// MOCK INTERVIEW JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Screen elements
    const setupScreen = document.getElementById('setupScreen');
    const interviewScreen = document.getElementById('interviewScreen');
    const resultsScreen = document.getElementById('resultsScreen');
    
    // Setup elements
    const startInterviewBtn = document.getElementById('startInterview');
    const jobRoleSelect = document.getElementById('jobRole');
    
    // Interview elements
    const recordButton = document.getElementById('recordButton');
    const submitAnswerBtn = document.getElementById('submitAnswer');
    const skipQuestionBtn = document.getElementById('skipQuestion');
    const endInterviewBtn = document.getElementById('endInterview');
    const recordingStatus = document.getElementById('recordingStatus');
    const transcriptText = document.getElementById('transcriptText');
    const timerText = document.getElementById('timerText');
    const currentQuestionEl = document.getElementById('currentQuestion');
    const progressBar = document.getElementById('progressBar');
    const questionText = document.getElementById('questionText');
    const speakingIndicator = document.getElementById('speakingIndicator');
    
    // Results elements
    const retakeInterviewBtn = document.getElementById('retakeInterview');
    
    // State variables
    let isRecording = false;
    let mediaRecorder = null;
    let audioChunks = [];
    let timerInterval = null;
    let seconds = 0;
    let currentQuestion = 1;
    let totalQuestions = 5;
    
    // Sample questions (would come from API in production)
    const questions = {
        frontend: [
            "What is your experience with React and modern JavaScript frameworks?",
            "Explain the concept of virtual DOM and its benefits.",
            "How do you handle state management in large applications?",
            "Describe your approach to responsive web design.",
            "What are your best practices for optimizing web performance?"
        ],
        backend: [
            "Explain REST API design principles.",
            "How do you ensure database performance and scalability?",
            "Describe your approach to API authentication and security.",
            "How do you handle error logging and monitoring?",
            "Explain microservices architecture and its trade-offs."
        ]
    };
    
    // ============================================
    // START INTERVIEW
    // ============================================
    if (startInterviewBtn) {
        startInterviewBtn.addEventListener('click', function() {
            const jobRole = jobRoleSelect.value;
            
            if (!jobRole) {
                alert('Please select a job role');
                return;
            }
            
            const numQuestions = document.getElementById('numQuestions').value;
            totalQuestions = parseInt(numQuestions);
            
            // Switch to interview screen
            setupScreen.classList.remove('active');
            interviewScreen.classList.add('active');
            
            // Load first question
            loadQuestion(1);
            
            // Simulate AI speaking
            simulateAISpeaking();
        });
    }
    
    // ============================================
    // RECORDING CONTROLS
    // ============================================
    if (recordButton) {
        recordButton.addEventListener('click', async function() {
            if (!isRecording) {
                await startRecording();
            } else {
                stopRecording();
            }
        });
    }
    
    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            
            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };
            
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                // Here you would send audioBlob to backend for speech-to-text
                simulateSpeechToText();
                audioChunks = [];
            };
            
            mediaRecorder.start();
            isRecording = true;
            
            // Update UI
            recordButton.classList.add('recording');
            recordButton.querySelector('span').textContent = 'Stop Recording';
            recordingStatus.classList.add('recording');
            recordingStatus.innerHTML = '<i class="fas fa-microphone"></i><span>Recording... Speak your answer</span>';
            
            // Start timer
            startTimer();
            
        } catch (error) {
            alert('Microphone access denied. Please allow microphone access to continue.');
            console.error('Error accessing microphone:', error);
        }
    }
    
    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
        
        isRecording = false;
        
        // Update UI
        recordButton.classList.remove('recording');
        recordButton.querySelector('span').textContent = 'Start Recording';
        recordingStatus.classList.remove('recording');
        recordingStatus.innerHTML = '<i class="fas fa-check-circle"></i><span>Recording complete</span>';
        
        // Stop timer
        stopTimer();
        
        // Enable submit button
        submitAnswerBtn.disabled = false;
    }
    
    // ============================================
    // TIMER
    // ============================================
    function startTimer() {
        seconds = 0;
        timerInterval = setInterval(() => {
            seconds++;
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            timerText.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }, 1000);
    }
    
    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
    }
    
    // ============================================
    // SIMULATE SPEECH TO TEXT
    // ============================================
    function simulateSpeechToText() {
        // Simulate API call delay
        setTimeout(() => {
            const sampleTranscript = "I have 2 years of experience working with React. I've built several production applications using React hooks, context API, and Redux for state management. I'm comfortable with component lifecycle, virtual DOM concepts, and performance optimization techniques like memoization and code splitting.";
            transcriptText.textContent = sampleTranscript;
        }, 1500);
    }
    
    // ============================================
    // SIMULATE AI SPEAKING
    // ============================================
    function simulateAISpeaking() {
        speakingIndicator.classList.add('active');
        
        setTimeout(() => {
            speakingIndicator.classList.remove('active');
        }, 3000);
    }
    
    // ============================================
    // LOAD QUESTION
    // ============================================
    function loadQuestion(questionNum) {
        currentQuestion = questionNum;
        currentQuestionEl.textContent = questionNum;
        
        // Update progress bar
        const progress = (questionNum / totalQuestions) * 100;
        progressBar.style.width = progress + '%';
        
        // Load question text (would come from API)
        const sampleQuestions = questions.frontend || questions.backend;
        questionText.textContent = sampleQuestions[questionNum - 1] || "What is your experience with this technology?";
        
        // Reset UI
        transcriptText.textContent = 'Your spoken answer will appear here...';
        submitAnswerBtn.disabled = true;
        timerText.textContent = '00:00';
    }
    
    // ============================================
    // SUBMIT ANSWER
    // ============================================
    if (submitAnswerBtn) {
        submitAnswerBtn.addEventListener('click', function() {
            if (currentQuestion < totalQuestions) {
                // Move to next question
                loadQuestion(currentQuestion + 1);
                simulateAISpeaking();
            } else {
                // Interview complete - show results
                showResults();
            }
        });
    }
    
    // ============================================
    // SKIP QUESTION
    // ============================================
    if (skipQuestionBtn) {
        skipQuestionBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to skip this question?')) {
                if (currentQuestion < totalQuestions) {
                    loadQuestion(currentQuestion + 1);
                    simulateAISpeaking();
                } else {
                    showResults();
                }
            }
        });
    }
    
    // ============================================
    // END INTERVIEW
    // ============================================
    if (endInterviewBtn) {
        endInterviewBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to end the interview? Your progress will be saved.')) {
                showResults();
            }
        });
    }
    
    // ============================================
    // SHOW RESULTS
    // ============================================
    function showResults() {
        interviewScreen.classList.remove('active');
        resultsScreen.classList.add('active');
        
        // Animate metrics
        setTimeout(() => {
            const metricFills = document.querySelectorAll('.metric-fill');
            metricFills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
            });
        }, 300);
    }
    
    // ============================================
    // RETAKE INTERVIEW
    // ============================================
    if (retakeInterviewBtn) {
        retakeInterviewBtn.addEventListener('click', function() {
            resultsScreen.classList.remove('active');
            setupScreen.classList.add('active');
            
            // Reset state
            currentQuestion = 1;
            seconds = 0;
            isRecording = false;
        });
    }
    
});

