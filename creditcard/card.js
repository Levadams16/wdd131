function displayError(msg) {
    console.error(msg);
}

function isCardNumberValid(number) {
    return number === "1234123412341234";
}

function submitHandler(event) {
    event.preventDefault();

    let errorMsg = '';
    const cardNumber = document.getElementById("card_number").value;
    const month = document.getElementById("month_input").value;
    const year = document.getElementById("year_input").value;

    if (isNaN(cardNumber)) {
        errorMsg += "Card number is an invalid number\n";
    }

    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear() % 100;

    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        errorMsg += "Expiration month is invalid\n";
    } else if (isNaN(yearNum)) {
        errorMsg += "Expiration year is invalid\n";
    } else if (
        yearNum < currentYear ||
        (yearNum === currentYear && monthNum < currentMonth)
    ) {
        errorMsg += "Card is expired\n";
    }

    if (errorMsg !== "") {
        displayError(errorMsg);
        return false;
    }

    return true;
}

document.querySelector("#credit-card").addEventListener('submit', submitHandler);