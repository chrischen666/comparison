let data = []
let productsList = document.querySelector(".showList")
//取得資料
function getData() {
    axios.get("https://hexschool.github.io/js-filter-data/data.json")
        .then(res => {
            data = res.data
        })
        .catch(err => {
            console.log(err)
        })
}
getData()
//渲染頁面
function renderData(filter) {
    let str = ""
    filter.forEach(item => {
        str += `<tr><td>${item.作物名稱}</td><td>${item.市場名稱}</td><td>${item.上價}</td><td>${item.中價}</td><td>${item.下價}</td><td>${item.平均價}</td><td>${item.交易量}</td></tr>`
    })
    productsList.innerHTML = str
}

//點擊按鈕
const buttonGroup = document.querySelector(".button-group")
const tabs = document.querySelectorAll(".button-group button")
buttonGroup.addEventListener("click", filterData)
let filter = []
function filterData(e) {
    tabs.forEach(item => {
        item.classList.remove("active")
    })
    if (e.target.nodeName !== "BUTTON") {
        return
    }
    else if (e.target.dataset.type === "N04") {
        e.target.classList.add("active")
        filter = data.filter(item => {
            return item.種類代碼 === "N04"
        })
    }
    else if (e.target.dataset.type === "N05") {
        e.target.classList.add("active")
        filter = data.filter(item => {
            return item.種類代碼 === "N05"
        })
    }
    else if (e.target.dataset.type === "N06") {
        e.target.classList.add("active")
        filter = data.filter(item => {
            return item.種類代碼 === "N06"
        })
    }
    changeSort()
    // renderData(filter)
}

//搜尋資料
const crop = document.querySelector("#crop")
const search = document.querySelector(".search")
search.addEventListener("click", searchData)
function searchData() {
    tabs.forEach(item => {
        item.classList.remove("active")
    })
    if (crop.value.trim() === "") {
        alert("請輸入作物名稱")
        return
    }
    else {
        filter = data.filter(item => {
            return typeof item.作物名稱 === "string" && item.作物名稱.match(crop.value);
        })
        if (filter.length === 0) {
            productsList.innerHTML = '<tr><td colspan="7" class="text-center p-3 ">查詢不到交易資訊QQ</td></tr>'
        }
        else {
            changeSort()
        }
    }
}

//排序資料
let value = "依上價排序"
const select = document.querySelector("#js-select")
select.addEventListener("change", changeSort)
function changeSort(e) {
    if (e) {
        value = e.target.value
    }
    switch (value) {
        case "依上價排序":
            console.log("依上價排序")
            selectChange("上價")
            break;
        case "依中價排序":
            console.log("依中價排序")
            selectChange("中價")
            break;
        case "依下價排序":
            selectChange("下價")
            console.log("依下價排序")
            break;
        case "依平均價排序":
            console.log("依平均價排序")
            selectChange("平均價")
            break;
        case "依交易量排序":
            console.log("依交易量排序")
            selectChange("交易量")
            break;
    }
}
function selectChange(type) {
    filter.sort(
        function (a, b) {
            return a[type] - b[type]
        }
    )
    renderData(filter)
}

//依箭頭去做排序
const sortAdvanced = document.querySelector(".js-sort-advanced")
sortAdvanced.addEventListener("click", sortAdvancedData)
function sortAdvancedData(e) {
    const sortPrice = e.target.dataset.price
    const sortCaret = e.target.dataset.sort
    if (e.target.nodeName !== "I") {
        return
    }
    else {
        if (sortCaret === "up") {
            filter.sort(
                function (a, b) {
                    return b[sortPrice] - a[sortPrice]
                }
            )
        }
        else {
            filter.sort(
                function (a, b) {
                    return a[sortPrice] - b[sortPrice]
                }
            )
        }
        renderData(filter)
    }
}