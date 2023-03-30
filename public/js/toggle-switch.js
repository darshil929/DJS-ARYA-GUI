document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.querySelector('input[type="checkbox"]');

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            // do this
            // console.log('sim-activate');
            socket.emit('sim-enable');
        } else {
            // do that
            socket.emit('sim-disable');
        }
    });
});

