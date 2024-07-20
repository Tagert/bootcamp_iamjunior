/**
 * @swagger
 * /businesses:
 *   get:
 *     summary: Retrieve a list of all businesses
 *     tags: [Business]
 *     responses:
 *       200:
 *         description: A list of businesses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Business'
 */

/**
 * @swagger
 * /businesses/category/{category}:
 *   get:
 *     summary: Retrieve businesses by category
 *     tags: [Business]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Category of the business
 *     responses:
 *       200:
 *         description: A list of businesses in the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Business'
 */

/**
 * @swagger
 * /business/{id}:
 *   get:
 *     summary: Retrieve a single business by ID
 *     tags: [Business]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the business
 *     responses:
 *       200:
 *         description: A single business
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 */

/**
 * @swagger
 * /business:
 *   post:
 *     summary: Create a new business
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - address
 *               - contacts
 *               - images_url
 *               - price
 *               - working_hours
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the business
 *                 example: "John's Coffee Shop"
 *               description:
 *                 type: string
 *                 description: A description of the business
 *                 example: "A cozy place for coffee lovers."
 *               category:
 *                 type: string
 *                 description: The category of the business
 *                 example: "Cafe"
 *               provider:
 *                 type: string
 *                 description: The title of the service provider
 *                 example: "John Doe"
 *               address:
 *                 type: string
 *                 description: The address of the business
 *                 example: "123 Coffee Street, Brewtown"
 *               contacts:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Contact"
 *                 description: List of contact details for the business
 *                 example:
 *                   - contact_person: "Jane Smith"
 *                     phone_number: "+1234567890"
 *                     email: "jane.smith@example.com"
 *               images_url:
 *                 type: string
 *                 description: URL to the business's images
 *                 example: "http://example.com/images/business.jpg"
 *               price:
 *                 type: number
 *                 description: The price or cost associated with the business
 *                 example: 29.99
 *               working_hours:
 *                 $ref: "#/components/schemas/WorkingHoursStructure"
 *                 description: The working hours of the business by day
 *     responses:
 *       201:
 *         description: Business created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /business/{id}:
 *   put:
 *     summary: Update an existing business by ID
 *     tags: [Business]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the business
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Business'
 *     responses:
 *       200:
 *         description: Business updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 */
