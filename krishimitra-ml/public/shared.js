// shared.js - Adds Jarvis Voice Assistant and Google Translate to all pages

// --- ENENCE/ELEVENLABS VOICE CONFIGURATION ---
// To enable premium real-time voice, add your ElevenLabs API key below.
// Get one at: https://elevenlabs.io
const JARVIS_VOICE_CONFIG = {
    elevenLabsKey: 'sk_3d173ca53c5ccdb9b3d976ca08b2e6e860e9ad22f899b330', // Enter your API Key here
    voiceId: 'pNInz6ov9mxqMv99P68G', // Default 'Clyde' voice (Deep/Jarvis-like). 
    stability: 0.5,
    similarityBoost: 0.75
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Google Translate
    // The beautiful visible pill sitting underneath the invisible Google element
    const pillUI = document.createElement('div');
    pillUI.id = 'google_translate_overlay';
    pillUI.innerHTML = '<span class="icon">🌐</span><span id="gt_current_lang">Translate</span><span class="arrow">▼</span>';
    document.body.appendChild(pillUI);

    // Google translation container (Invisible but clickable on top)
    const googleWrapper = document.createElement('div');
    googleWrapper.id = 'google_translate_element';
    document.body.appendChild(googleWrapper);

    const translateStyle = document.createElement('style');
    translateStyle.innerHTML = `
        /* Hide the top Google Translate banner & disable body offset */
        .skiptranslate iframe { display: none !important; }
        body { top: 0 !important; }
        
        /* The container for Google's generated layout - force it to match pill size exactly and sit on top */
        #google_translate_element {
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 10000;
            width: 140px;
            height: 42px;
            border-radius: 9999px;
            overflow: hidden;
            opacity: 0.001; /* Make it invisible but still clickable */
            transition: all 0.3s ease;
        }

        #google_translate_element select {
            width: 100% !important;
            height: 100px !important;
            cursor: pointer;
        }
        
        #google_translate_overlay {
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 9999;
            width: 140px;
            height: 42px;
            border-radius: 9999px;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(16, 185, 129, 0.3);
            box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.2);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            box-sizing: border-box;
            font-family: 'Outfit', sans-serif;
            font-weight: 600;
            color: #059669;
            font-size: 14px;
            transition: all 0.3s ease;
            animation: slideUp 0.8s ease-out;
            pointer-events: none;
        }

        /* Forward exactly the same hover transform to the invisible Google element so they match positionally */
        #google_translate_element:hover + #google_translate_overlay, #google_translate_element:hover {
            transform: translateY(-3px);
        }
        
        #google_translate_element:hover + #google_translate_overlay {
            box-shadow: 0 15px 20px -3px rgba(16, 185, 129, 0.3);
            background: rgba(255, 255, 255, 1);
        }

        #google_translate_overlay .icon { font-size: 16px; color: #10b981; }
        #google_translate_overlay .arrow { font-size: 10px; color: #10b981; }

        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(translateStyle);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);

    window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            autoDisplay: false
            // ALL languages enabled by removing includedLanguages!
        }, 'google_translate_element');
    };

    // Watch for language changes to update the visual text in the pill natively
    setInterval(() => {
        const googleSelect = document.querySelector('.goog-te-combo');
        const overlayText = document.getElementById('gt_current_lang');
        if (googleSelect && overlayText) {
            const selectedText = googleSelect.options[googleSelect.selectedIndex]?.text;
            if (selectedText && selectedText !== 'Select Language' && selectedText !== 'Translate') {
                overlayText.textContent = selectedText.split(' ')[0]; // Optional short name
            } else {
                overlayText.textContent = 'Translate';
            }
        }
    }, 1000);

    // 2. Add Jarvis Overlay UI
    const jarvisOverlay = document.createElement('div');
    jarvisOverlay.id = 'jarvisOverlay';
    jarvisOverlay.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.85); backdrop-filter: blur(10px); z-index: 10000; display: none; flex-direction: column; align-items: center; justify-content: center; color: white;">
            <div id="jarvisOrb" style="width: 150px; height: 150px; border-radius: 50%; background: radial-gradient(circle, #10b981 0%, #064e3b 100%); box-shadow: 0 0 50px #10b981, inset 0 0 30px #ffffff; transition: transform 0.1s; display: flex; align-items: center; justify-content: center; position: relative;">
                <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; border: 2px solid rgba(16,185,129,0.5); animation: expand-ring 2s infinite ease-out;"></div>
                <svg style="width: 60px; height: 60px; color: white; opacity: 0.9;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
            </div>
            <h2 style="font-family: 'Outfit', sans-serif; font-size: 2.5rem; margin-top: 40px; font-weight: 300; tracking: wider;">J.A.R.V.I.S.</h2>
            <p id="jarvisStatus" style="font-family: 'Outfit', sans-serif; font-size: 1.2rem; color: #a7f3d0; margin-top: 15px;">Listening to your command...</p>
            <p id="jarvisResult" style="font-family: 'Outfit', sans-serif; font-size: 1.5rem; color: #ffffff; margin-top: 25px; text-align: center; max-width: 80%; min-height: 40px;"></p>
            <button id="closeJarvisBtn" style="position: absolute; top: 40px; right: 40px; background: transparent; border: 2px solid #a7f3d0; color: #a7f3d0; border-radius: 50%; width: 50px; height: 50px; font-size: 1.5rem; cursor: pointer; transition: all 0.3s hover:bg-emerald-800;">✕</button>
        </div>
    `;

    // Add animations for Jarvis
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes expand-ring {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes pulse-orb {
            0% { transform: scale(0.95); box-shadow: 0 0 30px #10b981; }
            50% { transform: scale(1.05); box-shadow: 0 0 80px #34d399; }
            100% { transform: scale(0.95); box-shadow: 0 0 30px #10b981; }
        }
        .jarvis-active-orb { animation: pulse-orb 1.5s infinite ease-in-out !important; }
    `;
    document.head.appendChild(style);
    document.body.appendChild(jarvisOverlay);

    // 3. Add Floating Voice Assistant Button
    const voiceBtn = document.createElement('button');
    voiceBtn.id = 'globalVoiceBtn';
    voiceBtn.title = "Activate Jarvis Voice Assistant";
    voiceBtn.setAttribute("aria-label", "Activate Jarvis Voice Assistant");
    voiceBtn.innerHTML = `
        <svg style="width: 28px; height: 28px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
    `;
    voiceBtn.style.position = 'fixed';
    voiceBtn.style.bottom = '20px';
    voiceBtn.style.right = '20px';
    voiceBtn.style.zIndex = '9998';
    voiceBtn.style.background = '#10b981';
    voiceBtn.style.color = 'white';
    voiceBtn.style.border = 'none';
    voiceBtn.style.borderRadius = '50%';
    voiceBtn.style.width = '60px';
    voiceBtn.style.height = '60px';
    voiceBtn.style.boxShadow = '0 10px 15px -3px rgba(16, 185, 129, 0.4)';
    voiceBtn.style.cursor = 'pointer';
    voiceBtn.style.display = 'flex';
    voiceBtn.style.alignItems = 'center';
    voiceBtn.style.justifyContent = 'center';
    voiceBtn.style.transition = 'all 0.3s ease';
    document.body.appendChild(voiceBtn);

    // Stop recognition function
    let currentRecognition = null;

    document.getElementById('closeJarvisBtn').addEventListener('click', () => {
        document.getElementById('jarvisOverlay').firstElementChild.style.display = 'none';
        if (currentRecognition) {
            currentRecognition.stop();
        }
    });

    voiceBtn.addEventListener('click', () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Jarvis: I am sorry, voice recognition is not supported in this browser.');
            return;
        }

        const jarvisContainer = document.getElementById('jarvisOverlay').firstElementChild;
        const jarvisOrb = document.getElementById('jarvisOrb');
        const jarvisStatus = document.getElementById('jarvisStatus');
        const jarvisResult = document.getElementById('jarvisResult');

        jarvisContainer.style.display = 'flex';
        jarvisResult.textContent = '';
        jarvisStatus.textContent = 'Initializing systems...';
        jarvisOrb.classList.add('jarvis-active-orb');

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        currentRecognition = recognition;

        const htmlLang = document.documentElement.lang;
        recognition.lang = htmlLang === 'hi' ? 'hi-IN' : (htmlLang === 'mr' ? 'mr-IN' : 'en-IN');
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        const speak = async (text) => {
            jarvisResult.textContent = text;
            
            // 1. Try ElevenLabs if API key is provided
            if (JARVIS_VOICE_CONFIG.elevenLabsKey) {
                try {
                    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${JARVIS_VOICE_CONFIG.voiceId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'xi-api-key': JARVIS_VOICE_CONFIG.elevenLabsKey
                        },
                        body: JSON.stringify({
                            text: text,
                            model_id: "eleven_monolingual_v1",
                            voice_settings: {
                                stability: JARVIS_VOICE_CONFIG.stability,
                                similarity_boost: JARVIS_VOICE_CONFIG.similarityBoost
                            }
                        })
                    });

                    if (response.ok) {
                        const audioBlob = await response.blob();
                        const audioUrl = URL.createObjectURL(audioBlob);
                        const audio = new Audio(audioUrl);
                        await audio.play();
                        return;
                    }
                } catch (error) {
                    console.error("ElevenLabs Error:", error);
                }
            }

            // 2. Fallback to Browser Speech Synthesis
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = recognition.lang;
            utterance.pitch = 0.85;
            utterance.rate = 1.0;
            window.speechSynthesis.speak(utterance);
        };

        try {
            recognition.start();
            jarvisStatus.textContent = 'Listening to your command...';
            const greetings = {
                'en-IN': 'Yes, boss. I am listening.',
                'hi-IN': 'जी, मैं सुन रहा हूँ।',
                'mr-IN': 'हो, मी ऐकत आहे.'
            };
            speak(greetings[recognition.lang] || greetings['en-IN']);
        } catch (e) {
            console.error('Speech recognition error:', e);
            speak('Systems busy. Please restart.');
            jarvisOrb.classList.remove('jarvis-active-orb');
            return;
        }

        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript.toLowerCase();
            jarvisStatus.textContent = 'Processing...';

            const cmd = speechResult;
            const lang = recognition.lang;

            // Define multi-language response sets
            const responses = {
                'en-IN': {
                    dashboard: "Right away. Navigating to the Main Dashboard.",
                    weather: "Accessing satellite data. Opening Weather Forecast.",
                    market: "Retrieving latest market fluctuations. Opening Prices.",
                    analysis: "Initializing computer vision. Opening Crop Analysis module.",
                    profile: "Accessing user profile and settings.",
                    history: "Retrieving your prediction history logs.",
                    register: "Preparing registration systems for new user.",
                    login: "Opening authentication portal.",
                    hello: "Hello. All systems are operating at optimal capacity. How can I assist your farm today?",
                    unverified: `Command unverified: "${speechResult}". I can help with weather, market analysis, or disease detection.`,
                    error: "I didn't quite catch that."
                },
                'hi-IN': {
                    dashboard: "अभी ले चलता हूँ। मुख्य डैशबोर्ड प्रदर्शित किया जा रहा है।",
                    weather: "सैटेलाइट डेटा प्राप्त हो रहा है। मौसम का पूर्वानुमान खोला जा रहा है।",
                    market: "बाजार के ताज़ा भाव देखे जा रहे हैं।",
                    analysis: "कंप्यूटर विज़न सक्रिय किया जा रहा है। फसल विश्लेषण मॉड्यूल खोला जा रहा है।",
                    profile: "यूज़र प्रोफ़ाइल और सेटिंग्स खोली जा रही हैं।",
                    history: "आपका भविष्यवाणी इतिहास दिखाया जा रहा है।",
                    register: "नए यूज़र के लिए पंजीकरण प्रणाली तैयार की जा रही है।",
                    login: "प्रमाणीकरण पोर्टल खोला जा रहा है।",
                    hello: "नमस्ते। सभी प्रणालियाँ बेहतर ढंग से काम कर रही हैं। मैं आपकी क्या सहायता कर सकता हूँ?",
                    unverified: `अमान्य कमांड: "${speechResult}"। मैं मौसम, बाजार भाव या फसल रोग जांच में मदद कर सकता हूँ।`,
                    error: "क्षमा करें, मैं समझ नहीं पाया।"
                },
                'mr-IN': {
                    dashboard: "लगेच. मुख्य डॅशबोर्ड उघडत आहे.",
                    weather: "हवामानाचा अंदाज उघडत आहे.",
                    market: "बाजारातील ताजे भाव तपासत आहे.",
                    analysis: "पीक विश्लेषण विभाग उघडत आहे.",
                    profile: "वापरकर्ता माहिती आणि सेटिंग्ज उघडत आहे.",
                    history: "तुमचा इतिहास तपासत आहे.",
                    register: "नवीन नोंदणी प्रक्रिया सुरू करत आहे.",
                    login: "लॉगिन पृष्ठ उघडत आहे.",
                    hello: "नमस्कार. सर्व यंत्रणा उत्तम रित्या कार्यरत आहेत. मी तुम्हाला कशी मदत करू शकतो?",
                    unverified: `कमांड समजली नाही: "${speechResult}". मी हवामान, बाजार भाव किंवा पीक रोगांच्या माहितीसाठी मदत करू शकतो.`,
                    error: "क्षमस्व, मला नीट ऐकू आलं नाही."
                }
            };

            const r = responses[lang] || responses['en-IN'];
            let reply = r.error;

            if (cmd.includes('dashboard') || cmd.includes('home') || cmd.includes('डॅशबोर्ड') || cmd.includes('होम')) {
                reply = r.dashboard;
                speak(reply);
                setTimeout(() => window.location.href = 'dashboard.html', 2500);
            } else if (cmd.includes('weather') || cmd.includes('forecast') || cmd.includes('मौसम') || cmd.includes('हवामान')) {
                reply = r.weather;
                speak(reply);
                setTimeout(() => window.location.href = 'weather.html', 2500);
            } else if (cmd.includes('market') || cmd.includes('price') || cmd.includes('भाव') || cmd.includes('दर')) {
                reply = r.market;
                speak(reply);
                setTimeout(() => window.location.href = 'market.html', 2500);
            } else if (cmd.includes('disease') || cmd.includes('analysis') || cmd.includes('बीमारी') || cmd.includes('रोग') || cmd.includes('तपासणी')) {
                reply = r.analysis;
                speak(reply);
                setTimeout(() => window.location.href = 'analysis.html', 2500);
            } else if (cmd.includes('profile') || cmd.includes('setting') || cmd.includes('प्रोफ़ाइल') || cmd.includes('सेटिंग')) {
                reply = r.profile;
                speak(reply);
                setTimeout(() => window.location.href = 'profile.html', 2500);
            } else if (cmd.includes('history') || cmd.includes('prediction') || cmd.includes('इतिहास')) {
                reply = r.history;
                speak(reply);
                setTimeout(() => window.location.href = 'history.html', 2500);
            } else if (cmd.includes('register') || cmd.includes('sign up') || cmd.includes('खाता') || cmd.includes('नोंदणी')) {
                reply = r.register;
                speak(reply);
                setTimeout(() => window.location.href = 'register.html', 2500);
            } else if (cmd.includes('login') || cmd.includes('sign in') || cmd.includes('लॉगिन')) {
                reply = r.login;
                speak(reply);
                setTimeout(() => window.location.href = 'login.html', 2500);
            } else if (cmd.includes('hello') || cmd.includes('hi jarvis') || cmd.includes('नमस्ते') || cmd.includes('नमस्कार')) {
                reply = r.hello;
                speak(reply);
                setTimeout(() => { jarvisContainer.style.display = 'none'; }, 4000);
            } else {
                reply = r.unverified;
                speak(reply);
                setTimeout(() => { jarvisContainer.style.display = 'none'; }, 5000);
            }
        };

        recognition.onspeechend = () => {
            recognition.stop();
        };
        recognition.onend = () => {
            jarvisOrb.classList.remove('jarvis-active-orb');
            jarvisStatus.textContent = 'Standing by.';
        };


        recognition.onerror = (event) => {
            console.error('Speech error:', event.error);
            speak('I could not hear you accurately. Awaiting new input.');
            jarvisOrb.classList.remove('jarvis-active-orb');
            setTimeout(() => { jarvisContainer.style.display = 'none'; }, 3000);
        };
    });

    // 4. Dynamically Set Active Nav Link
    const currentPage = window.location.pathname.split('/').pop() || "index.html";
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            const pageName = href.split('/').pop();
            link.classList.add('nav-item');
            if (pageName === currentPage || (currentPage === '' && pageName === 'index.html') || (currentPage === 'dashboard.html' && pageName === 'dashboard.html')) {
                link.classList.add('active');
                link.classList.remove('text-gray-600');
            } else {
                link.classList.remove('active');
                link.classList.add('text-gray-600');
            }
        }
    });

    // 5. Global Real-time Firebase Syncing
    import('./firebase-config.js').then(({ auth, onAuthStateChanged, db, doc, getDoc }) => {
        onAuthStateChanged(auth, async (user) => {
            const authLinks = document.querySelectorAll('.auth-links'); 
            
            if (user) {
                let displayName = user.displayName || user.email.split('@')[0];
                try {
                    const userDocData = await getDoc(doc(db, "users", user.uid));
                    if (userDocData.exists() && userDocData.data().name) {
                        displayName = userDocData.data().name;
                    }
                } catch(e) {}
                
                const initials = displayName.substring(0, 2).toUpperCase();

                // Update Profile Initials
                const initialsEl = document.getElementById('nav-profile-initials');
                if (initialsEl) initialsEl.textContent = initials;
                
                // Update Dashboard Welcome Name
                const welcomeName = document.getElementById('welcome-name');
                if (welcomeName) {
                    const lang = document.documentElement.lang;
                    const msgs = { 'en': `Welcome back, ${displayName}!`, 'hi': `नमस्ते, ${displayName}!`, 'mr': `स्वागत आहे, ${displayName}!` };
                    welcomeName.textContent = msgs[lang] || msgs['en'];
                }

                // Update Auth Links to show Dashboard instead of Login globally
                authLinks.forEach(container => {
                    container.innerHTML = `
                        <a href="dashboard.html" class="px-6 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg transform hover:-translate-y-1">
                            Go to Dashboard
                        </a>
                    `;
                });
            } else {
                // Return to normal default
            }
        });
    }).catch(e => {
        // Silently fail if firebase config isn't available on a specific page
    });

    // 6. Theme Toggle Functionality
    const themeToggleBtn = document.createElement('button');
    themeToggleBtn.id = 'theme-toggle';
    // Positioned at the top right, and ensuring flex centering for the icon
    themeToggleBtn.className = 'fixed top-4 right-20 z-[10001] w-10 h-10 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-lg border border-emerald-500/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95';
    themeToggleBtn.style.padding = '0'; // Ensure no extra padding breaks centering
    themeToggleBtn.innerHTML = `
        <svg id="theme-toggle-dark-icon" class="hidden w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
        <svg id="theme-toggle-light-icon" class="hidden w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464l-.707-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414zm2.12 10.607a1 1 0 010-1.414l.706-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1z"></path></svg>
    `;
    document.body.appendChild(themeToggleBtn);

    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    // Check for saved theme
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.classList.add('dark');
        lightIcon.classList.remove('hidden');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.classList.remove('dark');
        darkIcon.classList.remove('hidden');
    }
    themeToggleBtn.addEventListener('click', function() {
        darkIcon.classList.toggle('hidden');
        lightIcon.classList.toggle('hidden');
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('color-theme', 'dark');
        }
    });

    // 7. Global CTA Link Handlers (Direct logic fallback)
    document.addEventListener('click', (e) => {
        const text = e.target.textContent || '';
        if (text.includes('View Forecast')) {
            window.location.href = 'weather.html';
        } else if (text.includes('View Market') || text.includes('View Markets')) {
            window.location.href = 'market.html';
        } else if (text.includes('Contact Expert')) {
            window.location.href = 'profile.html';
        } else if (text.includes('View Full') && e.target.closest('.glassmorphism')) {
            window.location.href = 'weather.html';
        }
    });

});
