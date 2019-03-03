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
        <div class="file-manager__pager-container">
            <div class="file-manager__pager">
            </div>
            <div class="file-manager__sort">
                <img class="file-manager__sort-img" src="/img/sort.png">
                <div class="file-manager__sort-options">
                    <div class="file-manager__sort-option" data-active="0">По имени</div>
                    <div class="file-manager__sort-option" data-active="0">По размеру</div>
                </div>
            </div>
            <div class="file-manager__search">
                <form class="file-manager__search-form" onsubmit="return false;">
                    <input class="file-manager__search-text" type="text" placeholder="поиск">
                </form>
            </div>
            <div class="file-manager__add-folder">
                <img class="file-manager__add-folder-img" src="/img/add-folder.png">
                <div class="create-directory">
                    <form class="create-directory__form" onsubmit="return false;">
                        <div class="create-directory__input-name">Введите название:</div>
                        <input class="create-directory__input" type="text" placeholder="Название" name="name" value="New folder">
                        <input class="create-directory__submit" type="submit" value="Создать">
                    </form>
                </div>
            </div>
            <div class="file-manager__add-file">
                <img class="file-manager__add-file-img" src="/img/add-file.png">
                <div class="upload-file">
                    <form class="upload-file__form" onsubmit="return false;" enctype="multipart/form-data">
                        <input class="upload-file__input" type="file" placeholder="Название" name="file"">
                        <input class="upload-file__submit" type="submit" value="Загрузить">
                    </form>
                </div>
            </div>
        </div>
        <div class="file-manager__directories">
        </div>
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