package main

import (
	"backend/db"
	"backend/server"
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/joho/godotenv"
)

func init() {
	godotenv.Load()
}
func main() {
	// Initialize Database
	db.Connect()

	app := fiber.New()

	// Middleware
	app.Use(recover.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
	}))
	app.Use(limiter.New(limiter.Config{
		Max:        50,
		Expiration: 30 * time.Second,
	}))

	// Public Routes
	app.Get("/health", server.Health)

	// Auth Routes
	auth := app.Group("/auth")
	auth.Post("/register", server.Register)
	auth.Post("/login", server.Login)
	auth.Post("/google", server.GoogleLogin)

	// Protected Routes
	app.Use(server.AuthRequired)
	app.Get("/me", server.Me)

	// Business Routes
	app.Get("/dashboard/stats", server.GetDashboardStats)
	app.Get("/vehicles", server.GetVehicles)
	app.Post("/vehicles", server.AddVehicle)
	app.Put("/vehicles/:id", server.UpdateVehicle)
	app.Delete("/vehicles/:id", server.DeleteVehicle)
	app.Get("/maintenance", server.GetMaintenanceLogs)
	app.Post("/maintenance", server.AddMaintenanceLog)
	app.Put("/maintenance/:id", server.UpdateMaintenanceLog)
	app.Delete("/maintenance/:id", server.DeleteMaintenanceLog)
	app.Get("/drivers", server.GetDrivers)
	app.Post("/drivers", server.AddDriver)
	app.Put("/drivers/:id", server.UpdateDriver)
	app.Delete("/drivers/:id", server.DeleteDriver)
	app.Get("/shipments", server.GetShipments)
	app.Get("/expenses", server.GetExpenses)
	app.Get("/incidents", server.GetIncidents)

	// 404 Handler
	app.Use(func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"error": "Not Found"})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Println("Server starting on :" + port)
	if err := app.Listen(":" + port); err != nil {
		log.Fatal(err)
	}
}
