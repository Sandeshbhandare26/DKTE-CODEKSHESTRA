
// ========================================
// KRISHIMITRA - Comprehensive JavaScript
// ========================================

// ========================================
// CONFIGURATION & DATA
// ========================================

// State and city data for India
const indianStates = {
    maharashtra: { cities: ['Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur'] },
    gujarat: { cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar', 'Bhavnagar'] },
    punjab: { cities: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda'] },
    haryana: { cities: ['Gurgaon', 'Faridabad', 'Rohtak', 'Panipat', 'Karnal'] },
    up: { cities: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Allahabad', 'Meerut'] },
    mp: { cities: ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain'] },
    karnataka: { cities: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'] },
    tn: { cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'] },
    ap: { cities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Nellore'] },
    wb: { cities: ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri'] },
    odisha: { cities: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur'] },
    bihar: { cities: ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga'] },
    rajasthan: { cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner'] },
    telangana: { cities: ['Hyderabad', 'Warangal', 'Karimnagar', 'Ramagundam'] },
    kerala: { cities: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam'] }
};

// Crop database
const cropsDatabase = {
    Tomato: { diseases: ['Early Blight', 'Late Blight', 'Leaf Miner', 'Tomato Mosaic Virus'], season: 'Oct-Mar', yield: '25-30 t/ha' },
    Potato: { diseases: ['Late Blight', 'Black Scurf', 'Bacterial Wilt', 'Potato Leaf Roll Virus'], season: 'Oct-Feb', yield: '20-25 t/ha' },
    Onion: { diseases: ['Purple Blotch', 'Stemphylium Blight', 'Thrips', 'Basal Rot'], season: 'Oct-Dec', yield: '20-25 t/ha' },
    Wheat: { diseases: ['Rust', 'Powdery Mildew', 'Karnal Bunt', 'Leaf Blight'], season: 'Nov-Apr', yield: '3-4 t/ha' },
    Rice: { diseases: ['Blast', 'Bacterial Leaf Blight', 'Brown Spot', 'Sheath Blight'], season: 'Jun-Oct', yield: '5-6 t/ha' },
    Cotton: { diseases: ['Cotton Bollworm', 'Pink Bollworm', 'Leaf Curl Virus', 'Wilt'], season: 'Apr-Oct', yield: '15-20 q/ha' },
    Sugarcane: { diseases: ['Red Rot', 'Smut', 'Pokkah Boeng', 'Wire Stem'], season: 'Oct-Sep', yield: '70-80 t/ha' },
    Maize: { diseases: ['Northern Leaf Blight', 'Stem Rot', 'Corn Earworm', 'Fall Armyworm'], season: 'Jun-Sep', yield: '6-8 t/ha' }
};

// Weather data simulation
const weatherConditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Heavy Rain', 'Thunderstorm'];
const windDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

// Market prices
const marketPrices = {
    Tomato: { price: 45, change: 12, unit: 'kg' },
    Potato: { price: 22, change: 3, unit: 'kg' },
    Onion: { price: 28, change: -5, unit: 'kg' },
    Wheat: { price: 2150, change: 2, unit: 'quintal' },
    Rice: { price: 2800, change: 5, unit: 'quintal' },
    Cotton: { price: 6200, change: -3, unit: 'quintal' },
    Sugarcane: { price: 3500, change: 8, unit: 'tonne' },
    Maize: { price: 1960, change: 4, unit: 'quintal' }
};

// Chatbot knowledge base
const chatbotKnowledge = {
    en: {
        greetings: ['Namaste! How can I help you today?', 'Hello! What would you like to know about farming?', 'Welcome! Ask me anything about agriculture.'],
        disease: {
            keywords: ['disease', 'blight', 'pest', 'insect', 'virus', 'fungus', 'infection'],
            responses: [
                'Common tomato diseases include Early Blight (brown spots with rings), Late Blight (water-soaked lesions), and Leaf Miner (white tunnels in leaves).',
                'For potato diseases, Late Blight is most dangerous - it can destroy entire crops. Use resistant varieties and apply copper fungicide as prevention.',
                'Powdery mildew appears as white powder on leaves. It thrives in humid conditions. Neem oil spray is an effective organic treatment.',
                'Crop rotation is key to preventing soil-borne diseases. Avoid planting the same crop family in the same field for 2-3 years.'
            ]
        },
        weather: {
            keywords: ['weather', 'rain', 'monsoon', 'drought', 'humidity', 'temperature', 'forecast'],
            responses: [
                'I can show you detailed weather for your location. Would you like me to display the current weather and 7-day forecast?',
                'For farming, monitor humidity levels above 70% as they favor fungal diseases. Consider preventive sprays before rainy seasons.',
                'Ideal temperature for most crops is 20-30°C. Extreme temperatures stress plants and reduce yield.'
            ]
        },
        market: {
            keywords: ['market', 'price', 'sell', 'profit', 'cost', 'rate', 'mandi'],
            responses: [
                'Current tomato prices are around ₹45/kg with a 12% increase. Prices typically rise in off-season months.',
                'Best time to sell: Tuesday-Thursday when demand is highest. Avoid weekends when market traffic is low.',
                'APMC markets offer better prices for bulk sales. Consider joining Farmer Producer Organizations for collective bargaining.'
            ]
        },
        farming: {
            keywords: ['farming', 'crop', 'plant', 'grow', 'soil', 'fertilizer', 'irrigation'],
            responses: [
                'For best results, conduct soil testing before planting. NPK ratios should be tailored to your soil deficiency.',
                'Drip irrigation saves 40-60% water compared to flood irrigation. It also reduces leaf diseases by keeping foliage dry.',
                'Organic farming uses compost, vermicompost, and biofertilizers. It improves soil health long-term but requires patience.',
                'Intercropping with legumes adds nitrogen to soil. Try growing moong or urad dal between main crops.'
            ]
        },
        harvest: {
            keywords: ['harvest', 'yield', 'when', 'ready', 'pick', 'cut'],
            responses: [
                'Tomatoes are ready when fully colored (red/yellow depending on variety) and slightly soft to touch.',
                'Harvest wheat when grains are hard and straw is dry. Thresh within 2-3 days to avoid weather damage.',
                'Morning harvest (6-9 AM) preserves freshness and extends shelf life of vegetables.'
            ]
        },
        default: [
            'That\'s a great question! Let me help you with that.',
            'I\'d be happy to assist you with your farming queries.',
            'Here\'s some information that might help you.',
            'For more specific guidance, please share your location and crop details.'
        ]
    },
    hi: {
        greetings: ['नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूं?', 'हैलो! खेती के बारे में क्या जानना चाहेंगे?'],
        disease: {
            keywords: ['बीमारी', 'कीट', 'फफूद', 'संक्रमण'],
            responses: [
                'टमाटर की आम बीमारियों में अगेटी ब्लाइट, लेट ब्लाइट और लीफ माइनर शामिल हैं।',
                'आलू की सबसे खतरनाक बीमारी लेट ब्लाइट है - यह पूरी फसल को नष्ट कर सकती है।'
            ]
        },
        weather: {
            keywords: ['मौसम', 'बारिश', 'आर्द्रता', 'तापमान'],
            responses: [
                'मैं आपके स्थान के लिए विस्तृत मौसम दिखा सकता हूं। क्या आप वर्तमान मौसम देखना चाहेंगे?'
            ]
        },
        market: {
            keywords: ['बाजार', 'भाव', 'कीमत', 'बिक्री'],
            responses: [
                'वर्तमान टमाटर की कीमत लगभग ₹45/किलो है जिसमें 12% की वृद्धि हुई है।'
            ]
        },
        farming: {
            keywords: ['खेती', 'फसल', 'मिट्टी', 'उर्वरक', 'सिंचाई'],
            responses: [
                'सर्वोत्तम परिणामों के लिए, रोपण से पहले मिट्टी का परीक्षण करें।'
            ]
        },
        harvest: {
            keywords: ['कटाई', 'पकना', 'तैयार'],
            responses: [
                'टमाटर तब तैयार होते हैं जब वे पूरी तरह रंगीन हों और थोड़े नरम हों।'
            ]
        },
        default: ['यह एक अच्छा सवाल है! मैं आपकी मदद करूंगा।']
    }
};

// Language-specific greetings
const langGreetings = {
    en: 'Namaste! I\'m Krishimitra AI. How can I help you with farming today?',
    hi: 'नमस्ते! मैं कृषिमित्र AI हूं। आज मैं आपकी खेती में कैसे मदद कर सकता हूं?',
    mr: 'नमस्कार! मी कृषिमित्र AI आहे. आज मी तुमच्या शेतीमध्ये कशी मदत करू शकतो?',
    ta: 'வணக்கம்! நான் கிரிஷிமித்ரா AI. இன்று உங்கள் விவசாயத்தில் எப்படி உதவ முடியும்?',
    te: 'Namaste! నేను Krisimitra AI. ఈరోజు మీ వ్యవసాయంలో ఎలా సహాయం చేయగలను?',
    bn: 'নমস্কার! আমি কৃষিমিত্র AI। আজ আমি আপনার কৃষিতে কীভাবে সাহায্য করতে পারি?',
    gu: 'નમસ્તે! હું કૃષિમિત્ર AI છું. આજે હું તમારી ખેતીમાં કેવી રીતે મદદ કરી શકું?'
};

// ========================================
// STATE MANAGEMENT
// ========================================

let appState = {
    location: { state: 'maharashtra', city: 'Pune', lat: 18.5204, lng: 73.8567 },
    currentCrop: { name: 'Tomato', variety: 'Cherry', stage: 'Fruiting' },
    chatHistory: [],
    userName: 'Farmer',
    notifications: []
};

// Load state from localStorage
function loadState() {
    const saved = localStorage.getItem('krishimitraState');
    if (saved) {
        appState = JSON.parse(saved);
    }
    updateUI();
}

// Save state to localStorage
function saveState() {
    localStorage.setItem('krishimitraState', JSON.stringify(appState));
}

// ========================================
// UI UPDATE FUNCTIONS
// ========================================

function updateUI() {
    document.getElementById('locationText').textContent = appState.location.city + ', ' + appState.location.state.charAt(0).toUpperCase() + appState.location.state.slice(1);
    document.getElementById('cropName').textContent = appState.currentCrop.name;
    document.getElementById('cropVariety').textContent = 'Variety: ' + appState.currentCrop.variety;
    document.getElementById('cropStage').textContent = 'Stage: ' + appState.currentCrop.stage;
    document.getElementById('userName').textContent = appState.userName;
    document.getElementById('notifCount').textContent = appState.notifications.length;
    updatePastConversations();
}

// ========================================
// GEOLOCATION FUNCTIONS
// ========================================

function getCurrentLocation() {
    if (navigator.geolocation) {
        document.getElementById('locationText').textContent = 'Getting location...';
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                reverseGeocode(lat, lng);
            },
            function(error) {
                console.error('Geolocation error:', error);
                document.getElementById('locationText').textContent = 'Location unavailable';
                alert('Could not get your location. Please enter manually.');
                showLocationModal();
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

function reverseGeocode(lat, lng) {
    const cities = [
        { name: 'Mumbai', lat: 19.0760, lng: 72.8777, state: 'maharashtra' },
        { name: 'Pune', lat: 18.5204, lng: 73.8567, state: 'maharashtra' },
        { name: 'Delhi', lat: 28.7041, lng: 77.1025, state: 'delhi' },
        { name: 'Bangalore', lat: 12.9716, lng: 77.5946, state: 'karnataka' },
        { name: 'Chennai', lat: 13.0827, lng: 80.2707, state: 'tn' },
        { name: 'Kolkata', lat: 22.5726, lng: 88.3639, state: 'wb' },
        { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, state: 'gujarat' },
        { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, state: 'telangana' }
    ];
    
    let nearest = cities[0];
    let minDist = Infinity;
    
    cities.forEach(function(city) {
        const dist = Math.sqrt(Math.pow(city.lat - lat, 2) + Math.pow(city.lng - lng, 2));
        if (dist < minDist) {
            minDist = dist;
            nearest = city;
        }
    });
    
    appState.location = {
        state: nearest.state,
        city: nearest.name,
        lat: lat,
        lng: lng
    };
    
    saveState();
    updateUI();
    updateWeather();
    updateMarketData();
    showNotification('Location updated successfully!');
}

function showLocationModal() {
    document.getElementById('locationModal').style.display = 'flex';
}

function hideLocationModal() {
    document.getElementById('locationModal').style.display = 'none';
}

function saveManualLocation() {
    const state = document.getElementById('stateSelect').value;
    const city = document.getElementById('cityInput').value.trim();
    
    if (!state || !city) {
        alert('Please select state and enter city');
        return;
    }
    
    appState.location = {
        state: state,
        city: city,
        lat: null,
        lng: null
    };
    
    saveState();
    updateUI();
    updateWeather();
    updateMarketData();
    hideLocationModal();
    showNotification('Location saved successfully!');
}

// ========================================
// WEATHER FUNCTIONS
// ========================================

function updateWeather() {
    const location = appState.location;
    
    document.getElementById('tempValue').textContent = '--';
    document.getElementById('weatherDesc').textContent = 'Loading...';
    
    setTimeout(function() {
        const month = new Date().getMonth();
        const isMonsoon = month >= 6 && month <= 9;
        const isWinter = month >= 10 || month <= 2;
        
        let baseTemp = isWinter ? 18 : isMonsoon ? 26 : 32;
        const temp = baseTemp + Math.floor(Math.random() * 6) - 3;
        
        const condition = isMonsoon 
            ? weatherConditions[Math.floor(Math.random() * 3) + 3]
            : weatherConditions[Math.floor(Math.random() * 3)];
        
        const weatherIcons = {
            'Sunny': 'fa-sun',
            'Partly Cloudy': 'fa-cloud-sun',
            'Cloudy': 'fa-cloud',
            'Light Rain': 'fa-cloud-rain',
            'Heavy Rain': 'fa-cloud-showers-heavy',
            'Thunderstorm': 'fa-bolt'
        };
        
        document.getElementById('tempValue').textContent = temp;
        document.getElementById('weatherDesc').textContent = condition;
        document.getElementById('weatherLocation').textContent = location.city + ', ' + location.state.charAt(0).toUpperCase() + location.state.slice(1);
        document.getElementById('weatherIcon').innerHTML = '<i class="fas ' + weatherIcons[condition] + '"></i>';
        
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-IN', options);
        
        document.getElementById('windSpeed').textContent = Math.floor(Math.random() * 20) + 5 + ' km/h';
        document.getElementById('windDirection').textContent = windDirections[Math.floor(Math.random() * 8)];
        
        const rainProb = isMonsoon ? Math.floor(Math.random() * 40) + 50 : Math.floor(Math.random() * 30);
        document.getElementById('rainProb').textContent = rainProb + '%';
        document.getElementById('rainLabel').textContent = rainProb > 50 ? 'High Chance' : 'Low Chance';
        
        const humidity = Math.floor(Math.random() * 30) + (isMonsoon ? 60 : 40);
        document.getElementById('humidity').textContent = humidity + '%';
        document.getElementById('humidityLabel').textContent = humidity > 60 ? 'High' : 'Comfortable';
        
        const uv = Math.floor(Math.random() * 8) + 1;
        document.getElementById('uvIndex').textContent = uv;
        document.getElementById('uvLabel').textContent = uv > 5 ? 'Very High' : uv > 2 ? 'Moderate' : 'Low';
        
        document.getElementById('cloudCover').textContent = Math.floor(Math.random() * 60) + 20 + '%';
        document.getElementById('visibility').textContent = Math.floor(Math.random() * 5) + 8 + ' km';
        
        updateForecast();
        updateFarmingAdvice(condition, rainProb, humidity);
        document.getElementById('lastUpdated').textContent = 'Last updated: Just now';
        
    }, 500);
}

function updateForecast() {
    const forecastGrid = document.getElementById('forecastGrid');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const icons = ['fa-sun', 'fa-cloud-sun', 'fa-cloud', 'fa-cloud-rain', 'fa-bolt'];
    
    let html = '';
    const today = new Date();
    
    for (var i = 0; i < 7; i++) {
        var date = new Date(today);
        date.setDate(today.getDate() + i);
        var dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : days[date.getDay()];
        
        var tempHigh = Math.floor(Math.random() * 8) + 24;
        var tempLow = tempHigh - Math.floor(Math.random() * 6) - 4;
        var icon = icons[Math.floor(Math.random() * icons.length)];
        var rain = Math.floor(Math.random() * 60);
        
        html += '<div class="forecast-day">' +
            '<span class="day-name">' + dayName + '</span>' +
            '<div class="forecast-icon"><i class="fas ' + icon + '"></i></div>' +
            '<span class="forecast-temp">' + tempHigh + '°/' + tempLow + '°</span>' +
            '<span class="forecast-rain"><i class="fas fa-tint"></i> ' + rain + '%</span>' +
        '</div>';
    }
    
    forecastGrid.innerHTML = html;
}

function updateFarmingAdvice(condition, rainProb, humidity) {
    const adviceContainer = document.getElementById('farmingAdvice');
    
    var advice = [];
    
    if (rainProb > 50) {
        advice.push({ icon: 'fa-tint-slash', title: 'Irrigation', text: 'Skip irrigation today due to expected rain.' });
    } else if (humidity > 70) {
        advice.push({ icon: 'fa-tint', title: 'Irrigation', text: 'High humidity - water at base of plants to avoid leaf diseases.' });
    } else {
        advice.push({ icon: 'fa-tint', title: 'Irrigation', text: 'Good conditions for irrigation. Water crops in morning.' });
    }
    
    if (humidity > 70) {
        advice.push({ icon: 'fa-bug', title: 'Pest Alert', text: 'High humidity increases fungal disease risk. Monitor closely.' });
    } else {
        advice.push({ icon: 'fa-check-circle', title: 'Pest Control', text: 'Low pest activity expected. Continue regular monitoring.' });
    }
    
    if (condition === 'Sunny') {
        advice.push({ icon: 'fa-sun', title: 'Harvest', text: 'Ideal weather for harvesting. Crops will dry quickly.' });
    } else {
        advice.push({ icon: 'fa-clock', title: 'Harvest', text: 'Wait for better weather to harvest.' });
    }
    
    var html = '';
    advice.forEach(function(item) {
        html += '<div class="advice-card"><i class="fas ' + item.icon + '"></i><div><h4>' + item.title + '</h4><p>' + item.text + '</p></div></div>';
    });
    
    adviceContainer.innerHTML = html;
}

// ========================================
// MARKET FUNCTIONS
// ========================================

function updateMarketData() {
    const location = appState.location;
    const marketStatsContainer = document.getElementById('marketStats');
    var crops = ['Tomato', 'Onion', 'Potato'];
    
    var statsHtml = '';
    crops.forEach(function(crop) {
        var data = marketPrices[crop];
        var changeClass = data.change >= 0 ? 'positive' : 'negative';
        var arrow = data.change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
        
        statsHtml += '<div class="market-stat-card">' +
            '<div class="stat-header"><span class="crop-name">' + crop + '</span>' +
            '<span class="price-change ' + changeClass + '"><i class="fas ' + arrow + '"></i> ' + Math.abs(data.change) + '%</span></div>' +
            '<div class="current-price"><span class="price">₹' + data.price + '</span><span class="unit">per ' + data.unit + '</span></div>' +
            '<p class="price-update">Updated: Just now</p></div>';
    });
    
    marketStatsContainer.innerHTML = statsHtml;
    updateBestMarkets();
    updateSellTiming();
}

function updateBestMarkets() {
    const marketsContainer = document.getElementById('bestMarkets');
    const location = appState.location;
    
    var markets = [
        { name: location.city + ' APMC', price: 48, distance: 5 },
        { name: 'Local Mandi', price: 45, distance: 10 },
        { name: 'Wholesale Market', price: 52, distance: 20 }
    ];
    
    var html = '';
    markets.forEach(function(market) {
        html += '<li><span class="market-name">' + market.name + '</span><span class="market-price">₹' + market.price + '/kg</span><span class="distance">' + market.distance + ' km</span></li>';
    });
    
    marketsContainer.innerHTML = html;
}

function updateSellTiming() {
    const timingContainer = document.getElementById('sellTiming');
    var day = new Date().getDay();
    
    var advice = [];
    
    if (day >= 2 && day <= 4) {
        advice.push({ icon: 'fa-clock', title: 'Tuesday - Thursday', text: 'High demand period - BEST TIME TO SELL!' });
    } else if (day === 0 || day === 6) {
        advice.push({ icon: 'fa-exclamation-triangle', title: 'Weekend', text: 'Lower demand - consider waiting' });
    } else {
        advice.push({ icon: 'fa-calendar', title: 'Today', text: 'Normal market conditions' });
    }
    
    advice.push({ icon: 'fa-chart-line', title: 'This Week', text: 'Prices expected to rise 10-15%' });
    
    var html = '';
    advice.forEach(function(item) {
        html += '<div class="timing-item"><i class="fas ' + item.icon + '"></i><div><h5>' + item.title + '</h5><p>' + item.text + '</p></div></div>';
    });
    
    timingContainer.innerHTML = html;
}

// ========================================
// CHART FUNCTIONS
// ========================================

var marketChart = null;

function initMarketChart() {
    var ctx = document.getElementById('marketChart').getContext('2d');
    
    var data = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Tomato (₹/kg)',
                data: [35, 40, 38, 45],
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Onion (₹/kg)',
                data: [30, 28, 32, 28],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Potato (₹/kg)',
                data: [20, 21, 22, 22],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    };
    
    var options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } },
        scales: {
            y: { beginAtZero: false, title: { display: true, text: 'Price (₹/kg)' } }
        }
    };
    
    marketChart = new Chart(ctx, { type: 'line', data: data, options: options });
}

function updateChartPeriod(period) {
    if (!marketChart) return;
    
    var newData;
    if (period === 'week') {
        newData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                { data: [35, 40, 38, 45, 42, 48, 45] },
                { data: [30, 28, 32, 28, 30, 27, 29] },
                { data: [20, 21, 22, 21, 23, 22, 22] }
            ]
        };
    } else if (period === 'month') {
        newData = {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
                { data: [35, 40, 38, 45] },
                { data: [30, 28, 32, 28] },
                { data: [20, 21, 22, 22] }
            ]
        };
    } else {
        newData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                { data: [30, 32, 35, 38, 40, 42, 40, 38, 42, 45, 48, 50] },
                { data: [25, 28, 30, 32, 35, 38, 40, 35, 32, 30, 28, 30] },
                { data: [18, 19, 20, 22, 24, 25, 24, 22, 21, 20, 19, 20] }
            ]
        };
    }
    
    marketChart.data = newData;
    marketChart.update();
}

// ========================================
// CHATBOT FUNCTIONS
// ========================================

function initChatbot() {
    var chatLanguage = localStorage.getItem('chatLanguage') || 'en';
    document.getElementById('chatLanguage').value = chatLanguage;
    addBotMessage(langGreetings[chatLanguage] || langGreetings.en);
}

function getCurrentLanguage() {
    return document.getElementById('chatLanguage').value;
}

function sendMessage() {
    var input = document.getElementById('chatInput');
    var message = input.value.trim();
    
    if (!message) return;
    
    addUserMessage(message);
    input.value = '';
    showTypingIndicator();
    
    // Use setTimeout properly
    var delay = 800 + Math.random() * 1000;
    setTimeout(function() {
        hideTypingIndicator();
        var response = generateResponse(message);
        addBotMessage(response);
        saveToHistory(message);
    }, delay);
}

function addUserMessage(text) {
    var container = document.getElementById('chatMessages');
    var time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    var msgDiv = document.createElement('div');
    msgDiv.className = 'message user-message';
    msgDiv.innerHTML = '<div class="message-content"><p>' + text + '</p><span class="message-time">' + time + '</span></div>';
    
    container.appendChild(msgDiv);
    scrollToBottom();
}

function addBotMessage(text) {
    var container = document.getElementById('chatMessages');
    var time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    var msgDiv = document.createElement('div');
    msgDiv.className = 'message bot-message';
    msgDiv.innerHTML = '<div class="message-icon"><i class="fas fa-robot"></i></div><div class="message-content"><p>' + text + '</p><span class="message-time">' + time + '</span></div>';
    
    container.appendChild(msgDiv);
    scrollToBottom();
}

function showTypingIndicator() {
    var container = document.getElementById('chatMessages');
    var indicator = document.createElement('div');
    indicator.id = 'typingIndicator';
    indicator.className = 'message bot-message';
    indicator.innerHTML = '<div class="message-icon"><i class="fas fa-robot"></i></div><div class="message-content"><p><i class="fas fa-ellipsis-h"></i> Thinking...</p></div>';
    
    container.appendChild(indicator);
    scrollToBottom();
}

function hideTypingIndicator() {
    var indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function scrollToBottom() {
    var container = document.getElementById('chatMessages');
    container.scrollTop = container.scrollHeight;
}

function generateResponse(message) {
    var lang = getCurrentLanguage();
    var lowerMessage = message.toLowerCase();
    var knowledge = chatbotKnowledge[lang] || chatbotKnowledge.en;
    
    // Greetings
    var greetings = ['hello', 'hi', 'hey', 'namaste', 'नमस्ते', 'helloji'];
    if (greetings.some(function(g) { return lowerMessage.includes(g); })) {
        return knowledge.greetings[Math.floor(Math.random() * knowledge.greetings.length)];
    }
    
    // Disease keywords
    if (knowledge.disease && knowledge.disease.keywords.some(function(k) { return lowerMessage.includes(k); })) {
        return knowledge.disease.responses[Math.floor(Math.random() * knowledge.disease.responses.length)];
    }
    
    // Weather keywords
    if (knowledge.weather && knowledge.weather.keywords.some(function(k) { return lowerMessage.includes(k); })) {
        var temp = document.getElementById('tempValue').textContent;
        var condition = document.getElementById('weatherDesc').textContent;
        var humidity = document.getElementById('humidity').textContent;
        return 'Current weather in ' + appState.location.city + ': ' + temp + '°C, ' + condition + '. Humidity is ' + humidity + '.';
    }
    
    // Market keywords
    if (knowledge.market && knowledge.market.keywords.some(function(k) { return lowerMessage.includes(k); })) {
        return knowledge.market.responses[Math.floor(Math.random() * knowledge.market.responses.length)];
    }
    
    // Farming keywords
    if (knowledge.farming && knowledge.farming.keywords.some(function(k) { return lowerMessage.includes(k); })) {
        return knowledge.farming.responses[Math.floor(Math.random() * knowledge.farming.responses.length)];
    }
    
    // Harvest keywords
    if (knowledge.harvest && knowledge.harvest.keywords.some(function(k) { return lowerMessage.includes(k); })) {
        return knowledge.harvest.responses[Math.floor(Math.random() * knowledge.harvest.responses.length)];
    }
    
    // Crop-specific
    var currentCrop = appState.currentCrop.name;
    if (lowerMessage.indexOf(currentCrop.toLowerCase()) !== -1) {
        var cropInfo = cropsDatabase[currentCrop];
        if (cropInfo) {
            return currentCrop + ' is in ' + cropInfo.stage + ' stage. Common diseases: ' + cropInfo.diseases.join(', ') + '. Best season: ' + cropInfo.season + '.';
        }
    }
    
    // Default
    return knowledge.default[Math.floor(Math.random() * knowledge.default.length)];
}

function saveToHistory(message) {
    appState.chatHistory.unshift({
        message: message,
        timestamp: new Date().toISOString()
    });
    
    if (appState.chatHistory.length > 10) {
        appState.chatHistory.pop();
    }
    
    saveState();
    updatePastConversations();
}

function updatePastConversations() {
    var container = document.getElementById('pastList');
    
    if (appState.chatHistory.length === 0) {
        container.innerHTML = '<p style="padding: 10px; color: #999;">No past conversations</p>';
        return;
    }
    
    var html = '';
    appState.chatHistory.slice(0, 5).forEach(function(chat, index) {
        var date = new Date(chat.timestamp);
        var timeAgo = getTimeAgo(date);
        
        html += '<div class="past-item" onclick="loadPastConversation(' + index + ')">' +
            '<i class="fas fa-comment"></i>' +
            '<span>' + chat.message.substring(0, 30) + (chat.message.length > 30 ? '...' : '') + '</span>' +
            '<span class="past-date">' + timeAgo + '</span></div>';
    });
    
    container.innerHTML = html;
}

function loadPastConversation(index) {
    var chat = appState.chatHistory[index];
    if (chat) {
        document.getElementById('chatInput').value = chat.message;
    }
}

function getTimeAgo(date) {
    var now = new Date();
    var diff = now - date;
    var minutes = Math.floor(diff / 60000);
    var hours = Math.floor(diff / 3600000);
    var days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return minutes + 'm ago';
    if (hours < 24) return hours + 'h ago';
    return days + 'd ago';
}

// ========================================
// VOICE INPUT
// ========================================

function initVoiceInput() {
    var voiceBtn = document.getElementById('voiceInput');
    var indicator = document.getElementById('voiceIndicator');
    
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        voiceBtn.style.opacity = '0.5';
        voiceBtn.title = 'Voice input not supported';
        return;
    }
    
    var recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';
    
    voiceBtn.addEventListener('click', function() {
        indicator.classList.add('active');
        recognition.start();
    });
    
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        document.getElementById('chatInput').value = transcript;
        indicator.classList.remove('active');
        sendMessage();
    };
    
    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        indicator.classList.remove('active');
    };
    
    recognition.onend = function() {
        indicator.classList.remove('active');
    };
}

// ========================================
// CROP MANAGEMENT
// ========================================

function showCropSelector() {
    var selector = document.getElementById('cropSelector');
    selector.style.display = selector.style.display === 'none' ? 'block' : 'none';
}

function selectCrop(crop, variety, stage) {
    appState.currentCrop = {
        name: crop,
        variety: variety,
        stage: stage
    };
    
    saveState();
    updateUI();
    
    document.getElementById('cropName').textContent = crop;
    document.getElementById('cropVariety').textContent = 'Variety: ' + variety;
    document.getElementById('cropStage').textContent = 'Stage: ' + stage;
    document.getElementById('cropSelector').style.display = 'none';
    
    var cropImages = {
        'Tomato': 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=200&h=200&fit=crop',
        'Potato': 'https://images.unsplash.com/photo-1518977676601-b53f82b7b10b?w=200&h=200&fit=crop',
        'Onion': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop',
        'Wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&h=200&fit=crop',
        'Rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop',
        'Cotton': 'https://images.unsplash.com/photo-1598839858621-3a6a5765d0b1?w=200&h=200&fit=crop',
        'Sugarcane': 'https://images.unsplash.com/photo-1564602671089-731f11b7edd5?w=200&h=200&fit=crop',
        'Maize': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=200&h=200&fit=crop'
    };
    
    if (cropImages[crop]) {
        document.getElementById('cropImage').src = cropImages[crop];
    }
    
    showNotification('Crop changed to ' + crop);
}

// ========================================
// DISEASE DETECTION
// ========================================

function analyzeCropImage(file) {
    var uploadArea = document.getElementById('uploadArea');
    var results = document.getElementById('diseaseResults');
    var treatmentSection = document.getElementById('treatmentSection');
    
    var reader = new FileReader();
    reader.onload = function(e) {
        uploadArea.innerHTML = '<img src="' + e.target.result + '" alt="Uploaded" style="max-width: 100%; max-height: 200px; border-radius: 8px; margin-bottom: 15px;">' +
            '<h3>Analyzing Image...</h3><p>Using AI to detect diseases...</p>' +
            '<div class="upload-spinner"><i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary-color);"></i></div>';
        
        setTimeout(function() {
            var crop = appState.currentCrop.name;
            var diseases = cropsDatabase[crop] ? cropsDatabase[crop].diseases : ['Healthy'];
            var detectedDisease = diseases[Math.floor(Math.random() * diseases.length)];
            var confidence = Math.floor(Math.random() * 15) + 80;
            var isHealthy = Math.random() > 0.7;
            
            document.getElementById('resultQuality').textContent = isHealthy ? 'Excellent' : 'Moderate';
            document.getElementById('resultQualityBadge').textContent = isHealthy ? 'Healthy Crop' : 'Needs Attention';
            document.getElementById('resultQualityBadge').className = isHealthy ? 'result-badge good' : 'result-badge warning';
            
            document.getElementById('resultDisease').textContent = isHealthy ? 'None Detected' : detectedDisease;
            document.getElementById('resultDiseaseBadge').textContent = isHealthy ? 'Healthy' : 'Action Needed';
            document.getElementById('resultDiseaseBadge').className = isHealthy ? 'result-badge good' : 'result-badge warning';
            
            document.getElementById('resultConfidence').textContent = confidence + '%';
            document.getElementById('resultSolution').textContent = isHealthy ? 'No Treatment Needed' : 'Treatment Available';
            
            if (!isHealthy) {
                var treatments = getTreatments(detectedDisease);
                var treatmentContent = document.getElementById('treatmentContent');
                
                var treatmentHtml = '';
                treatments.forEach(function(treatment, index) {
                    treatmentHtml += '<div class="treatment-step"><span class="step-number">' + (index + 1) + '</span><div class="step-content"><h5>' + treatment.title + '</h5><p>' + treatment.description + '</p></div></div>';
                });
                
                treatmentContent.innerHTML = treatmentHtml;
                treatmentSection.style.display = 'block';
            } else {
                treatmentSection.style.display = 'none';
            }
            
            results.style.display = 'block';
            
            uploadArea.innerHTML = '<i class="fas fa-check-circle" style="color: var(--primary-color); font-size: 3rem;"></i>' +
                '<h3>Analysis Complete!</h3><p>' + (isHealthy ? 'Your crop looks healthy!' : 'Disease detected: ' + detectedDisease) + '</p>' +
                '<button class="btn btn-primary" onclick="resetUpload()"><i class="fas fa-redo"></i> Analyze Another</button>';
            
            showNotification('Disease analysis complete: ' + (isHealthy ? 'No issues found' : detectedDisease + ' detected'));
            
        }, 2000 + Math.random() * 2000);
    };
    
    reader.readAsDataURL(file);
}

function getTreatments(disease) {
    var treatments = {
        'Early Blight': [
            { title: 'Remove Infected Leaves', description: 'Carefully remove and destroy all infected leaves to prevent spread.' },
            { title: 'Apply Fungicide', description: 'Use Copper-based fungicide (Bordeaux mixture) - 2g per liter of water.' },
            { title: 'Improve Air Circulation', description: 'Space plants properly and prune excess foliage.' },
            { title: 'Water at Base', description: 'Avoid overhead watering. Water at the base in morning.' }
        ],
        'Late Blight': [
            { title: 'Apply Fungicide Immediately', description: 'Use systemic fungicide like Metalaxyl or Mancozeb.' },
            { title: 'Remove Infected Plants', description: 'Destroy severely infected plants immediately.' },
            { title: 'Improve Drainage', description: 'Ensure proper water drainage.' },
            { title: 'Use Resistant Varieties', description: 'Plant disease-resistant varieties next season.' }
        ],
        'default': [
            { title: 'Monitor Regularly', description: 'Check crops daily for signs of disease.' },
            { title: 'Maintain Hygiene', description: 'Keep farm tools clean.' },
            { title: 'Consult Expert', description: 'For severe cases, consult local agricultural officer.' }
        ]
    };
    
    return treatments[disease] || treatments['default'];
}

function resetUpload() {
    var uploadArea = document.getElementById('uploadArea');
    uploadArea.innerHTML = '<i class="fas fa-cloud-upload-alt"></i>' +
        '<h3>Drag & Drop or Click to Upload</h3><p>Supported formats: JPG, PNG, WEBP</p>' +
        '<input type="file" id="fileInput" accept="image/*" hidden>' +
        '<button class="btn btn-primary" onclick="document.getElementById(\'fileInput\').click()"><i class="fas fa-folder-open"></i> Browse Files</button>';
    
    document.getElementById('diseaseResults').style.display = 'none';
    attachFileUploadListener();
}

// ========================================
// NOTIFICATIONS
// ========================================

function showNotification(message) {
    var notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = '<i class="fas fa-bell"></i><span>' + message + '</span>';
    
    document.body.appendChild(notification);
    
    setTimeout(function() { notification.classList.add('show'); }, 10);
    
    setTimeout(function() {
        notification.classList.remove('show');
        setTimeout(function() { notification.remove(); }, 300);
    }, 3000);
    
    appState.notifications.push({
        message: message,
        timestamp: new Date().toISOString()
    });
    saveState();
    updateUI();
}

function performSearch() {
    var query = document.getElementById('searchInput').value.trim();
    if (!query) return;
    document.getElementById('chatInput').value = query;
    sendMessage();
}

// ========================================
// EVENT LISTENERS
// ========================================

function attachEventListeners() {
    document.getElementById('useCurrentLocation').addEventListener('click', getCurrentLocation);
    document.getElementById('manualLocation').addEventListener('click', showLocationModal);
    document.getElementById('closeLocationModal').addEventListener('click', hideLocationModal);
    document.getElementById('saveLocation').addEventListener('click', saveManualLocation);
    document.getElementById('changeCropBtn').addEventListener('click', showCropSelector);
    
    document.getElementById('cropSearch').addEventListener('input', function() {
        var search = this.value.toLowerCase();
        document.querySelectorAll('.crop-option').forEach(function(option) {
            var text = option.textContent.toLowerCase();
            option.style.display = text.indexOf(search) !== -1 ? 'block' : 'none';
        });
    });
    
    document.querySelectorAll('.crop-option').forEach(function(option) {
        option.addEventListener('click', function() {
            selectCrop(this.dataset.crop, this.dataset.variety, this.dataset.stage);
        });
    });
    
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var tab = this.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(function(c) { c.classList.remove('active'); });
            document.getElementById(tab + '-content').classList.add('active');
        });
    });
    
    document.querySelectorAll('.chart-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.chart-btn').forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
            updateChartPeriod(this.dataset.period);
        });
    });
    
    document.getElementById('sendMessage').addEventListener('click', sendMessage);
    document.getElementById('chatInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });
    
    document.getElementById('chatLanguage').addEventListener('change', function() {
        localStorage.setItem('chatLanguage', this.value);
    });
    
    document.querySelectorAll('.quick-reply').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.getElementById('chatInput').value = this.dataset.query;
            sendMessage();
        });
    });
    
    document.getElementById('pastToggle').addEventListener('click', function() {
        document.getElementById('pastList').classList.toggle('active');
        this.querySelector('.fa-chevron-down').classList.toggle('rotate');
    });
    
    document.getElementById('searchBtn').addEventListener('click', performSearch);
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });
    
    document.getElementById('refreshWeather').addEventListener('click', function() {
        this.querySelector('.fa-sync-alt').classList.add('fa-spin');
        updateWeather();
        setTimeout(function() {
            document.querySelector('.fa-sync-alt').classList.remove('fa-spin');
        }, 1000);
    });
    
    document.getElementById('scanCropBtn').addEventListener('click', function() {
        document.querySelector('.tab-btn[data-tab="disease"]').click();
        document.getElementById('fileInput').click();
    });
    
    document.getElementById('getSuggestionsBtn').addEventListener('click', function() {
        var crop = appState.currentCrop.name;
        document.getElementById('chatInput').value = 'Give me suggestions for growing ' + crop;
        sendMessage();
    });
    
    document.getElementById('expertCallBtn').addEventListener('click', function() {
        alert('Expert Consultation Service\n\nPhone: 1800-XXX-XXXX\nAvailable: Mon-Sat, 9AM-6PM');
    });
    
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        if (!confirm('Are you sure you want to logout?')) {
            e.preventDefault();
        }
    });
    
    attachFileUploadListener();
}

function attachFileUploadListener() {
    var fileInput = document.getElementById('fileInput');
    var uploadArea = document.getElementById('uploadArea');
    
    if (!fileInput || !uploadArea) return;
    
    uploadArea.addEventListener('click', function() { fileInput.click(); });
    
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function() {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            analyzeCropImage(e.dataTransfer.files[0]);
        }
    });
    
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length) {
            analyzeCropImage(e.target.files[0]);
        }
    });
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    loadState();
    initChatbot();
    initMarketChart();
    initVoiceInput();
    attachEventListeners();
    updateWeather();
    updateMarketData();
    console.log('Krishimitra App Initialized Successfully!');
});

// Add notification styles
var notificationStyles = '.notification { position: fixed; top: 90px; right: 20px; background: white; padding: 15px 25px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 12px; z-index: 10000; transform: translateX(400px); transition: transform 0.3s ease; } .notification.show { transform: translateX(0); } .notification i { color: var(--primary-color); font-size: 1.2rem; }';

var styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

