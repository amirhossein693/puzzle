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
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <aside id="slider">
            <form>
              <label>Easy</label>
              <input type="range" id="scale" value="4" min="3" max="5" step="1">
              <label>Hard</label>
            </form>
          </aside>
          <main id="main" class="main">
            <canvas id="puzzle" width="480" height="480"></canvas>
          </main>
        </div>
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