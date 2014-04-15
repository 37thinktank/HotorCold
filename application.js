
//$(document).ready(function(){

$(function() {
  hint();

    var answer = Math.floor(Math.random()*100);
    console.log(answer);
    var t = null;
    var prev_distance = null;
    var tries = 1

    function hint() {   
  
    $('#submit').click(submit);

    $('#guess').keydown(function(e){
      if (e.keyCode == 13) {
        submit();
      }
    });
      
      function submit(){
        event.preventDefault();
        var guess = $('#guess').val();//look up the javascript/jquery trim
        $('#guess').val($.trim($('#guess').val()));
        console.log(guess);
        validate(guess); 
      }

      function validate(guess) {
        if(guess == '') {
          $('#answer_hint').html('Please select a value');
          return;
        }else if (guess > 100 || guess != Math.floor(guess) || guess < 1) {
          $('#answer_hint').html("Error: Must be between 1 and 100").css({color:'red'});
          return;
        }
        
        distance = Math.abs(guess - answer);

        if (guess == answer) {
          console.log("Congrats");
          $('#answer_hint').html('Congrats - '+tries+' Guesses!').css({'color':'#000', 'font-weight':'bold'});
        }
        else if (prev_distance == null) {
          firstGuess(guess, answer);    
        } else {
          hotOrCold(prev_distance, distance);
        }
        prev_distance = distance;
        
      }
      

    function firstGuess (guess, answer){
      if (guess < answer) {
        // return ("Too low");
        console.log("Too Low");
        $('#answer_hint').html('Too low').css({color:'#000'});
      }
      else if (guess > answer) {
        // return ("Too high");
        console.log("Too high");
        $('#answer_hint').html('Too high').css({color:'#000'});
      }
      tries = tries + 1;
    }

    function hotOrCold (prev_distance, distance){
      if (prev_distance > distance){
        $('#answer_hint').html('Getting Warmer').css({color:'#000'});
      } 
      else if (prev_distance < distance){
        $('#answer_hint').html('Brrr... Colder').css({color:'#000'});
      }
      tries = tries + 1;
    }

    $('#newgame').click(function(e){
      e.preventDefault();
      answer = Math.floor(Math.random()*100);
      console.log(answer);
      $('#answer_hint').html('');
      $('#guess').val("");
    });

    $('#cheat').click(function(e){
      e.preventDefault();
      alert(answer);
    });

    };
  });