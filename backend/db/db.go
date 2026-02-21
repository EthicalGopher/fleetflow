package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var DB *sql.DB

type User struct {
	ID           int            `json:"id"`
	Email        string         `json:"email"`
	PasswordHash sql.NullString `json:"-"`
	FullName     string         `json:"full_name"`
	Avatar       string         `json:"avatar"`
	Provider     string         `json:"provider"`    // e.g., 'email', 'google', 'github'
	ProviderID   sql.NullString `json:"provider_id"` // OAuth subject ID
	CreatedAt    string         `json:"created_at"`
}

func Connect() {
	var err error
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)

	DB, err = sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal("Failed to open database connection:", err)
	}

	if err = DB.Ping(); err != nil {
		log.Fatal("Failed to ping database:", err)
	}

	fmt.Println("Database connection established")

	// Create users table supporting multi-auth
	createTableQuery := `
	CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		email TEXT UNIQUE NOT NULL,
		password_hash TEXT,
		full_name TEXT,
		avatar TEXT,
		provider TEXT DEFAULT 'email',
		provider_id TEXT,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		UNIQUE(provider, provider_id)
	);`

	_, err = DB.Exec(createTableQuery)
	if err != nil {
		log.Fatal("Failed to create users table:", err)
	}
}
