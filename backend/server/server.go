package server

import (
	"backend/db"
	"fmt"
	"github.com/gofiber/fiber/v2"
)

func Health(c *fiber.Ctx) error {
	return c.SendStatus(200)
}

// Vehicle Handlers
func GetVehicles(c *fiber.Ctx) error {
	rows, err := db.DB.Query("SELECT id, make, model, year, status, mileage, fuel_efficiency, revenue, fuel_expense, maint_expense, idle_days FROM vehicles")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	defer rows.Close()

	var vehicles []fiber.Map
	for rows.Next() {
		var id, make, model, status string
		var year, mileage, idle_days int
		var fuel_eff, rev, fuel_exp, maint_exp float64
		rows.Scan(&id, &make, &model, &year, &status, &mileage, &fuel_eff, &rev, &fuel_exp, &maint_exp, &idle_days)
		vehicles = append(vehicles, fiber.Map{
			"id":              id,
			"make":            make,
			"model":           model,
			"year":            year,
			"status":          status,
			"mileage":         fmt.Sprintf("%d km", mileage),
			"fuel_efficiency": fuel_eff,
			"revenue":         rev,
			"fuel_expense":    fuel_exp,
			"maint_expense":   maint_exp,
			"idle_days":       idle_days,
		})
	}
	return c.JSON(vehicles)
}

func AddVehicle(c *fiber.Ctx) error {
	type Input struct {
		ID    string `json:"id"`
		Make  string `json:"make"`
		Model string `json:"model"`
		Year  int    `json:"year"`
	}
	var input Input
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	_, err := db.DB.Exec("INSERT INTO vehicles (id, make, model, year) VALUES ($1, $2, $3, $4)",
		input.ID, input.Make, input.Model, input.Year)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(201).JSON(fiber.Map{"message": "Vehicle added"})
}

// Maintenance Handlers
func GetMaintenanceLogs(c *fiber.Ctx) error {
	rows, err := db.DB.Query(`
		SELECT m.id, v.make || ' ' || v.model || ' (' || v.id || ')', m.date, m.type, m.cost, m.status 
		FROM maintenance_logs m 
		JOIN vehicles v ON m.vehicle_id = v.id`)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	defer rows.Close()

	var logs []fiber.Map
	for rows.Next() {
		var id, vehicle, date, mtype, status string
		var cost float64
		rows.Scan(&id, &vehicle, &date, &mtype, &cost, &status)
		logs = append(logs, fiber.Map{
			"id":      id,
			"vehicle": vehicle,
			"date":    date,
			"type":    mtype,
			"cost":    fmt.Sprintf("$%.2f", cost),
			"status":  status,
		})
	}
	return c.JSON(logs)
}

func AddMaintenanceLog(c *fiber.Ctx) error {
	type Input struct {
		VehicleID string  `json:"vehicle_id"`
		Date      string  `json:"date"`
		Type      string  `json:"type"`
		Cost      float64 `json:"cost"`
		Status    string  `json:"status"`
	}
	var input Input
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	_, err := db.DB.Exec("INSERT INTO maintenance_logs (vehicle_id, date, type, cost, status) VALUES ($1, $2, $3, $4, $5)",
		input.VehicleID, input.Date, input.Type, input.Cost, input.Status)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(201).JSON(fiber.Map{"message": "Maintenance log added"})
}

// Shipment Handlers
func GetShipments(c *fiber.Ctx) error {
	rows, err := db.DB.Query("SELECT id, origin, destination, status, eta FROM shipments")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	defer rows.Close()

	var shipments []fiber.Map
	for rows.Next() {
		var id, origin, destination, status, eta string
		rows.Scan(&id, &origin, &destination, &status, &eta)
		shipments = append(shipments, fiber.Map{
			"id":          id,
			"origin":      origin,
			"destination": destination,
			"status":      status,
			"eta":         eta,
		})
	}
	return c.JSON(shipments)
}

// Expense Handlers
func GetExpenses(c *fiber.Ctx) error {
	rows, err := db.DB.Query("SELECT id, category, amount, date, status FROM expenses")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	defer rows.Close()

	var expenses []fiber.Map
	for rows.Next() {
		var id, category, date, status string
		var amount float64
		rows.Scan(&id, &category, &amount, &date, &status)
		expenses = append(expenses, fiber.Map{
			"id":       id,
			"category": category,
			"amount":   fmt.Sprintf("$%.2f", amount),
			"date":     date,
			"status":   status,
		})
	}
	return c.JSON(expenses)
}

// Incident Handlers
func GetIncidents(c *fiber.Ctx) error {
	rows, err := db.DB.Query("SELECT id, type, location, date, status FROM incidents")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	defer rows.Close()

	var incidents []fiber.Map
	for rows.Next() {
		var id, itype, location, date, status string
		rows.Scan(&id, &itype, &location, &date, &status)
		incidents = append(incidents, fiber.Map{
			"id":       id,
			"type":     itype,
			"location": location,
			"date":     date,
			"status":   status,
		})
	}
	return c.JSON(incidents)
}
