const db = require('./db')
const {Restaurant, Menus, Items} = require('./models')

describe('Restaurant', () =>{
    beforeAll((done) => {
        db.exec('CREATE TABLE restaurant(id INTEGER PRIMARY KEY, name TEXT, image TEXT);', done)
    })
    test('when a restaurant is created it is added to the database', async () =>{
        const restaurant = await new Restaurant({name: "Betty's tea room", image: "image.url"})
        expect(restaurant.id).toBe(1)
    })
    test('create a restaurant for the data row', async (done) => {
        db.get('SELECT * FROM restaurant WHERE id=1;', async (err, row) =>{
            // console.log(row)
            expect(row.name).toBe("Betty's tea room")
            const restaurant = await new Restaurant(row)
            expect(restaurant.id).toBe(1)
            expect(restaurant.name).toBe("Betty's tea room")
            done()
        })
    })
    test('adding a menu to a restaurant', async () => {
        const restaurant = await new Restaurant({name: "Betty's tea room", image: "image.url"})
        // const menu = await new Menus({title: "Lunch", restaurant_id: 1})
        const menu = new Restaurant.addMenu('Lunch')
        menu.belongsTo(restaurant, {foreignkey: 'restaurant_id' })
    })
})
describe('Menu', () => {
    beforeAll((done) => {
        db.exec('CREATE TABLE menu(id INTEGER PRIMARY KEY, title TEXT, restaurant_id INTEGER);', done)
    })
    test('when a menu is created it is added to the database', async () =>{
        const menu = await new Menus({title: "Lunch", restaurant_id: 1})
        expect(menu.id).toBe(1)
        expect(menu.title).toBe('Lunch')
        // console.log(menu);
    })
    test('create a menu for the data row', async (done) => {
        db.get('SELECT * FROM menu WHERE id=1;', async (err, row) =>{
            // console.log(row)
            expect(row.title).toBe("Lunch")
            const menu = await new Menus(row)
            expect(menu.id).toBe(1)
            expect(menu.title).toBe("Lunch")
            done()
        })
    })
})
describe('Item', () => {
    beforeAll((done) => {
        db.exec('CREATE TABLE item(id INTEGER PRIMARY KEY, name TEXT, menu_id INTEGER, price FLOAT);', done)
    })
    test('when a item is created it is added to the database', async () =>{
        const item = await new Items({name: "Ice-Cream", menu_id: 1, price: 3.00})
        expect(item.id).toBe(1)
        expect(item.name).toBe('Ice-Cream')
        expect(item.menu_id).toBe(1)
        expect(item.price).toBe(3.00)
    })
    test('create a item for the data row', async (done) => {
        db.get('SELECT * FROM item WHERE id=1;', async (err, row) =>{
            // console.log(row)
            expect(row.name).toBe("Ice-Cream")
            const item = await new Items(row)
            expect(item.id).toBe(1)
            expect(item.name).toBe("Ice-Cream")
            done()
        })
    })
})
