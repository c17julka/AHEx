console.log(stemmer("Matthews", true));

function getHeadlineWords()
{
    var headlines = document.getElementsByClassName("story-h");
    var testarray = [];

    for (i = 3; i < headlines.length; i++)
    {
        var rawWords = headlines[i].innerText.split(" ");
        testarray += rawWords;
    }

    console.log(testarray);
}

