console.log('hi');
let x1 = '';
let x2 = '';
let operation = '';
let func = '';
let digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
let operators = ['+', '–', 'x', '÷'];
let funcs = ['AC', '+/-', '%'];
let screen = document.querySelector('.calculator__input-field');
let dotFlag = true;
screen.textContent = '0';

let calculator = document.querySelector('.calculator');

calculator.addEventListener('click', function(event) {
  let potentialButton = event.target;
  if (!potentialButton.classList.contains('calculator__button')) return;
  else {
    console.log('click');
    varDetermine(potentialButton);
    console.log(x1, operation, x2);
  }
});

function Render(content) {
  if (content % 1 !== 0) {
    screen.textContent = Math.round(content * 100) / 100;
  }
  else {
    screen.textContent = content;
  }
}


function varDetermine(button) {
  let variable = button.textContent;

  if (variable === '=') {
    if (x1 === '1488') {
      alert('Марк и Яша любят пенисы')
    }
    if (x1 === '20.08') {
      let password = prompt('Введите пароль: ');
      if (password === 'vika14maks08') {
        alert('ТЫ САМАЯ ЛУЧШАЯ КОТЯ, Я ТЕБЯ ЛЮБЛЮЮЮ!!!!<3')
      }
    }
    calculations();

    Render(x1);
  }
  else if (operators.includes(variable) && x1 && !x2) {
    operation = variable;
  }
  else if (digits.includes(variable) && !operation) {
    if (variable === '.' && x1) {
      if (x1.includes('.')) return;
      else {
        x1 += variable;

        Render(x1);
      }
    }
    else {
      x1 += variable;
      Render(x1);
    }
  }
  else if (digits.includes(variable) && operation) {
    if (variable === '.' && x2) {
      if (x2.includes('.')) return;
      else {
        x2 += variable;

        Render(x2);
      }
    }
    else {
      x2 += variable;

      Render(x2);
    }
  }
  else if (funcs.includes(variable)) {
    func = variable;

    functions();
  }
  else if (x1 && operation && operators.includes(variable)) {
    calculations();
    operation = variable;

    Render(x1);
  }
  else if (variable === "=") {
    Render(x1);
  }
}

function calculations() {
  x1 = +x1;
  x2 = +x2;

  switch (operation) {
    case '+':
      x1 = x1 + x2;
      break;
    case '–':
      x1 = x1 - x2;
      break;
    case 'x':
      x1 = x1 * x2;
      break;
    case '÷':
      x1 = x1 / x2;
      break;
    case '=':
  }

  x2 = '';
}

function functions() {
  switch (func) {
    case 'AC':
      x1 = '';
      x2 = '';
      operation = '';
      func = '';

      Render('0');
      break;
    case '+/-':
      x1 = +x1 * -1;

      Render(x1);
      break;
    case '%':
      if (x2) {
        x2 = x1 / 100 * x2;

        Render(x2);
        break;
      }

      x1 = x1 / 100;
      Render(x1);
      break;
  }
}

function dotAvailability(x) {
  return x.includes('.');
}
