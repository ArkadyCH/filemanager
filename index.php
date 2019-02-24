<!Doctype html>
<html>
<head>
    <title>File Manager</title>
    <meta charset="Utf-8">
    <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
    <link href="/css/style.css" rel="stylesheet">
</head>
<body>
<div class="file-manager">
    <div class="file-manager__pager">
    </div>
    <div class="file-manager__directories">
    </div>
</div>
<div class="create-directory">
    <form class="create-directory__form">
        <div class="create-directory__input-name">Выберать директорию:</div>
        <select>
            <option value=".">/</option>
        </select>
        <div class="create-directory__input-name">Введите название:</div>
        <input class="create-directory__input" type="text" placeholder="Название">
        <input class="create-directory__submit" type="submit" value="Создать">
    </form>
</div>
<script
        src="https://code.jquery.com/jquery-3.3.1.js"
        integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
        crossorigin="anonymous">
</script>
<script src="/js/script.js"></script>
</body>
</html>