$(function () {
    load();
    $("#title").on("keyup", function (event) {
        if (event.keyCode === 13) {
            var locke = getting();
            console.log(locke);
            locke.push({ title: $(this).val(), done: false });
            setting(locke);
            load();

        }
    });
    $("ol, ul").on("click", "a", function () {
        var as = getting();
        var index = $(this).attr("id");
        as.splice(index, 1);
        setting(as);
        load();
    });
    $("ol, ul").on("click", "input", function () {
        var as = getting();
        var index = $(this).siblings("a").attr("id");
        as[index].done = $(this).prop("checked");
        setting(as);
        load();

    })
    //获取
    function getting() {
        var data = localStorage.getItem("todo");
        if (data != null) {
            return JSON.parse(data);
        } else {
            return [];
        }

    }
    //储存
    function setting(ent) {
        localStorage.setItem("todo", JSON.stringify(ent))
    }
    //渲染
    function load() {
        var ger = getting();
        $("ol, ul").empty();
        $.each(ger, function (i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type = 'checkbox' checked ><p>" + n.title + "</p><a href = 'javascript:;' id=" + i + "></a></li>")
            } else {
                $("ol").prepend("<li><input type = 'checkbox'><p>" + n.title + "</p><a href = 'javascript:;' id=" + i + "></a></li>")
            }
        })

    }

});