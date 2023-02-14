const rightSideContainer = document.querySelector('.right-side'),
      form = document.querySelector('.form'),
      menuComplete = document.querySelector('.menu-complete'),
      inputName = document.querySelector('#name'),
      inputNamber = document.querySelector('#number'),
      inputMonth = document.querySelector('#date'),
      inputYear = document.querySelector('#date2'),
      inputCvcNum = document.querySelector('#cvc'),
      cardName = document.querySelector('.card__name'),
      cardNamber = document.querySelector('.card__number'),
      cardDateMonth = document.querySelector('#mm'),
      cardDateYear = document.querySelector('#yy'),
      cvcNum = document.querySelector('#cvc-num'),
      btnConfirm = document.querySelector('.confirm'),
      btnContinue = document.querySelector('.continue');


inputName.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[0-9]/g, '');

    if (!inputName.value){
        cardName.textContent = 'CARD NAME';
    } else {
        cardName.textContent = inputName.value;
    }
});

const exlude = [8, 35, 36, 37, 39, 46]; // White listed keyCodes

inputNamber.addEventListener('keydown', function(e) {
    let code = e.keyCode
    // Не цифры и белый список не пройдет
    if (!(code >= 48 && code <= 57) && !!!exlude.find(k => k === +code)) {
        e.preventDefault();
        return false;
    }
    let len = e.target.value.length
    // Добавит пробелы
    if ((code >= 48 && code <= 57)) {
        if (len % 5 === 0 && len < 20 && code !== 8) {
            e.target.value += " ";
        }
    }

    // Вводим номер карты в реальном времени
    if (!inputNamber.value){
        cardNamber.textContent = '0000 0000 0000 0000';
    } else {
        cardNamber.textContent = inputNamber.value;
    }
});

inputMonth.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
    cardDateMonth.textContent = e.target.value;
});

inputYear.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
    cardDateYear.textContent = e.target.value;
});

inputCvcNum.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
    cvcNum.textContent = e.target.value;
});

btnContinue.addEventListener('click', () => {
    menuComplete.classList.add('none');
    location.reload();
});


new JustValidate('.form', {
    rules: {
        text: {
            required: true,
            function: () => {
               return inputNamber.value.length < 20 ? null : true
            }
        },
        monthAndYear: {
            required: true,
            function: () => {
               return inputMonth.value.length && inputYear.value.length < 2 ? null : true;
            }
        },
        cvcNum: {
            required: true,
            function: () => {
               return inputCvcNum.value.length < 3 ? null : true;
            }
        },
    },
    colorWrong: '#FF5252',
    messages: {
        text: {
          required: 'Wrong format, numbers only',
          function: 'Enter 16 numbers'
        },
        monthAndYear: {
          required: `Can't be blank`,
          function: 'Enter 2 numbers'
        },
        cvcNum: {
          required: `Can't be blank`,
          function: 'Enter 3 numbers'
        },
    },
    submitHandler: function (){
        form.classList.add('none');
        menuComplete.classList.remove('none');
        menuComplete.classList.add('animate__animated', 'animate__backInDown');
    }
});



// Вроде как закончил с функционалом - осталось мобильный адаптив
// (Можно попробовать добавить анимацию появления и исчезноваения окна COMLETED)