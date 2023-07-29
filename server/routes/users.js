const router = require('express').Router()
const userController = require('../controller/users')

/**
 * Get user by id or email
 * @method GET
 */
router.get('/:userId', userController.getUserByID)

/**
 * Update user by id or email
 * @method PUT
 */
router.put('/:userId', userController.putUser)

/**
 * Update user by id or email
 * @method PATCH
 */
router.patch('/:userId', userController.patchUser)

/**
 * Delete user by id or email
 * @method DELETE
 */
router.delete('/:userId', userController.deleteUser)

/**
 * Get all users, include
 *  - filter
 *  - pagination
 *  - select properties
 * @route api/users?sort=["by","name"]
 * @method GET
 * @visibility Private
 */
router.get('/', userController.getUsers)

/**
 * create a new user
 */
router.post('/', userController.postUser)

module.exports = router