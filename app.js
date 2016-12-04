var tweetText;
var url = 'http://quotes.stormconsultancy.co.uk/random.json';
var colors = ['#778899','#1E90FF','#483D8B','#5F9EA0','#DC143C','#9932CC','#FFD700'];
var changeContent = function (author, quote) {
    var blockquote = $('blockquote div');
    var quoteIcon = $('<span class="quote-icon"><i class="fa fa-quote-left fa-md" aria-hidden="true"></i></span>');
    var cite = $('cite');
    blockquote.empty().append(quoteIcon).append(quote);
    cite.html(author);
    $('body, .quote').css({backgroundColor:colors[Math.floor(Math.random()* colors.length)]});
};
var getQuote = function () {
    var url1 = $.ajax({
        url: url
    });
    $.when(url1).done(function (data) {
        tweetText = {
            author: data.author
            , quote: data.quote
        };
        changeContent(data.author, data.quote);
    }).fail(function (data) {
        console.log('Error');
    });
}
$('.quote').on('click', getQuote);
$('.twitter-share-button').on('click', function () {
    var formattedStr = tweetText.quote;
    if (tweetText.quote.length > 140) {
        formattedStr = tweetText.quote.substr(0, 120) + '...';
        console.log(formattedStr);
    }
    $(this).attr('href', 'https://twitter.com/intent/tweet?text=' + formattedStr + '&hashtags=coding');
   
});
$('document').ready(function () {
    getQuote();
});