<navbar id="navbar" class="navbar navbar-be px-0">
    <div class="container">
        <div class="d-flex align-items-center justify-content-between w-100">

            <a href="/home.php" class="logo" title="Homepage | Effatà">

            </a>


            <ul class="list-inline mb-0 d-flex">
                <li class="list-inline-item d-flex align-items-center mx-3">
                    <a class="text-white" href="/backend.php">
                        Home
                    </a>
                </li>

                <li class="list-inline-item ml-3">
                    <form action="/logout.php" method="post" name="form1" enctype="text/plane">
                        <div class="d-flex justify-content-center">
                            <button type="submit" class="btn px-0 text-white"
                                    style="min-width: 30px; max-width: 30px">Esci
                            </button>
                        </div>
                    </form>
                </li>
            </ul>
        </div>
    </div>
</navbar>
