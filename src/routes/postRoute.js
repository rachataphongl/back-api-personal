const express = require('express');
const upload = require('../middlewares/upload');

const menuController = require('../controllers/menuController');

const router = express.Router();

// router.route('/').post(upload.single('image'), postController.createPost);
router.post('/createmenu', upload.single('image'), menuController.postMenu);
router.get('/getmenu', menuController.getMenu);
router.delete('/deletemenu/:id', menuController.deleteMenu);
router.patch('/editmenu/:id', upload.single('image'), menuController.editMenu);

module.exports = router;
