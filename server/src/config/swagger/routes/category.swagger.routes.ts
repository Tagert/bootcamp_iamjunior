/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - color
 *               - icon_url
 *             properties:
 *               name:
 *                 type: string
 *                 description: Category name
 *                 example: Repair
 *               color:
 *                 type: string
 *                 description: Category color
 *                 example:  red
 *               icon_url:
 *                 type: string
 *                 description: URL to the category icon
 *                 example: https://upload.wikimedia.org/wikipedia/Team_work.jpg/
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */
