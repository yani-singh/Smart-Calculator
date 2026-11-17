const screen = document.getElementById('screen');

function enterSymbol(symbol) {
    if (screen.value === 'Error') {
        screen.value = '';
    }

    screen.value += symbol;
}

function resetCalculator() {
    screen.value = '';
}

function removeLast() {
    if (screen.value === 'Error') {
        screen.value = '';
        return;
    }

    screen.value = screen.value.slice(0, -1);
}

function showAnswer() {
    const expression = screen.value.trim();

    if (expression === '') {
        return;
    }

    if (!/^[0-9+*/().\-\s]+$/.test(expression)) {
        screen.value = 'Error';
        return;
    }

    try {
        const answer = Function('"use strict"; return (' + expression + ')')();

        if (!Number.isFinite(answer)) {
            screen.value = 'Error';
            return;
        }

        screen.value = Number(answer.toFixed(8)).toString();
    } catch (error) {
        screen.value = 'Error';
    }
}
