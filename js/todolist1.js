$(function () {
    load();
    $("#title").on("keyup", function (e) {
        if (e.keyCode === 13) {
            if ($(this).val().trim() == "") {
                alert("请输入内容")
            } else {
                let data = getData();
                data.push({ title: $(this).val(), done: false });
                setting(data);
                load();
            }
        }
    });

    $("#donelist,#todolist").on("click", "a", function () {
        let data = getData();
        let index = $(this).attr("id");
        // console.log(index);
        data.splice(index, 1);
        setting(data);
        load();

    });

    $("#donelist,#todolist").on("click", "input", function () {
        let data = getData();
        let index = $(this).siblings("a").attr("id");
        // console.log(index);
        
        data[index].done = $(this).prop("checked");
        setting(data);
        load();
    });
    function getData() {
        let data = localStorage.getItem("todo");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        };
    };
    function setting(chun) {
        localStorage.setItem("todo", JSON.stringify(chun));
    };
    function load() {
        let data = getData();
        // console.log(data);
        let todoCount = 0; // 正在进行的个数
        let doneCount = 0;
        $("#donelist,#todolist").empty();
        $.each(data, function (i, n) {
            if (n.done) {
                $("#donelist").prepend(`<li><input type = 'checkbox' checked></input><p>${n.title}</p><a href = 'javascript:;' id = ${i}></a></li>`)
                doneCount++;
            } else {
                $("#todolist").prepend(`<li><input type = 'checkbox'></input><p>${n.title}</p><a href = 'javascript:;' id = ${i}></a></li>`)
                todoCount++;
            };
        });
        $("#donecount").text(doneCount);
        $("#todocount").text(todoCount);
    };
});