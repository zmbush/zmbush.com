---
---
var p = "guest@zmbush.com $ "
var text = '<br /><br /><br />Type `help` for a list of commands.<br />' + p
var command = ""
var cursor = "_"
var accepting_input = true;
$(function(){
  $(document).keypress(function(e){
    if(accepting_input){
      switch(e.which){
        case 13:
          text += command;
          text += '<br />';
          accepting_input = false;
          processCommand(command);
          $('#term').html(text + '...');
          break;
        default:
          command += String.fromCharCode(e.which);
          $('#term').html(text + command + cursor);
          break;
      }

    }
  });
  $(document).keydown(function(e){
    if(accepting_input){
      if(e.which == 8){
        command = command.substring(0, command.length - 1)
        $('#term').html(text + command + cursor);
      }
    }
  });
  $('#term').html(text);
});

function processCommand(cin){
  switch(cin){
    case 'linkedin':
      window.location = "http://www.linkedin.com/pub/zachary-bush/1a/a78/671";
      break;
    case 'github':
      window.location = "https://github.com/zipcodeman";
      break;
    case 'static':
      window.location = '/static/';
      break;
    case 'exit':
      window.location = 'http://www.google.com/';
      break;
    default:
      $.ajax({
        url: 'output/' + cin,
        dataType: "html",
        error: function(){
          displayOutput(cin + ": command not found");
        },
        success: function(output){
          displayOutput(output);
        }
      });
  }
}

function displayOutput(output){
  text += output;
  text += "<br />"
  text += p;
  command = '';
  accepting_input = true;
  $('#term').html(text);
  $("html, body").animate({ scrollTop: $(document).height() }, "slow");
}
