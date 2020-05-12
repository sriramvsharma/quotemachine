const projectName = "random-quote-machine";
localStorage.setItem('example_project', 'Random Quote Machine');
let quotesData;

/*
  Code by Sriram Sharma
  Modified by Sriram Sharma for an FCC certification on web frameworks. 
*/

function inIframe () { try { return window.self !== window.top; } catch (e) { return true; } }


var currentQuote = '', currentAuthor = '';
function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

function getQuotes() {
  return $.ajax({
    url: 'https://programming-quotes-api.herokuapp.com/quotes/random',
    success: function(jsonQuotes) {
        quotesData = JSON.parse(JSON.stringify(jsonQuotes));
      
    }
  });
  getRandomQuote();
}

function getRandomQuote() {
    currentQuote = quotesData.en
    currentAuthor = quotesData.author;
    return quotesData;  
}

function getQuote() {

  let randomQuote = getRandomQuote();
  
//   currentQuote = randomQuote.en;
//   currentAuthor = randomQuote.author;

  if(inIframe())
  {
    $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));

  }
  
  $(".quote-text").animate(
    { opacity: 0 },
    500,
    function() {
      $(this).animate({ opacity: 1}, 500);
      $('#text').text(currentQuote);
    }
  );

  $(".quote-author").animate(
    { opacity: 0 },
    500,
    function() {
      $(this).animate({ opacity: 1}, 500);
      $('#author').html(randomQuote.author);
    }
  );  
  getQuotes();
}

$(document).ready(function() {
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote);

  $('#tweet-quote').on('click', function() {
    if(!inIframe()) {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
    }
  });

 
});