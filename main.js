import './styles/style.css'

let todosArr = []
let todos = JSON.parse(localStorage.getItem('to-dos'))
let todoForm = document.getElementById('todo-form')
let inputField = document.getElementById('input-field')
let radioBtns = document.getElementsByClassName('radio-btns')[0]
let mainTaskContainer = document.getElementsByClassName('to-do-container')[0]

//event listeners
radioBtns.addEventListener('click',filterOptions)
todoForm.addEventListener('submit', e => {
  e.preventDefault()

  let todoItem = {
  content: inputField.value,
  isDone: false
  }

  if(!inputField.value){
    alert("Enter a to-do")
    return
  }

  todosArr.push(todoItem)
  localStorage.setItem('to-dos',JSON.stringify(todosArr))

  e.target.reset()

  //render the tasks after successful submission
  RenderList()
 
})

//render the saved to-dos after reloading the page
if(todos.length > 0){
  todosArr = todos
  for(let i = 0; i < todosArr.length; i++){
   RenderList(todosArr[i])
  }
}

//functions
function RenderList () {
  const listContainer = document.getElementsByClassName('to-do-container')[0]
  listContainer.innerHTML = ''

  todosArr.forEach(item => {
    const listItemContainer = document.createElement('div')
    listItemContainer.classList.add('task-container')

    const task = document.createElement('div')

    const doneButton = document.createElement('button')
    doneButton.classList.add('done-btn')
    doneButton.classList.add('fa-solid')
    doneButton.classList.add('fa-check')
  
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete-btn')
  
    task.innerHTML = `<p class="content">${item.content}</p>`
    deleteButton.innerHTML = "X"
    listItemContainer.appendChild(doneButton)
    listItemContainer.appendChild(task)
    
    listItemContainer.appendChild(deleteButton)
    listContainer.appendChild(listItemContainer)

    if(item.isDone){
      listItemContainer.classList.add('done')
    }

    //to toggle the 'done' class and its isDone property value
    doneButton.addEventListener('click', () => {
      item.isDone = !item.isDone
      localStorage.setItem('to-dos',JSON.stringify(todosArr))
      if(item.isDone){
        listItemContainer.classList.add('done')
      }else{
        listItemContainer.classList.remove('done')
      }
    })


    deleteButton.addEventListener('click', event =>{
      let removeBtn = event.target
      let removeTask = removeBtn.parentElement
    
      if(removeBtn.classList[0]==="delete-btn"){
        removeTask.classList.add("delete-transition")
        //remove to local storage by passing the whole object
        removeToLocal(item)
        //remove the item after the transition
        removeTask.addEventListener('transitionend', () => {
            removeTask.remove()
        })
      }
    })
  })
}

//to remove an item from the local storage at a given index using the splice method
function removeToLocal (clicked){

  const indexOfValue = clicked
  todosArr.splice(todosArr.indexOf(indexOfValue),1)
  localStorage.setItem('to-dos',JSON.stringify(todosArr))
}

//filter the tasks  
function filterOptions (event) {
  const childNodes = mainTaskContainer.childNodes

  childNodes.forEach(child => {
    switch(event.target.value){
      case 'all':
        child.style.display = 'flex'
        break;
      case 'completed':
        if(!child.classList.contains('done')){
          child.style.display = 'none'
        }else{
          child.style.display = 'flex'
        }
        break;
      case 'uncompleted':
        if(!child.classList.contains('done')){
          child.style.display = 'flex'
        }else{
          child.style.display = 'none'
        }
        break;
    }
  })
}
