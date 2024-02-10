//seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

//funções

    //recebendo o valor salvo
    const saveTodo = (text) => {
        //criando div
        const todo = document.createElement("div");
        todo.classList.add("todo");

        //criando titulo
        const todoTitle = document.createElement("h3");
        todoTitle.innerText = text;
        todo.appendChild(todoTitle);

        //criando button
        const doneBtn = document.createElement("button");
        doneBtn.classList.add("finish-todo");
        doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
        todo.appendChild(doneBtn);

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-todo");
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
        todo.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("remove-todo");
        deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
        todo.appendChild(deleteBtn);

        //colocando tod na lista geral
        todoList.appendChild(todo);

        //limpar campo e colocar foco
        todoInput.value = "";
        todoInput.focus()
    };

    //alterar a exibição do formulario
const toggleForms = () =>{
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

//função para editar o valor da tarefa
const updateTodo = (text) =>{

    //selecionar todos todo
    const todos = document.querySelectorAll(".todo");

    //percorrer eles e editar
    todos.forEach(todo => {
        let todoTitle = todo.querySelector("h3");

        //comparando se o titulo atual é igual ao salvo na memoria
        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text //alterando texto
        }
    });
}

//eventos

    //enviar formulario sem recarregar pagina
todoForm.addEventListener("submit", (e) =>{

    e.preventDefault()

    //salvar o que o usuario digita como tarefa nova
    const inputValue = todoInput.value

    if(inputValue){
        //salvar valor
        saveTodo(inputValue)
    }
});

    //evento dos botoes da tareda
document.addEventListener("click", (e) =>{

    //pegar o elemento clicado
    const targetEl = e.target;
    //selecionando o elemento div(pai) + próximo
    const parentEl = targetEl.closest("div");
    //pegar titulo do evento
    let todoTitle;

    //checando elemento para saber se ele existe e contem um titulo
    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    //checar se tem determinada classe para saber qual evento fazer
    //marcar como finalizada
    if(targetEl.classList.contains("finish-todo")){
        //adicionando e tirando a classe done em um item para marcar ou desmarcar como concluido
        parentEl.classList.toggle("done");
    };
    //excluir tarefa
    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove();
    };
    //editar elemento
    if(targetEl.classList.contains("edit-todo")){
       //esconder um formulario e mostrar outro
        toggleForms();

        //muda e mapeia o valor do todo
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    };
});

//cancelar edição
cancelEditBtn.addEventListener("click", (e) =>{
    e.preventDefault();

    toggleForms();
})

//editar o formulario
editForm.addEventListener("submit", (e) =>{

    e.preventDefault();

    //pegando valor para poder editar ele na lista
    const editInputValue = editInput.value;

    //se estiver vazio vai cancelar a edição
    if (editInputValue){
        //atualizar
        updateTodo(editInputValue);
    };

    toggleForms();
})