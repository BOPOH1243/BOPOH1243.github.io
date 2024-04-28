window.onload = function () {
    var imgUrl = 'your_image.jpg'; // Путь к вашей картинке
    var container = document.getElementById('puzzle-container');

    var img = new Image();
    img.src = imgUrl;
    img.onload = function () {
        var imgWidth = this.width;
        var imgHeight = this.height;

        container.style.width = imgWidth + 'px';
        container.style.height = imgHeight + 'px';

        var pieceWidth = imgWidth / 4;
        var pieceHeight = imgHeight / 3;

        var pieces = [];

        for (var i = 0; i < 12; i++) {
            var piece = document.createElement('div');
            piece.id = 'piece' + i;
            piece.className = 'puzzle-piece';
            piece.style.width = pieceWidth + 'px';
            piece.style.height = pieceHeight + 'px';
            piece.style.backgroundImage = 'url(' + imgUrl + ')';
            piece.style.backgroundPosition = -pieceWidth * (i % 4) + 'px ' + -pieceHeight * Math.floor(i / 4) + 'px';
            piece.style.left = pieceWidth * (i % 4) + 'px';
            piece.style.top = pieceHeight * Math.floor(i / 4) + 'px';
            piece.setAttribute('draggable', true);
            piece.setAttribute('ondragstart', 'drag(event)');
            container.appendChild(piece);
            pieces.push(piece);
        }

        shufflePieces(pieces);
    };

    function shufflePieces(pieces) {
        for (var i = pieces.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tempLeft = pieces[i].style.left;
            var tempTop = pieces[i].style.top;
            pieces[i].style.left = pieces[j].style.left;
            pieces[i].style.top = pieces[j].style.top;
            pieces[j].style.left = tempLeft;
            pieces[j].style.top = tempTop;
        }
    }

    window.drag = function (ev) {
        ev.dataTransfer.setData('text', ev.target.id);
    }

    container.ondrop = function (ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData('text');
        var draggedPiece = document.getElementById(data);
        var targetPiece = ev.target;

        if (targetPiece.classList.contains('puzzle-piece')) {
            var tempTop = draggedPiece.style.top;
            var tempLeft = draggedPiece.style.left;
            draggedPiece.style.top = targetPiece.style.top;
            draggedPiece.style.left = targetPiece.style.left;
            targetPiece.style.top = tempTop;
            targetPiece.style.left = tempLeft;
        }
    }

    container.ondragover = function (ev) {
        ev.preventDefault();
    }
}
