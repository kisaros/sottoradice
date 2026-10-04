<?php if (!empty($gallery)): ?>

    <div class="insta-gallery">

        <?php foreach ($gallery as $index => $image): ?>

            <?php
            $alt = !empty($image['alt'])
                ? $image['alt']
                : $project['title'] . ' | Foto ' . ($index + 1);
            ?>

            <a href="<?= $dominio . htmlspecialchars($image['file']) ?>"
               class="gallery-item glightbox"
               data-gallery="gallery-progetto">

                <img
                    src="<?= $dominio . htmlspecialchars($image['file']) ?>"
                    alt="<?= htmlspecialchars($alt) ?>"
                >

            </a>

        <?php endforeach; ?>

    </div>

<?php endif; ?>