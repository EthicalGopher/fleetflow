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
