$(document).ready(function(){

  var inputs = $('.buttons').find('span').not('.operator');
  var operators = $('.buttons').find('.operator').not('#clear, #equals');
  var screen = $('#screen');
  var resultState = false;

  function lastOperator(){
    if((screen.html()[(screen.html().length)-1]) == 'x' ||
       (screen.html()[(screen.html().length)-1]) == '+' ||
       (screen.html()[(screen.html().length)-1]) == '-' ||
       (screen.html()[(screen.html().length)-1]) == '÷'){
      return true;
    } else {
      return false;
    }
  };

  function calculate(arg1, operator, arg2){
    switch(operator){
      case 'x':
        return arg1 * arg2;
      case '+':
        return arg1 + arg2;
      case '-':
        return arg1 - arg2;
      case '÷':
        return arg1 / arg2;
    };
  };

  function clearScreen(){
    screen.html('');
    resultState = false;
  };

  function updateScreen(){
    if(screen.html().length > 12){
      var data = parseFloat(screen.html());
      screen.html(data.toFixed(12));
    }
  }

  //number inputs
  $.each(inputs, function(i){
    $(inputs[i]).on('click',function(){
      if(resultState){
        clearScreen();
      }
      if(lastOperator()){
        screen.append(" "+inputs.text()[i]);
      } else {
        screen.append(inputs.text()[i]);
      }
    });
  });

  //operator inputs
  $.each(operators, function(i){
    $(operators[i]).on('click',function(){
      if(!lastOperator() && screen.html().length !== 0){
        screen.append(" "+operators.text()[i]);
        resultState = false;
      }
    });
  });

  //clear button function
  $('#clear').on('click',function(){
    clearScreen();
  });

  //evaluate
  $('#equals').on('click',function(){
    var exp = screen.html().split(' ');
    var result = calculate(parseFloat(exp[0]), exp[1], parseFloat(exp[2]));
    if( isNaN(result) || result === Infinity || result === -Infinity || exp.length !== 3){
      screen.html("Error");
    } else {
      screen.html(result);
    }
    resultState = true;
    updateScreen();
  });

});
