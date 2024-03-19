const inputName = document.querySelector(".form__input-name")
const inputAge = document.querySelector(".form__input-age")
const form = document.querySelector(".form")
const tbody = document.querySelector(".table tbody")

const DATA = [
    {
        id: "id-1",
        name: "Laylo",
        age: 91
    },
    {
        id: "id-2",
        name: "John",
        age: 32
    },
    {
        id: "id-2",
        name: "Mike",
        age: 32
    },
]

class User {
    constructor(name, age) {
        this.id = `id-${new Date().getTime()}`
        this.name = name
        this.age = age
    }
}

form.addEventListener("submit", (event)=>{
    event.preventDefault()
    // class - userni oddiy objectda emas classda yaratgan yaxshi
    let newUser = new User(inputName.value, inputAge.value)
    DATA.push(newUser)
    createTable(DATA)
    inputName.value = ""
    inputAge.value = ""
})

function createTable(data){
    while(tbody.firstChild){
        tbody.firstChild.remove()
    }
    let fragment = document.createDocumentFragment()
    data.forEach((user, index)=>{
        // dynamic holatda element yaratish
        let tr = document.createElement("tr")
        // data-id - dataset yordamida attribute yaratib undan turli maqsadlarda foydalanish mumkin
        tr.innerHTML = `
            <td>${index+1}</td>
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td class="tr" data-id=${user.id}>
                <div>
                    <button name="delete"  class="btn-danger">Delete</button>
                    <button name="edit"  class="btn-success">Edit</button>
                </div>
            </td>
        `
        // fragment - har yangi element yaratilganda HTMLga bitta bitta render qilmasdan fragment yig'adi
        fragment.appendChild(tr)
    })
    // Va loop tugagandan keyin appendChild qiladi yani HTMLga render qiladi
    tbody.appendChild(fragment)

}
createTable(DATA)

// Event delegation - yani parent click bo'lganda childni olib olish mumkin
// shunda har bir childga event qo'shish shart emas 
tbody.addEventListener("click", (e)=>{
    // target.name - parentni aynan "delete" nameli childi bosilgani bilib olinmoqda
    // console.log(e.target.name);
    if(e.target.name === "delete"){
        // closest methodi - eng yaqin selectorni bubbling(yani pastdan yuqoriga) qilib topadi
        // bu yerda data-id dagi id olingan delete qilish uchun
        let id = e.target.closest("[data-id]").dataset.id
        let index = DATA.findIndex(el => el.id === id)
        DATA.splice(index, 1)
        createTable(DATA)       
    }
})





