<?php
global $title;
global $subtitle;
global $bannerImage;
?>


<div class="text position-center-center z-index-1 p-3 p-md-4">
    <h1 class="serif font-weight-700 text-center">
        <?php echo $title; ?></h1>
    <h2 class="subtitle text-center"><?php echo $subtitle; ?></h2>
</div>
<picture>
    <img class="img object-cover" src="https://effata.altervista.org/assets/images/<?php echo $bannerImage; ?>"
         alt="<?php echo "$title " . "| Effatà"; ?>">
</picture>

