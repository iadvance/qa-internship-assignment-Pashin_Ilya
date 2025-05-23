const email = document.getElementById('email');
const error = document.getElementById('error');

// Вешаем обработчик события отправки формы
document.getElementById('Form').onsubmit = e => {
    // Отменяем перезагрузку страницы
    e.preventDefault();

    // Проверяем email с помощью регулярного выражения
    if (!/^\S+@\S+\.\S+$/.test(email.value)) {

        // если email не валидный
        email.classList.add('invalid');
        error.style.display = 'block';
        return;
    }

    // если email валидный
    email.classList.remove('invalid');
    error.style.display = 'none';
    alert('Email подтвержден');
};