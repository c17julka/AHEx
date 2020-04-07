var timeline = [];

var scale1 = [
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
        prompt: "How often do you browse the internet?", name: "internet", labels: scale1
    },
    {
        prompt: "How often do you visit news websites?", name: "news", labels: scale1
    }
];

var image_questions = [
    {
        prompt: "I like the appearance of the articles", name: "appearance", labels: scale1
    },
    {
        prompt: "The readability is clear", name: "readability", labels: scale1
    },
    {
        prompt: "From first glance, I know which article I want to read", name: "readability2", labels: scale1
    },
    {
        prompt: "I would browse this website in the future", name: "future", labels: scale1
    }
    
];

var instruct_pages = [
    '<p>This survey will first ask you questions about your internet and news experience. Then, it will show you 3 different pictures and questions about them.</p>',
    '<p>Your answers and the response time of your answers will be stored and be used in the purpose of a thesis. If you do not wish to participate, you are free to cancel the survey whenever you want.<br>Press "Next" to start the survey.</p>'
];

var instructions = {
    type: 'instructions',
    pages: instruct_pages,
    show_clickable_nav: true
};
timeline.push(instructions);

var trial = {
    type: 'survey-likert',
    questions: initial_questions,
    preamble: '<p>Rate your previous experiences on a scale of -3 to 3<br>(-3 = Very rarely, 0 = Neutral, 3 = Very often)</p>'
};
timeline.push(trial);

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

var images = [
    'imgs/1.png',
    'imgs/2.png',
    'imgs/3.png'
];

jsPsych.init({
    timeline: timeline,
    preload_images: images
});