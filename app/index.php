<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Sliding Puzzle</title>
  <!-- vendors -->
  <link rel="stylesheet" href="assets/vendors/bootstrap/dist/css/bootstrap.min.css">
  <!-- end vendors -->
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

    <header class="navbar navbar-static-top" id="top" role="banner">
      <div class="container">
        <div class="navbar-header">
          <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a href="#" class="navbar-brand">Puzzle</a>
        </div>
        <nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">
          <ul class="nav navbar-nav">
            <li>
              <a href="#">jQuery Puzzle</a>
            </li>
            <li>
              <a href="#">Getting started</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <div class="container">
      <div class="row">
        <main class="col-md-12 text-center">
            <canvas id="puzzle" width="480" height="480"></canvas>
        </main>
      </div>
      <div class="row">
        <aside class="col-md-12 text-center" data-puzzle="thumbnails">
          <img class="item img-thumbnail active" data-puzzle-src="assets/images/001.jpg" src="assets/images/001.jpg" data-puzzle-options="{'tileCount':3}" alt="001" width="140" height="140">
          <img class="item img-thumbnail" data-puzzle-src="assets/images/002.jpg" src="assets/images/002.jpg" data-puzzle-options="{'tileCount':15, 'time':1}" alt="002" width="140" height="140">
          <img class="item img-thumbnail" data-puzzle-src="assets/images/003.jpg" src="assets/images/003.jpg" alt="003" width="140" height="140">
        </aside>
      </div>
      <div class="row">
        <aside class="col-md-12 text-center puzzle-level" data-puzzle="levels">
          <a class="btn btn-default levels l3" href="#3" data-level="3">Easy</a>
          <a class="btn btn-default levels l4" href="#4" data-level="4">Medium</a>
          <a class="btn btn-default levels l5" href="#5" data-level="5">Hard</a>         
        </aside>
      </div>
    </div>

  <!-- vendors -->
  <script src="assets/vendors/jquery/dist/jquery.min.js"></script>
  <script src="assets/vendors/bootstrap/dist/js/bootstrap.min.js"></script>
  <!-- end vendors -->
  <script src="assets/js/jquery.puzzle.js"></script>
  <script src="assets/js/scripts.js"></script>
</body>
</html>