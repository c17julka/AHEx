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
    '<p>This survey will first ask you questions about your internet and news experience. Then, it will show you 3 different pictures and questions about them. It is recommended to answer the survey on a desktop computer or a laptop.</p>',
    '<p>The image below is an example image of what questions you will be answering in the upcoming section. These questions are about your previous experiences. Read these questions before moving on. You can not interact with this image.</p><img src="imgs/exempel1.png" border="1px black solid" height="300px">',
    '<p>The image below is an example image of what questions you will be answering in the upcoming section, after the questions about your experiences. The questions will be alongside 3 different pictures of website designs. Read these questions before moving on. You can not interact with this image.</p><img src="imgs/exempel.png" border="1px black solid" height="500px">',
    '<p>Your answers and the response time of your answers will be stored and be used in the purpose of a thesis. If you do not wish to participate, you are free to cancel the survey whenever you want.<br>Press "Next" to start the survey.</p>'
];

var preparation_pages = [
    '<p>The image below is an example image of what questions you will be answering in the upcoming sections. Read them before moving on. You can not interact with this image.</p><img src="imgs/exempel.png" border="1px black solid" height="500px">'
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

// var preparation = {
//     type: 'instructions',
//     pages: preparation_pages,
//     show_clickable_nav: true
// };
// timeline.push(preparation);

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
    stimulus: 'Click the button to submit your result',
    choices: ['Submit']

}
timeline.push(final);

// Imgs preload
var images = [
    'imgs/1.png',
    'imgs/2.png',
    'imgs/3.png'
];

// Add id
var subject_id = jsPsych.randomization.randomID(20);

jsPsych.data.addProperties({
    subjectId: subject_id
});

// Counting whenever participant exits / reenteres window
var event_counter = 0;

// Save data to put in db
function saveData() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'write_data.php'); // change 'write_data.php' to point to php script.
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if(xhr.status == 200){
        var response = JSON.parse(xhr.responseText);
        console.log(response.success);
      }
    };
    xhr.send(jsPsych.data.get().json());
}

jsPsych.init({
    timeline: timeline,
    preload_images: images,
    on_interaction_data_update: function()
    {
        event_counter++;
    },
    on_finish: function() {
        jsPsych.data.addProperties({
            eventCounter: event_counter
        });
        
        saveData();
        alert("Thank you for your time.");
    }
});