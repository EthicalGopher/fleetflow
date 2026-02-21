package server

import (
	"backend/db"
	"fmt"
	"github.com/gofiber/fiber/v2"
)

func Health(c *fiber.Ctx) error {
	return c.SendStatus(200)
}

// Dashboard Handlers
func GetDashboardStats(c *fiber.Ctx) error {
	var totalVehicles, inMaintenance, activeDrivers, safetyAlerts int

	db.DB.QueryRow("SELECT COUNT(*) FROM vehicles").Scan(&totalVehicles)
	db.DB.QueryRow("SELECT COUNT(*) FROM vehicles WHERE status = 'Maintenance'").Scan(&inMaintenance)
	db.DB.QueryRow("SELECT COUNT(*) FROM drivers WHERE status = 'Active'").Scan(&activeDrivers)
	db.DB.QueryRow("SELECT COUNT(*) FROM incidents WHERE status = 'Under Investigation'").Scan(&safetyAlerts)

	// Recent Activity (Latest completed maintenance)
	recentRows, err := db.DB.Query(`
        SELECT v.make || ' ' || v.model || ' (' || v.id || ')', m.type, m.date 
        FROM maintenance_logs m 
        JOIN vehicles v ON m.vehicle_id = v.id 
        WHERE m.status = 'Completed' 
        ORDER BY m.date DESC LIMIT 5`)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	defer recentRows.Close()

	var recent []fiber.Map
	for recentRows.Next() {
		var vehicle, mtype, date string
		recentRows.Scan(&vehicle, &mtype, &date)
		recent = append(recent, fiber.Map{
			"vehicle": vehicle,
			"type":    mtype,
			"date":    date,
		})
	}

	// Upcoming Service (Pending/In Progress maintenance)
	upcomingRows, err := db.DB.Query(`
        SELECT v.make || ' ' || v.model || ' (' || v.id || ')', m.type, m.date 
        FROM maintenance_logs m 
        JOIN vehicles v ON m.vehicle_id = v.id 
        WHERE m.status != 'Completed' 
        ORDER BY m.date ASC LIMIT 5`)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	defer upcomingRows.Close()

	var upcoming []fiber.Map
	for upcomingRows.Next() {
		var vehicle, mtype, date string
		upcomingRows.Scan(&vehicle, &mtype, &date)
		upcoming = append(upcoming, fiber.Map{
			"vehicle": vehicle,
			"type":    mtype,
			"date":    date,
		})
	}

	return c.JSON(fiber.Map{
		"total_vehicles":   totalVehicles,
		"in_maintenance":   inMaintenance,
		"active_drivers":   activeDrivers,
		"safety_alerts":    safetyAlerts,
		"recent_activity":  recent,
		"upcoming_service": upcoming,
	})
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

func UpdateVehicle(c *fiber.Ctx) error {
	id := c.Params("id")
	type Input struct {
		Make   string `json:"make"`
		Model  string `json:"model"`
		Year   int    `json:"year"`
		Status string `json:"status"`
	}
	var input Input
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	_, err := db.DB.Exec("UPDATE vehicles SET make=$1, model=$2, year=$3, status=$4 WHERE id=$5",
		input.Make, input.Model, input.Year, input.Status, id)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"message": "Vehicle updated"})
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

func UpdateMaintenanceLog(c *fiber.Ctx) error {
	id := c.Params("id")
	type Input struct {
		Date   string  `json:"date"`
		Type   string  `json:"type"`
		Cost   float64 `json:"cost"`
		Status string  `json:"status"`
	}
	var input Input
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	_, err := db.DB.Exec("UPDATE maintenance_logs SET date=$1, type=$2, cost=$3, status=$4 WHERE id=$5",
		input.Date, input.Type, input.Cost, input.Status, id)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"message": "Maintenance log updated"})
}

// Driver Handlers
func GetDrivers(c *fiber.Ctx) error {
	rows, err := db.DB.Query("SELECT id, name, email, phone, location, status, rating FROM drivers")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	defer rows.Close()

	var drivers []fiber.Map
	for rows.Next() {
		var id, name, email, phone, location, status string
		var rating float64
		rows.Scan(&id, &name, &email, &phone, &location, &status, &rating)
		drivers = append(drivers, fiber.Map{
			"id":       id,
			"name":     name,
			"email":    email,
			"phone":    phone,
			"location": location,
			"status":   status,
			"rating":   rating,
		})
	}
	return c.JSON(drivers)
}

func AddDriver(c *fiber.Ctx) error {
	type Input struct {
		ID       string  `json:"id"`
		Name     string  `json:"name"`
		Email    string  `json:"email"`
		Phone    string  `json:"phone"`
		Location string  `json:"location"`
		Status   string  `json:"status"`
		Rating   float64 `json:"rating"`
	}
	var input Input
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	_, err := db.DB.Exec("INSERT INTO drivers (id, name, email, phone, location, status, rating) VALUES ($1, $2, $3, $4, $5, $6, $7)",
		input.ID, input.Name, input.Email, input.Phone, input.Location, input.Status, input.Rating)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(201).JSON(fiber.Map{"message": "Driver added"})
}

func UpdateDriver(c *fiber.Ctx) error {
	id := c.Params("id")
	type Input struct {
		Name     string  `json:"name"`
		Email    string  `json:"email"`
		Phone    string  `json:"phone"`
		Location string  `json:"location"`
		Status   string  `json:"status"`
		Rating   float64 `json:"rating"`
	}
	var input Input
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	_, err := db.DB.Exec("UPDATE drivers SET name=$1, email=$2, phone=$3, location=$4, status=$5, rating=$6 WHERE id=$7",
		input.Name, input.Email, input.Phone, input.Location, input.Status, input.Rating, id)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"message": "Driver updated"})
}

func DeleteDriver(c *fiber.Ctx) error {
	id := c.Params("id")
	_, err := db.DB.Exec("DELETE FROM drivers WHERE id=$1", id)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"message": "Driver deleted"})
}

func DeleteVehicle(c *fiber.Ctx) error {
	id := c.Params("id")
	// First delete related maintenance logs
	_, err := db.DB.Exec("DELETE FROM maintenance_logs WHERE vehicle_id=$1", id)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	_, err = db.DB.Exec("DELETE FROM vehicles WHERE id=$1", id)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"message": "Vehicle deleted"})
}

func DeleteMaintenanceLog(c *fiber.Ctx) error {
	id := c.Params("id")
	_, err := db.DB.Exec("DELETE FROM maintenance_logs WHERE id=$1", id)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"message": "Maintenance log deleted"})
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
