class Storage {
    
   static getSearchedUsersFromStorage() {
        // tüm kullanıcıları al

        let users;
        if(localStorage.getItem("search") === null){
               users = []; 
        }
        else{
            users = JSON.parse(localStorage.getItem("search"));
        }
        return users;
    }

    static addSearchedUserToStorage(username){
        // kullanıcı ekle

        let users  = this.getSearchedUsersFromStorage();

        // indexOf

        // dizi içerisinde eklenen username yoksa ekle

        if(users.indexOf(username) === -1){
            users.push(username);
        }
        // güncelleme

        localStorage.setItem("search",JSON.stringify(users));
    }

    static removeItem(){
        // tüm kullanıcıları sil

        localStorage.removeItem("search");

    }
}