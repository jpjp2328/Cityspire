var destinationBtn = document.getElementById('destinationBtn');
var destinationContent = document.getElementById('destinationContent');
var closeBtn = document.getElementById('closeBtn');
var overlay = document.getElementById('overlay');

destinationBtn.addEventListener('click', function () {
    destinationContent.classList.remove('hidden');
    overlay.classList.remove('hidden');
});

closeBtn.addEventListener('click', function () {
    destinationContent.classList.add('hidden');
    overlay.classList.add('hidden');
});