<?php
$post_data = json_decode(file_get_contents('php://input'), true); 
// the directory "data" must be writable by the server
$name = "data/".$post_data['filename'].".csv"; 
$data = $post_data['filedata'];
// write the file to disk
file_put_contents($name, $data);
?>
<!DOCTYPE html>
<html>
    <head>
        <title>My experiment</title>
        <script src="jspsych6.1/jspsych.js"></script>
        <script src="jspsych6.1/plugins/jspsych-survey-likert.js"></script>
        <script src="jspsych6.1/plugins/jspsych-instructions.js"></script>
        <script src="jspsych6.1/plugins/jspsych-html-button-response.js"></script>
        <script src="main.js"></script>
        
        <link href="jspsych6.1/css/jspsych.css" rel="stylesheet" type="text/css"></link>
    </head>
    <body></body>
    
</html>
