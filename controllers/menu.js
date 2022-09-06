const schemas = require('../models/schemas.js')


module.exports = {
    getIndex: function (req, res) {
        res.render('index', {title: 'Menu Items'})
    },

    editMenu: async(req, res) => {
        let sesh = req.session

        if(!sesh.loggedIn) {
            res.render('index', {title: 'Edit', loggedIn: false, error: 'Invalid Request'})
        } else {
            let id = req.params.id
            let err = ''

            let menu = schemas.menu
            let qry = {_id:id}
            
            let itemsResult = await menu.find(qry)
            .then((itemData) => {
                if (itemData == null) {
                    err = 'Invalid ID'
                }
                res.render('index', {title: 'Edit Menu', loggedIn: sesh.loggedIn, error: err})
            })
        }
    },
    deleteMenu: async (req, res) => {
        let sesh = req.session

        if(!sesh.loggedIn) {
            res.redirect('/login')
        } else {
            let menu = schemas.menu
            let menuID = req.params.id
            let qry = {_id:id}
            let deleteResult = await menu.deleteOne(qry)
            res.redirect('/')
        }
    },
    saveMenu: async (req,res) => {
        if(!sesh.loggedIn) {
            res.redirect('/login')
        } else {
            let menuId = req.body.menuId
            let menuName = req.body.menuName
            let menuIcon = req.body.menuIcon
            let menuUrl = req.body.menuUrl
            let menu = schemas.menu

            let qry = {_id:menuId}

            let saveData = {
                $set: {
                    name: menuName,
                    icon: menuIcon,
                    menuUrl: menuUrl
                }
            }

            let updateResult = await menu.updateOne(qry, saveData)
            res.redirect('/')
        }
    },

    newMenu: async (req, res) => {
        let sesh = res.session

        if(!sesh.loggedIn) {
            res.redirect('/login')
        } else {
            let menuName = req.body.menuName
            let menuIcon = req.body.menuIcon
            let menuUrl = req.body.menuUrl
            let menu = schemas.menu

            let qry = {name:menuName}

            let searchResults = await menu.findOne(qry)
            .then(async (menuData) => {
                if (!menuData) {
                    let newMenu = new schemas.menu({
                        name: menuName,
                        icon: menuIcon,
                        menuUrl: menuUrl
                    })
                    let saveMenu = await newMenu.save()
                }
            })

            res.redirect('/')
        }
    }
}