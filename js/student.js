var studentData = [
    {id:1,stuId:"20200801",pwd:"111",money:200},
    {id:2,stuId:"20200802",pwd:"111",money:200},
    {id:3,stuId:"20200803",pwd:"111",money:200},
    {id:4,stuId:"20200804",pwd:"111",money:200},
    {id:5,stuId:"20200805",pwd:"111",money:200},
    {id:6,stuId:"20200806",pwd:"111",money:200},
    {id:7,stuId:"20200807",pwd:"111",money:200},
    {id:8,stuId:"20200808",pwd:"111",money:200},
    {id:9,stuId:"20200809",pwd:"111",money:200}
];

var pageSize = 5;//每页显示的条数
var currentPage = 1;//当前页
var totalPage;//总页数
var editId = -1;//模态框里面的id

//dom加载完成后，执行这个方法
$(function() {
    displayData();//显示数据在页面上
    displayPage();//生成页码
    addPageEvent();//页码的添加事件
    deleteEvent();//删除事件的函数
    addEvent();//增加事件的函数
    saveAddEvent();//保存增加事件或者修改事件的模态框的函数
    editEvent();////学生信息的编辑事件
});

//让数据显示在页面上
function displayData() {
    //清除page按钮的选中样式
    $("#divPage button").removeClass("btn-primary");
    //给对应的按钮添加选中样式
    $("#divPage button").eq(currentPage-1).addClass(" btn btn-primary");
    $("#tbStudent").html("");//清空表格
    var start = (currentPage-1)*pageSize;
    var end = start + pageSize;
    for(var i=start;i<end && i<studentData.length;i++) {
        $("#tbStudent").append(`<tr>
        <td><input type="checkbox"/></td>
        <td>${studentData[i].id}</td>
        <td>${studentData[i].stuId}</td>
        <td>${studentData[i].pwd}</td>
        <td>${studentData[i].money}</td>
        <td>
            <i class="btnDel glyphicon glyphicon-trash" data-index="${studentData[i].id}"></i>
            <i class="btnEdit glyphicon glyphicon-edit" data-index="${studentData[i].id}"></i>
        </td>
        </tr>`);
        displayPage();
    }
}

//删除事件
function deleteEvent() {
    $("#tbStudent").on("click",".btnDel",function() {
        var id = $(this).attr("data-index");
        for(var i=0;i<studentData.length;i++) {
            if(studentData[i].id == id) {
                studentData.splice(i,1);
                displayPage();//重新渲染页码
                if(currentPage > totalPage){
                    currentPage = totalPage
                }
                displayData();//初始化数据
                break;
            }
        }
    })

}

//添加事件的模态框
function addEvent() {
    $("#btnAdd").click(function() {
        $("#addModal").modal("show");
        //清空用户在input框中输入的值
        $("#textAddId").val("");
        $("#textAddStuId").val("");
        $("#textAddPwd").val("");
        $("#textAddMoney") .val("");
        //记录添加事件
        editId = -1;
    })
}

//保存学生信息添加事件或者编辑事件的数据
function saveAddEvent() {
    $("#btnSaveAddStudent").click(function() {
        if(editId == -1){
            //获取用户输入的值
            let id = $("#textAddId").val();
            let stuId = $("#textAddStuId").val();
            let pwd = $("#textAddPwd").val();
            let money = $("#textAddMoney").val();
            //将获取的用户输入的值组成一个对象
            var addObj = {id:id,stuId:stuId,pwd:pwd,money:money};
            //将组成的对象添加到数组中去
            studentData.push(addObj);
            //隐藏添加事件的模态框
            $("#addModal").modal("hide");
            //初始化
            displayData();
            displayPage();//重新渲染页码
        }else {
            let id = Number($("#textAddId").val());
            let stuId = $("#textAddStuId").val();
            let pwd = $("#textAddPwd").val();
            let money = Number($("#textAddMoney").val());
            //修改当前学生的信息
            for(var i=0;i<studentData.length;i++) {
                if(studentData[i].id == editId) {
                    studentData[i].id = id;
                    studentData[i].stuId = stuId;
                    studentData[i].pwd = pwd;
                    studentData[i].money = money;
                    $("#addModal").modal("hide");
                    displayData();
                    break;
                }
            }
        }
    })
}

//生成页码
function displayPage() {
    var count = studentData.length;//总条数
    totalPage = Math.ceil(count/pageSize);//总页数
    $("#divPage").html("");//清空页码
    for(var i=1;i<=totalPage;i++) {
        if(i == currentPage) {
            $("#divPage").append(`<button class="btn btn-primary">${i}</button>`)
        }else {
            $("#divPage").append(`<button class="btn ">${i}</button>`)
        }
    }
}

//页码的添加事件
function addPageEvent() {
    $("#divPage").on("click","button",function() {
        currentPage = Number($(this).text());
        displayData();
    })
}

//学生信息的编辑事件
function editEvent() {
    $("#tbStudent").on("click",".btnEdit",function() {

        console.log($(this).attr("data-index"));
        //1.弹出修改框
        $("#addModal").modal("show");
        //2.显示当前这一条数据的信息
        var id = $(this).attr("data-index");
        for(var i=0;i<studentData.length;i++) {
            if(studentData[i].id == id) {
                $("#textAddId").val(studentData[i].id);
                $("#textAddStuId").val(studentData[i].stuId);
                $("#textAddPwd").val(studentData[i].pwd);
                $("#textAddMoney").val(studentData[i].money);
                //把修改的学生信息id保存起来
                editId = id;
                break;
            }
        }
    })
}