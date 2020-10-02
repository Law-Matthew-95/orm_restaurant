const db = require('./db')

class Restaurant {
    constructor(data) {
        const restaurant = this
        restaurant.id = data.id
        restaurant.name = data.name
        restaurant.immage = data.image
        restaurant.menus = []

        if(restaurant.id){
            return Promise.resolve(restaurant)
        } else{
            return new Promise((resolve, reject) => {
                db.run('INSERT INTO restaurant(name, image) VALUES(?,?);', [restaurant.name, restaurant.immage], function (err) {
                    // console.log(restaurant)
                    if (err) return reject(err)
                    restaurant.id = this.lastID
                    return resolve(restaurant)
                })
            
            })
        }
    }
    async addMenu(title){
        const menu = await new Menus({title, restaurant_id: this.id})
        this.menu.push(menu)
    }
}
class Menus {
    constructor(data) {
        const menu = this
        menu.id = data.id
        menu.title = data.title
        menu.restaurant_id = data.restaurant_id

        if(menu.id){
            return Promise.resolve(menu)
        } else{
            return new Promise((resolve, reject) => {
                db.run('INSERT INTO menu(title, restaurant_id) VALUES(?,?);', [menu.title, menu.restaurant_id], function (err) {
                    // console.log(menu)
                    if (err) return reject(err)
                    menu.id = this.lastID
                    return resolve(menu)
                })
            
            })
        }
    }
}
class Items {
    constructor(data) {
        const item = this
        item.id = data.id
        item.name = data.name
        item.menu_id = data.menu_id
        item.price = data.price

        if(item.id){
            return Promise.resolve(item)
        } else{
            return new Promise((resolve, reject) => {
                db.run('INSERT INTO item(name, menu_id, price) VALUES(?,?,?);', [item.name, item.menu_id, item.price], function (err) {
                    // console.log(item)
                    if (err) return reject(err)
                    item.id = this.lastID
                    return resolve(item)
                })
            
            })
        }
    }
}

module.exports = {
    Restaurant,
    Items,
    Menus
}