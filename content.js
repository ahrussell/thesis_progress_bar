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
           "Another page, wow!"
          ];
  var item = items[page_num % items.length];
  motivational.html(item);
  window.setTimeout(updateMotivational, 10 * 1000);
}


function updateMotivational() {
  var motivational = $("#motivational");
  items = [
           "You go, girl!",
           "\"😍😍😍\" - Andrew R.",
           "Call Andrew; he misses you."
          ];
  var item = items[Math.floor(Math.random()*items.length)];
  motivational.html(item);
}

