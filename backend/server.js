const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db/connection");

const app = express();


// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());


// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {
    res.json({
        message: "RoadRescue backend is running"
    });
});


// =========================
// CREATE RESCUE REQUEST
// POST /api/rescue-requests
// =========================

app.post("/api/rescue-requests", (req, res) => {

    const {
        customer_name,
        phone,
        vehicle_type,
        problem,
        location
    } = req.body;

    if (
        !customer_name ||
        !phone ||
        !vehicle_type ||
        !problem ||
        !location
    ) {
        return res.status(400).json({
            message: "Please provide all required fields"
        });
    }

    const sql = `
        INSERT INTO rescue_requests
        (customer_name, phone, vehicle_type, problem, location)
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        customer_name,
        phone,
        vehicle_type,
        problem,
        location
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            console.error("Database error:", err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        res.status(201).json({
            message: "Request created successfully",
            requestId: result.insertId
        });
    });
});


// =========================
// GET ALL RESCUE REQUESTS
// GET /api/rescue-requests
// =========================

app.get("/api/rescue-requests", (req, res) => {

    const sql = `
        SELECT *
        FROM rescue_requests
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.error("GET RESCUE REQUESTS ERROR:", err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json(results);
    });
});

// =========================
// UPDATE REQUEST STATUS
// PUT /api/rescue-requests/:id/status
// =========================

app.put("/api/rescue-requests/:id/status", (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
        "Pending",
        "Accepted",
        "In Progress",
        "Completed"
    ];

    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
            message: "Invalid status"
        });
    }

    const sql = `
        UPDATE rescue_requests
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, id], (err, result) => {

        if (err) {
            console.error("Database error:", err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Rescue request not found"
            });
        }

        res.json({
            message: "Status updated successfully"
        });
    });
});


// =========================
// START SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`RoadRescue server running on port ${PORT}`);
});