//console.log(stemmer("President", true));

var topWords = [];
var topWordsMaxLength = 40;
var highestTopWords = 10;

function cleanHeadline(str)
{
    // From https://gist.github.com/sebleier/554280#gistcomment-2838837
    const stopwords = ["a","about","above","after","again","against","ain","all","am","an","and","any","are","aren","aren't","as","at","be","because","been","before","being","below","between","both","but","by","can","couldn","couldn't","d","did","didn","didn't","do","does","doesn","doesn't","doing","don","don't","down","during","each","few","for","from","further","had","hadn","hadn't","has","hasn","hasn't","have","haven","haven't","having","he","her","here","hers","herself","him","himself","his","how","i","if","in","into","is","isn","isn't","it","it's","its","itself","just","ll","m","ma","me","mightn","mightn't","more","most","mustn","mustn't","my","myself","needn","needn't","no","nor","not","now","o","of","off","on","once","only","or","other","our","ours","ourselves","out","over","own","re","s","same","shan","shan't","she","she's","should","should've","shouldn","shouldn't","so","some","such","t","than","that","that'll","the","their","theirs","them","themselves","then","there","these","they","this","those","through","to","too","under","until","up","ve","very","was","wasn","wasn't","we","were","weren","weren't","what","when","where","which","while","who","whom","why","will","with","won","won't","wouldn","wouldn't","y","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves","could","he'd","he'll","he's","here's","how's","i'd","i'll","i'm","i've","ive","let's","ought","she'd","she'll","that's","there's","they'd","they'll","they're","they've","ve","we'd","we'll","we're","we've","what's","when's","where's","who's","why's","would","able","abst","accordance","according","accordingly","across","act","actually","added","adj","affected","affecting","affects","afterwards","ah","almost","alone","along","already","also","although","always","among","amongst","announce","another","anybody","anyhow","anymore","anyone","anything","anyway","anyways","anywhere","apparently","approximately","arent","arise","around","aside","ask","asking","auth","available","away","awfully","b","back","became","become","becomes","becoming","beforehand","begin","beginning","beginnings","begins","behind","believe","beside","besides","beyond","biol","brief","briefly","c","ca","came","cannot","can't","cause","causes","certain","certainly","co","com","come","comes","contain","containing","contains","couldnt","date","different","done","downwards","due","e","ed","edu","effect","eg","eight","eighty","either","else","elsewhere","end","ending","enough","especially","et","etc","even","ever","every","everybody","everyone","everything","everywhere","ex","except","f","far","ff","fifth","first","five","fix","followed","following","follows","former","formerly","forth","found","four","furthermore","g","gave","get","gets","getting","give","given","gives","giving","go","goes","gone","got","gotten","h","happens","hardly","hed","hence","hereafter","hereby","herein","heres","hereupon","hes","hi","hid","hither","home","howbeit","however","hundred","id","ie","im","immediate","immediately","importance","important","inc","indeed","index","information","instead","invention","inward","itd","it'll","j","k","keep","keeps","kept","kg","km","know","known","knows","l","largely","last","lately","later","latter","latterly","least","less","lest","let","lets","like","liked","likely","line","little","'ll","look","looking","looks","ltd","made","mainly","make","makes","many","may","maybe","mean","means","meantime","meanwhile","merely","mg","might","million","miss","ml","moreover","mostly","mr","mrs","much","mug","must","n","na","name","namely","nay","nd","near","nearly","necessarily","necessary","need","needs","neither","never","nevertheless","new","next","nine","ninety","nobody","non","none","nonetheless","noone","normally","nos","noted","nothing","nowhere","obtain","obtained","obviously","often","oh","ok","okay","old","omitted","one","ones","onto","ord","others","otherwise","outside","overall","owing","p","page","pages","part","particular","particularly","past","per","perhaps","placed","please","plus","poorly","possible","possibly","potentially","pp","predominantly","present","previously","primarily","probably","promptly","proud","provides","put","q","que","quickly","quite","qv","r","ran","rather","rd","readily","really","recent","recently","ref","refs","regarding","regardless","regards","related","relatively","research","respectively","resulted","resulting","results","right","run","said","saw","say","saying","says","sec","section","see","seeing","seem","seemed","seeming","seems","seen","self","selves","sent","seven","several","shall","shed","shes","show","showed","shown","showns","shows","significant","significantly","similar","similarly","since","six","slightly","somebody","somehow","someone","somethan","something","sometime","sometimes","somewhat","somewhere","soon","sorry","specifically","specified","specify","specifying","still","stop","strongly","sub","substantially","successfully","sufficiently","suggest","sup","sure","take","taken","taking","tell","tends","th","thank","thanks","thanx","thats","that've","thence","thereafter","thereby","thered","therefore","therein","there'll","thereof","therere","theres","thereto","thereupon","there've","theyd","theyre","think","thou","though","thoughh","thousand","throug","throughout","thru","thus","til","till","tip","together","took","toward","towards","tried","tries","truly","try","trying","ts","twice","two","u","un","unfortunately","unless","unlike","unlikely","unto","upon","ups","us","use","used","useful","usefully","usefulness","uses","using","usually","v","value","various","'ve","via","viz","vol","vols","vs","w","want","wants","wasnt","way","wed","welcome","went","werent","whatever","what'll","whats","whence","whenever","whereafter","whereas","whereby","wherein","wheres","whereupon","wherever","whether","whim","whither","whod","whoever","whole","who'll","whomever","whos","whose","widely","willing","wish","within","without","wont","words","world","wouldnt","www","x","yes","yet","youd","youre","z","zero","a's","ain't","allow","allows","apart","appear","appreciate","appropriate","associated","best","better","c'mon","c's","cant","changes","clearly","concerning","consequently","consider","considering","corresponding","course","currently","definitely","described","despite","entirely","exactly","example","going","greetings","hello","help","hopefully","ignored","inasmuch","indicate","indicated","indicates","inner","insofar","it'd","keep","keeps","novel","presumably","reasonably","second","secondly","sensible","serious","seriously","sure","t's","third","thorough","thoroughly","three","well","wonder","a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p","q", "r", "s", "t", "u", "v", "w", "x", "y", "z","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const words = str.split(" ");
    const result = [];

    // Remove stop words + empty values from headline sentence
    for (i = 0; i < words.length; i++)
    {
        // Separate words in sentence by various symbols
        let wordClean = words[i].split(/[\d,.:;\s'‘’–—?%!&	-]/g).join("");
        wordClean = wordClean.toLowerCase();

        if (!stopwords.includes(wordClean) && wordClean != null && wordClean != "")
        {
            wordClean = stemmer(wordClean, false); // Stem word
            result.push(wordClean);
            
        }
    }

    if (result != null)
    {
        return(result);
    }
    else
    {
        console.log("Empty string");
    }
   
}

function getHeadlineWords()
{   
    const headlines = document.getElementsByClassName("story-h");

    // Checks all headlines on the website
    for (y = 1; y < headlines.length; y++)
    {
        let rawWords = cleanHeadline(headlines[y].innerText);
        topWords = JSON.parse(localStorage.getItem("topWords"));

        console.log(rawWords);
        
        // Check if any headline words match with user's lower top words
        checklowertopwords:
        for (c = 0; c < rawWords.length; c++)
        {
            for (x = highestTopWords; x < topWords.length; x++)
            {
                if (rawWords[c] == topWords[x])
                {
                    design(headlines[y], 2); // Group 2 relevance
                    break checklowertopwords;
                } 
                else 
                {
                    design(headlines[y], 1); // Group 1 (low) relevance
                }       
                
            }
            
        }
        
        // Check if any headline words match with user's highest top words
        checktopwords:
        for (c = 0; c < rawWords.length; c++)
        {
            for (x = 0; x < highestTopWords; x++)
            {
                if (rawWords[c] == topWords[x])
                {
                    design(headlines[y], 3); // Group 3 (high) relevance
                    break checktopwords;
                }
                else 
                {
                    
                }         
                
            }
            
        }
    }
}

var headlines = document.getElementsByClassName("story-h");

// Checks all headlines on the website
for (y = 1; y < headlines.length; y++)
{
    let rawWords = cleanHeadline(headlines[y].innerText);
    topWords = JSON.parse(localStorage.getItem("topWords"));

    console.log(rawWords);
    
    // Check if any headline words match with user's lower top words
    checklowertopwords:
    for (c = 0; c < rawWords.length; c++)
    {
        for (x = highestTopWords; x < topWords.length; x++)
        {
            if (rawWords[c] == topWords[x])
            {
                design(headlines[y], 2); // Group 2 relevance
                break checklowertopwords;
            } 
            else 
            {
                design(headlines[y], 1); // Group 1 (low) relevance
            }       
            
        }
        
    }
    
    // Check if any headline words match with user's highest top words
    checktopwords:
    for (c = 0; c < rawWords.length; c++)
    {
        for (x = 0; x < highestTopWords; x++)
        {
            if (rawWords[c] == topWords[x])
            {
                design(headlines[y], 3); // Group 3 (high) relevance
                break checktopwords;
            }
            else 
            {
                
            }         
            
        }
        
    }
}

// Fetches correct parent of selected headline
function design(elem, groupNo)
{
    const className = "story-float-img";
    const removeClassName = "story-sponsored";
    const regex = new RegExp("\\b" + className + "\\b");
    
    do {
        if (regex.exec(elem.className) && !elem.classList.contains(removeClassName))
        {
            //if (annotation == 1)

            if (groupNo == 1) // Group 1 (low) relevance
            {
                group1(elem);
            }
            else if (groupNo == 2) // Group 2 relevance
            {
                group2(elem);
            }
            else // Group 3 (high) relevance
            {
                group3(elem);
            }

            //else
            
            
        }
        elem = elem.parentNode;
    } while (elem) {} 
    
}

// Group 1 (low) relevance design
function group1(elem)
{
    const pic = elem.querySelector(".story-img-link");
    const text = elem.querySelector(".story-txt");
    const headline = elem.querySelector(".story-h");
    const subjectpic = elem.querySelector(".meta-bar-cat");

    pic.style.display="none";
    text.style.display="none";
    headline.style.fontWeight="400";
    subjectpic.style.backgroundColor="#808080";
}

// Group 2 relevance design
function group2(elem)
{
    const pic = elem.querySelector(".story-img-link");
    const text = elem.querySelector(".story-txt");
    const headline = elem.querySelector(".story-h");
    const subjectpic = elem.querySelector(".meta-bar-cat");

    pic.style.display="none";
    text.style.display="block";
    headline.style.fontWeight="400";
    subjectpic.style.backgroundColor="#98585e";

}

// Group 3 (high) relevance design
function group3(elem)
{
    const pic = elem.querySelector(".story-img-link");
    const text = elem.querySelector(".story-txt");
    const headline = elem.querySelector(".story-h");
    const subjectpic = elem.querySelector(".meta-bar-cat");

    pic.style.display="block";
    text.style.display="block";
    headline.style.fontWeight="800";
    subjectpic.style.backgroundColor="#e11c2e";

}

function group1Hiding(elem)
{
    const pic = elem.querySelector(".story-img-link");
    const text = elem.querySelector(".story-txt");

    pic.style.display="none";
    text.style.display="none";
}

function group2Hiding(elem)
{
    const pic = elem.querySelector(".story-img-link");
    const text = elem.querySelector(".story-txt");

    pic.style.display="none";
    text.style.display="block";
}

function group3Hiding(elem)
{
    const pic = elem.querySelector(".story-img-link");
    const text = elem.querySelector(".story-txt");

    pic.style.display="block";
    text.style.display="block";
}

function createBox()
{
}

// Get clicked headline
document.addEventListener('mousedown', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    var text = target.textContent || target.innerText; 

    // Only retrieves text if clicked element's parent is certain class
    const className = "story-h";
    const regex = new RegExp("\\b" + className + "\\b");
    
    do {
        if (regex.exec(target.className))
        {
            storeWords(text);
        }
        target = target.parentNode;
    } while (target) {}  
    
}, false);

// Two functions are created to store locally properly (https://stackoverflow.com/a/6846158)
function storeWords(str)
{
    storeWords2(str);
}

function storeWords2(str2)
{

    var headlineWords = cleanHeadline(str2);

    // Convert top words local storage string to array if storage is not null
    if (typeof localStorage !== 'undefined')
    {
        if (localStorage.getItem("topWords"))
        {
            topWords = JSON.parse(localStorage.getItem("topWords"));
        }
    } else {}
    
    
    // Insert clicked words into top words
    for (i = 0; i < headlineWords.length; i++)
    {
        // Remove value if it exists in array and unshift it 
        if (topWords.includes(headlineWords[i]))
        {
            let position = topWords.indexOf(headlineWords[i]);
            topWords.splice(position, 1);
            topWords.unshift(headlineWords[i]);
        }
        else
        {
            topWords.unshift(headlineWords[i]);
        }

        if (typeof localStorage !== 'undefined')
        {
            localStorage.setItem("topWords", JSON.stringify(topWords)); // Need to convert array to string / vice versa when storing retrieving top words
        } else {}
        
    }

    // Keep top words under certain length
    if (topWords.length >= topWordsMaxLength)
    {
        let del = topWords.length - topWordsMaxLength;
        topWords.splice(topWordsMaxLength-1, del);

        if (typeof localStorage !== 'undefined')
        {
            localStorage.setItem("topWords", JSON.stringify(topWords)); // Need to convert array to string / vice versa when storing retrieving top words
        } else {}

        console.table(topWords);
    }

}
