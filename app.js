// Elementleri Seçme

const githubForm = document.getElementById('github-form');
const nameInput = document.getElementById('githubname');
const clearLastUsers = document.getElementById('clear-last-users');
const lastUsers = document.getElementById('last-users');
const github = new Github();
const ui = new UI();

eventListener();

function eventListener() {
    githubForm.addEventListener('submit', getData);
    clearLastUsers.addEventListener('click', clearAllSearch);
    document.addEventListener('DOMContentLoaded', getAllSearch);
}

function getData(e) {

    let username = nameInput.value.trim();

    if (username === "") {
        alert('Lütfen geçerli bir kullanıcı adı giriniz...');
    }

    else {
        github.getGithubData(username)
            .then(response => {
                if (response.user.message === 'Not Found') {
                    // hata
                    ui.showError('Kullanıcı Bulunamadı...');
                }
                else {
                    ui.addSearchToUI(username);
                    Storage.addSearchedUserToStorage(username);
                    ui.showUserInfo(response.user);
                    ui.showRepoInfo(response.repo);
                }
            })
            .catch(err => ui.showError(err));
    }

    ui.clearInput(); // input temizleme

    e.preventDefault();

}

function clearAllSearch() {
    // tüm arananları temizle

    if (confirm('Emin Misiniz?')) {
        // silme işlemleri
        Storage.removeItem(); // storagedan temizleme
        ui.clearAllSeachUI();
    }

}

function getAllSearch() {
    // Arananları Storagedan al UI ekle

    let users = Storage.getSearchedUsersFromStorage();
    let result = "";

    users.forEach(user => {
        // <!-- <li class="list-group-item">asdaskdjkasjkşdjşasjd</li> -->  

        result += `
        
        <li class="list-group-item">${user}</li>
        
        `
    });

    lastUsers.innerHTML = result;

}


