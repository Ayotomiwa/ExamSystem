const searchBtn = document.getElementById("search_btn");
const searchInput = document.getElementById("search_input");
const loadMoreExamBtn = document.getElementById("load-more-btn");
const tableHeaders = document.querySelectorAll('th');
const pageInfo = document.getElementById("page-info");
const table = document.getElementById("table");
const headers = table.querySelectorAll("th");
const tableBody = document.getElementById("content_body");

let totalExams = 0;
let currentPage = 0;
let pageSize = 30;
let isLoadingMore = false;

tableHeaders.forEach(header => {
    console.log(header.dataset.sort)
});

document.addEventListener('DOMContentLoaded', () => {
    getData(currentPage, pageSize);
});

const sortOrders = {};
headers.forEach(header => {
    const button = header.querySelector(".sort-btn");
    const property = button.getAttribute("data-sort");
    button.addEventListener("click", () => {
        // Toggle the sort order between ascending and descending
        let sortOrder = sortOrders[property];
        if (!sortOrder) {
            sortOrder = "ASC";
        } else if (sortOrder === "ASC") {
            sortOrder = "DESC";
        } else if (sortOrder === "DESC") {
            sortOrder = "ASC";
        }
        sortOrders[property] = sortOrder;

        if (searchInput.value === "") {
            getDataBySorting(property, sortOrders[property])
        }
        else {
            const word = searchInput.value;
            getSearchData(word, property, sortOrders[property]);
        }
    });
});

loadMoreExamBtn.addEventListener('click', (event) => {
    event.preventDefault();
    isLoadingMore = true;
    if (pageSize + 30 <= totalExams - 30) {
        pageSize += 30;
        currentPage++;
    }
    else if (pageSize === totalExams) {
        loadMoreExamBtn.disable()
        return;
    }
    else {
        pageSize = totalExams;
    }
    getData(currentPage);
});

searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    isLoadingMore = false;
    const searchTerm = searchInput.value;
    getSearchData(searchTerm);
});

function getSearchData(searchTerm, column = "", sortState = "ASC", pageNumber = 0, pageSize = 30) {
    fetch(`http://localhost:8080/api/exams/search?query=${searchTerm}&sortBy=${column}&sort=${sortState}&page=${pageNumber}&size=${pageSize}`)
        .then(response => response.json())
        .then(data => {
            const content = data.content
            totalExams = data.totalElements;
            populateExamTable(content);
            updatePageInformation();
        })
        .catch(error => console.error(error));
}

function getData(pageNumber, pageSize = 30) {
    fetch(`http://localhost:8080/api/exams?page=${pageNumber}&size=${pageSize}`)
        .then(response => response.json())
        .then(data => {
            totalExams = data.totalElements;
            const content = data.content;
            updatePageInformation();
            populateExamTable(content);
        })
        .catch(error => console.error(error))
        .finally(() => {

        });
}

function getDataBySorting(column, sortState, pageNumber = 0, pageSize = 30) {
    console.log(column + " " + sortState);
    fetch(`http://localhost:8080/api/exams?page=${pageNumber}&sortBy=${column}&sort=${sortState}&size=${pageSize}`)
        .then(response => response.json())
        .then(data => {
            const content = data.content;
            populateExamTable(content, false);
            totalExams = data.totalElements;
            updatePageInformation()
        })
        .catch(error => console.error(error))
        .finally(() => {

        } );
}
function updatePageInformation() {
    pageInfo.textContent = "Showing " + pageSize + " of " + totalExams;
}

function clearTable() {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
}

function showLoading() {
    clearTable();
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = "4";
    cell.textContent = "Loading...";
    row.appendChild(cell);
    tableBody.appendChild(row);
}

function showError() {
    clearTable();
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = "4";
    cell.textContent = "An error occurred while loading the data.";
    row.appendChild(cell);
    tableBody.appendChild(row);
}

function searchExams() {
    currentPage = 0;
    pageSize = 30;
    totalExams = 0;
    const searchTerm = searchInput.value;
    showLoading();
    getSearchData(searchTerm, "", "ASC", currentPage, pageSize);
}

function loadMoreExams() {
    currentPage++;
    isLoadingMore = true;
    showLoading();
    if (searchInput.value === "") {
        getData(currentPage, pageSize);
    } else {
        const word = searchInput.value;
        getSearchData(word, "", "ASC", currentPage, pageSize);
    }
}

function sortExams(event) {
    currentPage = 0;
    pageSize = 30;
    totalExams = 0;
    const column = event.target.getAttribute("data-sort");
    const sortOrder = sortOrders[column] === "ASC" ? "DESC" : "ASC";
    sortOrders[column] = sortOrder;
    showLoading();
    if (searchInput.value === "") {
        getDataBySorting(column, sortOrder, currentPage, pageSize);
    } else {
        const word = searchInput.value;
        getSearchData(word, column, sortOrder, currentPage, pageSize);
    }
}

function populateExamTable(data, clearTable = true) {
    if (clearTable) {
        tableBody.innerHTML = "";
    }

    if (!data || data.length === 0) {
        console.log("No data to display");
        return;
    }

    // Loop through the data and add each row to the table body
    data.forEach((item) => {
        const row = document.createElement("tr");

        row.innerHTML = `
      <td><a href="newlogs.html?examId=${item.examId}&moduleName=${item.course.moduleName}" 
      class="exam-link" data-exam-Id="${item.examId}" data-module-name="${item.course.moduleName}">📁${item.course.moduleCode}</a></td>
      <td>${item.course.moduleName}</td>
      <td>${item.course.moduleLeader}</td>
      <td>${item.day}</td>
    `;

        row.addEventListener("click", (event) => {
            const examLink = event.target.closest(".exam-link");
            if (examLink) {
                const myID = examLink.dataset.examId;
                const name = examLink.dataset.moduleName;
                window.location.href = `newlogs.html?examId=${myID}&moduleName=${name}`;
            }
        });

        tableBody.appendChild(row);
    });
}


