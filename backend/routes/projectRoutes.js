const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');


const { createProject, getProjects, generateInvite, joinProject } = require('../controllers/projectController');


router.get('/', auth, getProjects); 

router.post('/create', auth, createProject);
router.post('/generate-invite/:id', auth, generateInvite);
router.post('/join/:token', auth, joinProject);

module.exports = router;