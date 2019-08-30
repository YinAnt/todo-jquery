!function($) {

    var TodoApp = function() {
        this.$todoRemaining = $("#todo-remaining"),
        this.$todoTotal = $("#todo-total"),
        this.$doneTotal = $("#done-total"),

        this.$todoList = $("#todo-list"),
        this.$doneList = $("#done-list"),

        this.$todoForm = $("#todo-form"),
        this.$todoInput = $("#todo-input-text"),

        this.$archiveBtn = $("#btn-archive"),
        this.$todoSubBtn = $("#btn-submit"),
        this.$todoClearBtn = $("#btn-clear"),
        this.$todoDelBtn = $("#btn-delete"),

        this.$todoText = ".todo-text",
        this.$todoDel = ".todo-delete",
        this.$todoDoneChk = ".todo-done",    
        this.$todoAllChk = ".todo-done-all",

        this.$todoData = [];
        this.$todoCompletedData = [];
        this.$todoUnCompletedData = [];
    };

    // 标记
    TodoApp.prototype.markTodo = function(todoId, complete) {
        for(var count=0; count<this.$todoData.length;count++) {
            if(this.$todoData[count].id == todoId) {
                this.$todoData[count].done = complete;
            }
        }
    },

    // 全部标记
    TodoApp.prototype.markTodoAll = function( complete) {
        for(var count=0; count<this.$todoData.length;count++) {
            this.$todoData[count].done = complete;
        }
    },

    // 添加
    TodoApp.prototype.addTodo = function(todoText) {
        this.$todoData.push({'id': this.$todoData.length, 'text': todoText, 'done': false});
        this.generate();
    },

    // 清空
    TodoApp.prototype.clearTodo = function() {
        this.$todoData = [];
        this.generate();
    },

    // 删除
    TodoApp.prototype.deleteTodo = function(todoId) {
        todoUnDeleteDate = [];
        for(var count=0; count<this.$todoData.length;count++) {
            var todoItem = this.$todoData[count];
            if(todoItem.id != todoId) {
                todoUnDeleteDate.push(todoItem);
            }
        }
        this.$todoData = [];
        this.$todoData = [].concat(todoUnDeleteDate);
        this.generate();
    },

    // 批量删除
    TodoApp.prototype.batchDeleteTodo = function() {
        todoUnDeleteDate = [];
        for(var count=0; count<this.$todoData.length;count++) {
            var todoItem = this.$todoData[count];
            if(todoItem.done == false) {
                todoUnDeleteDate.push(todoItem);
            }
        }
        this.$todoData = [];
        this.$todoData = [].concat(todoUnDeleteDate);
        this.generate();
    },

    // 归档
    TodoApp.prototype.archives = function() {
    	this.$todoUnCompletedData = [];
        for(var count=0; count<this.$todoData.length;count++) {
            var todoItem = this.$todoData[count];
            if(todoItem.done == true) {
                this.$doneList.prepend('<li class="list-group-item"><span class="todo-text word-break"> ' + todoItem.text + '</span></li>');
                this.$todoCompletedData.push(todoItem);
            } else {
                this.$todoUnCompletedData.push(todoItem);
            }
        }
        this.$todoData = [];
        this.$todoData = [].concat(this.$todoUnCompletedData);
        this.generate();
    },

    // 刷新 todo
    TodoApp.prototype.generate = function() {
        this.$todoList.html("");
        var doneChkCnt = 0;
        var remaining = 0;
        for(var count=0; count<this.$todoData.length;count++) {
            var todoItem = this.$todoData[count];
            if(todoItem.done == true)
                this.$todoList.prepend('<li class="list-group-item"><label class="cr-styled"><input checked type="checkbox" class="todo-done" id="' + todoItem.id + '"></label><span class="todo-text word-break"><del> ' + todoItem.text + '</del></span><span id="'+ todoItem.id +'" class="todo-delete pull-right" style="display: show;">X</span></li>');
            else {
                remaining = remaining + 1;
                this.$todoList.prepend('<li class="list-group-item"><label class="cr-styled"><input type="checkbox" class="todo-done" id="' + todoItem.id + '"></label><span class="todo-text word-break"> ' + todoItem.text + '</span><span id="'+ todoItem.id +'" class="todo-delete pull-right" style="display: show;">X</span></li>');  
            }
        }
        this.$todoTotal.text(this.$todoData.length);
        this.$todoRemaining.text(remaining);
        this.$doneTotal.text(this.$todoCompletedData.length);
        this.$todoInput.focus().val("");
    },

    TodoApp.prototype.init = function () {
        var $this = this;
        this.generate();

        // 提交
        this.$todoSubBtn.on("click", function() {
            if ($this.$todoInput.val() == "" || typeof($this.$todoInput.val()) == 'undefined' || $this.$todoInput.val() == null) {
                alert("请输入待办事项....");
            } else if($this.$todoInput.val().trim() == ""){
                alert("请输入待办事项....");
            } else {
                $this.addTodo($this.$todoInput.val().trim());
            }
        });

        // 清空
        this.$todoClearBtn.on("click", function(e) {
            e.preventDefault();
            $this.clearTodo();
            return false;
        });

        // 删除
        $(document).on("click", this.$todoDel, function() {
            $this.deleteTodo($(this).attr('id'));
        });

        // 批量删除
        this.$todoDelBtn.on("click", function(e) {
            e.preventDefault();
            $this.batchDeleteTodo();
            return false;
        });

        // 归档
        this.$archiveBtn.on("click", function(e) {
        	e.preventDefault();
            $this.archives();
            return false;
        });

        // 标记
        $(document).on("change", this.$todoDoneChk, function() {
            if(this.checked) 
                $this.markTodo($(this).attr('id'), true);
            else
                $this.markTodo($(this).attr('id'), false);
            $this.generate();
        });

        // 全部标记
        $(document).on("change", this.$todoAllChk, function() {
            if(this.checked) 
                $this.markTodoAll(true);
            else
                $this.markTodoAll(false);
            $this.generate();
        });

        // 编辑
        $(document).on("dblclick", this.$todoText, function() {
            var tmp = $(this);
            var input = $("<input type='text'value='" + tmp.text() + "'/>"); 
            tmp.html(input); 
            //文本框失去焦点后提交内容，重新变为文本 
            input.blur(function() { 
                var text = $(this).val(); 
                tmp.html(text);
            });
        }); 
    },

    $.TodoApp = new TodoApp, $.TodoApp.Constructor = TodoApp
}(window.jQuery),


function($) {
    $.TodoApp.init()
}(window.jQuery);



