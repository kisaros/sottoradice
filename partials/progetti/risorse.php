<?php if (!empty($resources)): ?>

    <div class="appunti-pdf rounded-lg border">

        <?php foreach ($resources as $resource): ?>

            <a class="row align-items-center justify-content-between mx-0 p-3 p-md-4"
               href="<?= $dominio . htmlspecialchars($resource['file']) ?>"
               target="_blank"
               title="<?= htmlspecialchars($resource['title']) ?>">

                <div class="d-flex align-items-center">

                    <span class="d-none d-md-block fa-regular fa-file-pdf fa-2x rounded-lg bg-purple-25 text-purple p-2"></span>

                    <div class="mx-md-3 mb-2 mb-md-0">

                        <p class="pb-0">
                            <?= htmlspecialchars($resource['title']) ?>
                        </p>

                        <?php if (!empty($resource['description'])): ?>
                            <small class="text-secondary">
                                <?= htmlspecialchars($resource['description']) ?>
                            </small>
                        <?php endif; ?>

                    </div>

                </div>

                <div>

                    <?php if (!empty($resource['type'])): ?>
                        <small class="bg-purple-25 text-purple px-3 rounded-pill mb-0 mr-3">
                            <?= htmlspecialchars($resource['type']) ?>
                        </small>
                    <?php endif; ?>

                    <span class="fa fa-download"></span>

                </div>

            </a>

        <?php endforeach; ?>

    </div>

<?php endif; ?>