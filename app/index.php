<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Sliding Puzzle</title>
  <!-- vendors -->
  <link href="assets/vendors/bootstrap/dist/css/bootstrap.min.css">
  <!-- end vendors -->
  <link href="assets/css/style.css">
</head>
<body>
  <aside id="slider">
    <form>
      <label>Easy</label>
      <input type="range" id="scale" value="4" min="3" max="5" step="1">
      <label>Hard</label>
    </form>
  </aside>
  <main id="main" class="main">
    <canvas id="puzzle" width="480px" height="480px"></canvas>
  </main>
  <!-- vendors -->
  <script src="assets/vendors/bootstrap/dist/js/bootstrap.min.js"></script>
  <!-- end vendors -->
  <script src="assets/js/sliding.js"></script>
</body>
</html>