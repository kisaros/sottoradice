<?php
global $title;
global $subtitle;
global $bannerImage;
?>


<div class="position-center-center z-index-1 w-100 px-4">
    <h1 class="serif text-white font-weight-700 text-center mx-4">
        <?php echo $title; ?></h1>
    <h2 class="subtitle text-white text-center mx-4"><?php echo $subtitle; ?></h2>
</div>
<picture>
    <img class="img-small object-cover" src="<?php echo $dominio; ?>assets/images/<?php echo $bannerImage; ?>"
         alt="<?php echo "$title " . "| Effatà"; ?>">
</picture>

