// Chức năng hiển thị dữ liệu có phân trang
// 1. Lấy dữ liệu trong localStorage theo key là listCatalog
let listCatalog = localStorage.getItem("listCatalog") ? JSON.parse(localStorage.getItem("listCatalog")) : [];
// 2. Các thông số để phân trang
let currentPage = 1;
let recordPerPage = 5;
function renderData(page) {
    // Render dữ liệu lên table và danh sách các trang
    //-Xử lý page
    if (page < 1) {
        page = 1;
    }
    if (page > getTotalPage()) {
        page = getTotalPage();
    }

    //-Render dữ liệu lên table
    let content = document.getElementById("content");
    content.innerHTML = "";
    // i = 10, i <15
    let maxIndex;
    if (page * recordPerPage > listCatalog.length) {
        maxIndex = listCatalog.length;
    } else {
        maxIndex = page * recordPerPage;
    }
    for (let i = (page - 1) * recordPerPage; i < maxIndex; i++) {
        content.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${listCatalog[i].catalogId}</td>
                <td>${listCatalog[i].catalogName}</td>
                <td>${listCatalog[i].status}</td>
                <td>
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
            </tr>
        `
    }
    //-render list page
    let listPage = document.getElementById("listPage");
    listPage.innerHTML = "";
    for (let i = 1; i <= getTotalPage(); i++) {
        listPage.innerHTML += `
            <li><a href="javascript:clickPage('${i}')">${i}</a></li>
        `
    }
    //-Ẩn hiện prev và next
    let prev = document.getElementById("prev");
    let next = document.getElementById("next");
    if (currentPage == 1) {
        prev.style.visibility = "hidden";
    } else {
        prev.style.visibility = "visible";
    }

    if (currentPage == getTotalPage()) {
        next.style.visibility = "hidden";
    } else {
        next.style.visibility = "visible";
    }

}
function getTotalPage() {
    return Math.ceil(listCatalog.length / recordPerPage);
}
function clickPage(page) {
    currentPage = page;
    renderData(page);
}
function prevPage() {
    if (currentPage < 1) {
        currentPage = 1;
    }
    currentPage--;
    renderData(currentPage);
}
function nextPage() {
    if (currentPage > getTotalPage()) {
        currentPage = getTotalPage();
    }
    currentPage++;
    renderData(currentPage);
}
window.onload = renderData(1);

