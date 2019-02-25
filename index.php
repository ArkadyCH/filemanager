<!Doctype html>
<html>
<head>
    <title>File Manager</title>
    <meta charset="Utf-8">
    <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
    <link href="/css/style.css" rel="stylesheet">
</head>
<body>
<div class="section__container">
    <div class="file-manager">
        <div class="file-manager__pager">
        </div>
        <div class="file-manager__directories">
        </div>
    </div>
    <div class="create-directory">
        <h1>Создать папку</h1>
        <form class="create-directory__form" onsubmit="return false;">
            <div class="create-directory__input-name">Введите название:</div>
            <input class="create-directory__input" type="text" placeholder="Название" name="name" value="New folder">
            <input class="create-directory__submit" type="submit" value="Создать">
        </form>
    </div>
    <div class="upload-file">
        <h1>Загрузить файл</h1>
        <form class="upload-file__form" onsubmit="return false;">
            <div class="upload-file__input-name">Выберите файл:</div>
            <input class="upload-file__input" type="file" placeholder="Название" name="file"">
            <input class="upload-file__submit" type="submit" value="Создать">
        </form>
    </div>
</div>

<script
        src="https://code.jquery.com/jquery-3.3.1.js"
        integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
        crossorigin="anonymous">
</script>
<script src="/js/script.js"></script>
</body>
</html>