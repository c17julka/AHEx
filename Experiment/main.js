var timeline = [];

var scale = [
    "-3",
    "-2",
    "-1",
    "0",
    "1",
    "2",
    "3"
]

var initial_questions = [
    {
        prompt: "How often do you browse the internet?", name: "internet", labels: scale
    },
    {
        prompt: "How often do you visit news websites?", name: "news", labels: scale
    }
];

var image_questions = [
    {
        prompt: "I like the appearance of the articles", name: "appearance", labels: scale
    },
    {
        prompt: "The readability is clear", name: "readability", labels: scale
    },
    {
        prompt: "From first glance, I know which article I want to read", name: "readability2", labels: scale
    },
    {
        prompt: "I would browse this website in the future", name: "future", labels: scale
    }
    
];

var instruct_pages = [
    '<p>This survey will first ask you questions about your internet and news experience. Then, it will show you 3 different pictures and questions about them.</p>',
    '<p>Your answers and the response time of your answers will be stored and be used in the purpose of a thesis. If you do not wish to participate, you are free to cancel the survey whenever you want.<br>Press "Next" to start the survey.</p>'
];

// Instructions
var instructions = {
    type: 'instructions',
    pages: instruct_pages,
    show_clickable_nav: true
};
timeline.push(instructions);

// Experience questions
var trial = {
    type: 'survey-likert',
    questions: initial_questions,
    preamble: '<p>Rate your previous experiences on a scale of -3 to 3<br>(-3 = Very rarely, 0 = Neutral, 3 = Very often)</p>'
};
timeline.push(trial);

// Main questions
var main_q = {
    timeline: [
        {
            type: 'survey-likert',
            questions: image_questions,
            preamble: '<img src="imgs/3.png" height="600px"><p>How much do you agree / disagree with these statements?<br>(-3 = Strongly disagree, 0 = Neutral, 3 = Strongly agree)</p>'
        },
        {
            type: 'survey-likert',
            questions: image_questions,
            preamble: '<img src="imgs/1.png" height="600px"><p>How much do you agree / disagree with these statements?<br>(-3 = Strongly disagree, 0 = Neutral, 3 = Strongly agree)</p>'
        },
        {
            type: 'survey-likert',
            questions: image_questions,
            preamble: '<img src="imgs/2.png" height="600px"><p>How much do you agree / disagree with these statements?<br>(-3 = Strongly disagree, 0 = Neutral, 3 = Strongly agree)</p>'
        }
    ]
    
};
timeline.push(main_q);

// End
var final = {
    type: 'html-button-response',
    stimulus: 'End of survey',
    choices: ['End']

}
timeline.push(final);

// Imgs preload
var images = [
    'imgs/1.png',
    'imgs/2.png',
    'imgs/3.png'
];

// Save data
function saveData(name, data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'index.php'); 
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({filename: name, filedata: data}));
  }

jsPsych.init({
    timeline: timeline,
    preload_images: images,
    on_finish: function() {
        var filename = Date.now();
        saveData(filename, jsPsych.data.get().csv());
        jsPsych.data.displayData();
    }
});