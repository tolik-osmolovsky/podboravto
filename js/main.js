// Мобильное меню
(function () {
    var burger = document.getElementById('burger');
    var nav = document.getElementById('nav');
    if (!burger || !nav) return;

    burger.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            nav.classList.remove('open');
            burger.setAttribute('aria-expanded', 'false');
        }
    });
})();

// Выпадающие списки выбора номера (hero, «Позвонить сейчас», плавающая кнопка)
(function () {
    var boxes = Array.prototype.slice.call(document.querySelectorAll('.drop-box'));
    if (!boxes.length) return;

    function close(box) {
        box.classList.remove('open');
        var b = box.querySelector('button[aria-expanded]');
        if (b) b.setAttribute('aria-expanded', 'false');
    }

    boxes.forEach(function (box) {
        var btn = box.querySelector('button');
        if (!btn) return;

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var open = box.classList.toggle('open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            boxes.forEach(function (other) {
                if (other !== box) close(other);
            });
        });
    });

    document.addEventListener('click', function (e) {
        boxes.forEach(function (box) {
            if (!box.contains(e.target)) close(box);
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') boxes.forEach(close);
    });
})();