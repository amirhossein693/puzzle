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
        <aside class="text-center" data-puzzle="thumbnails">
          <img class="item" data-puzzle-src="assets/images/001.jpg" src="assets/images/001.jpg" data-puzzle-options="{'tileCount':5}" alt="001" width="140" height="140" class="img-thumbnail">
          <img class="item" data-puzzle-src="assets/images/002.jpg" src="assets/images/002.jpg" data-puzzle-options="{'tileCount':4, 'time':1}" alt="002" width="140" height="140" class="img-thumbnail">
          <img class="item" data-puzzle-src="assets/images/003.jpg" src="assets/images/003.jpg" alt="003" width="140" height="140" class="img-thumbnail">
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