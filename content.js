num_calls = 0;
pages_needed = 50;

function updateProgress() {
  var time = Math.min(num_calls, 5) * 500;
  num_calls++;
  var num_pages = computeNumPages();

  setProgressTextAndBar(num_pages);

  window.setTimeout(updateProgress, time);
}

function computeNumPages() {
  var log_text = $(".pdf-logs").text();
  let re = /([0-9]+) pages, [0-9]+ bytes/;
  var matches = log_text.match(re);
  if (matches !== null) {
    return parseInt(matches[1]);
  }
  return -1;
}

function setProgressTextAndBar(num_pages) {
  var old_text = $("#bar_text").html();
  if (num_pages === -1) {
    $("#bar_text").html("LOADING...");
    $("#bar_progress").width("0%");
  } else {
    var progress_percentage = Math.round(100 * num_pages / pages_needed);
    var progress_percentage_text = progress_percentage.toString().concat("%");
    $("#bar_text").html(progress_percentage_text);
    $("#bar_progress").width(progress_percentage_text);
  }
  var new_text = $("#bar_text").html();
  var new_progress = parseInt(new_text.slice(0,-1));
  var old_progress = parseInt(old_text.slice(0,-1));

  if (new_progress > old_progress && old_text !== "LOADING...") {
   congratulate(num_pages);
  }
}

$("body").append("<div id='whole_shebang'><div id='progress_bar'><div id='bar_background'><div id='bar_progress'><div id='bar_text'>LOADING...</div></div></div></div><div id='motivational'></div></div>");

updateProgress(0);
updateMotivational();
window.setInterval(updateMotivational, 20 * 60 * 1000);
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      $("#whole_shebang").toggle();
      updateProgress(0);
      updateMotivational();
    }
  }
);

function congratulate(page_num) {
  var motivational = $("#motivational");
  items = [
           "It's a start!",
           "Two in!",
           "That makes three!",
           "Getting a little momentum!",
           "A tenth of the way there, but who's counting?",
           "Starting to feel it, huh?",
           "Lucky number 7!",
           "What is this, a thesis for ants?",
           "Getting there...",
           "Double digits!",

           "Time for elevensies!",
           "A round dozen!",
           "Quick, write another page! Don't want to get stuck at unlucky 13! 👻",
           "Your paper's a teenager now!",
           "Fifteen!",
           "Sweet sixteen!",
           "Fun fact: seventeen was proven to be a prime number in 1717 🤯",
           "Your paper's legal! 😏",
           "Rounding the corner!",
           "Another page!",

           "Lucky number 21! 🃏",
           "Nothing special about 22, keep going!",
           "Don't look now, but you're at 23!",
           "Another one!",
           "You're officially halfway!",
           "All easy from here!",
           "Go take a well-deserved break!",
           "I can barely keep up!",
           "Getting close!",
           "Thirty!!!!",

           "Getting closer!",
           "And another one bites the dust!",
           "33",
           "Only 16 to go!",
           "Gotta push on through!",
           "Another one...",
           "Another one...!",
           "Keep the momentum going!",
           "Write a little more, don't leave it at 39!",
           "Home stretch!",

           "Single digits left!",
           "42 42 42 42 42!!",
           "7 left to go!",
           "Six!",
           "Only 10% more!",
           "Add in a few pages worth of diagrams and call it a day",
           "Fake fun fact: 47 is the most ubiquitous number in the universe",
           "Just two more!",
           "So close, you can almost taste it 👅",
           "AHHHHHHH!!! CONGRATS!!! 😎 🥳  🤩",

           "Really going for gold, huh? 🤓"
          ];
  var item = "";
  if (page_num > 50) {
    item = items[50];
  } else {
    item = items[page_num - 1];
  }
  motivational.html(item);
  window.setTimeout(updateMotivational, 10 * 1000);
}


function updateMotivational() {
  var motivational = $("#motivational");
  items = [
           "Call Andrew; he misses you!!", 
           "Remember: one day we'll all be dead and none of this will matter.",
           "About time for a semicolon, don't you think?",
           "If you add a diagram here you'll be in great shape",
           "You're so diligent & hardworking!",
           "You're so smart!",
           "You're so eloquent!",
           "Your diagrams look almost as nice as your smile 😍",
           "Ada Lovelace has got nothing on you!",
           "You're the 21st-century Grace Hopper!",
           "Come here often?",
           "Hmmm, that last paragraph could use a little editing...",
           "Go make a tea!",
           "STRESSED? CALL +1-602-318-1382 TO CONNECT WITH OUR STRESS-RELIEF EXPERTS",
           "Azucena, Thesis-Slayer, Protector of the Realm ⚔️  🐉",
           "Somebody call 911!! Someone's on fire!!! 🔥🔥🔥 (Hint: it's you)",
           "Dynamite work! 🧨 ",
           "Hint: Saying the same thing two different ways means you only have to write a 25 page thesis.",
           "You're pretty when you concentrate",
           "Hope you're having a great day!",
           "You're now entering the no-stress zone.",
           "At least it's not cryptography!",
           "Lookin' like a snack 😋",
           "🙌 🙌 🙌",
           "\"😍😍😍\" - Andrew R.",
           "\"The secret to getting ahead is getting started.\" -Mark Twain",
           "\"If you want to achieve greatness stop asking for permission.\" -Anonymous",
           "\"To live a creative life, we must lose our fear of being wrong.\" -Anonymous",
           "\"Just when the caterpillar thought the world was ending, he turned into a butterfly.\" -Proverb 🐛 🦋",
           "\"If you can't explain it simply, you don't understand it well enough.\" -Albert Einstein",
           "\"Success is the sum of small efforts, repeated day-in and day-out.\" -Robert Collier",
           "\"It is better to fail in originality than to succeed in imitation.\" -Herman Melville",
           "\"Real difficulties can be overcome; it is only the imaginary ones that are unconquerable.\" -Theodore N. Vail",
           "\"Courage, dear heart.\" -C.S. Lewis",
           "\"In the middle of difficulty lies opportunity.\" -Albert Einstein",
           "\"Believe you can and you’re halfway there.\" -Theodore Roosevelt",
           "\"Anything’s possible if you’ve got enough nerve.\" -J.K. Rowling",
           "\"And you ask ‘What if I fall?’ Oh but my darling, what if you fly?\" -Erin Hanson",
           "\"Embrace uncertainty. Some of the most beautiful chapters in our lives won’t have a title until much later.\" -Bob Goff",
           "\"Whether you think you can or think you can't, you're right.\" -Henry Ford",
           "Take a break! Stretch!"
          ];
  var item = items[Math.floor(Math.random()*items.length)];
  motivational.html(item);
}

