/**
 * @swagger
 * /bookings/user/{id}:
 *   get:
 *     summary: Retrieve all bookings for a user by id
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user
 *     responses:
 *       200:
 *         description: A list of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 */

/**
 * @swagger
 * /bookings/business/{id}:
 *   get:
 *     summary: Retrieve all bookings for a business by id
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the business
 *     responses:
 *       200:
 *         description: A list of bookings for the specified business
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       404:
 *         description: No bookings found for the specified business
 *       500:
 *         description: An error occurred during the getting process
 */

/**
 * @swagger
 * /business/{business_id}/booking:
 *   post:
 *     summary: Create a new booking for a business
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: business_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the business
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 */

/**
 * @swagger
 * /business/{id}/bookings/date/{date}:
 *   get:
 *     summary: Retrieve bookings for a business by date
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the business
 *       - in: path
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-07-10"
 *         required: true
 *         description: The date of the bookings
 *     responses:
 *       200:
 *         description: A list of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 */

/**
 * @swagger
 * /booking/{id}:
 *   delete:
 *     summary: Delete a booking by ID
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the booking
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 */
