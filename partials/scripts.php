<script src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
<script src="<?php echo $dominio; ?>assets/js/jscroll-master/jquery.jscroll.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.5.13/clipboard.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>


<script src="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/min/tiny-slider.js"></script>
<script src="<?php echo $dominio; ?>assets/js/javascript.js"></script>
<script src="<?php echo $dominio; ?>assets/js/init-jscroll.js"></script>
<script src="<?php echo $dominio; ?>assets/js/clipboard.min.js"></script>

<script>
    var clipboard = new ClipboardJS('.btn-copy');

    clipboard.on('success', function (e) {
        e.trigger.blur();
        toastr.success('Testo copiato!');
    });

    clipboard.on('error', function (e) {
        toastr.error('Browser non supportato!');
    });
</script>

<script>
    $(window).on("scroll touchmove", function () {
        $('#navbar').toggleClass('navbar-small', $(document).scrollTop() > 0);
    });
</script>
