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
	Role         string         `json:"role"`
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
		role TEXT DEFAULT 'user',
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

	// Ensure 'role' column exists in case the table was created before the role field was added
	alterTableQuery := `
	DO $$ 
	BEGIN 
		IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='role') THEN
			ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user';
		END IF;
	END $$;`

	_, err = DB.Exec(alterTableQuery)
	if err != nil {
		log.Println("Note: Could not ensure 'role' column via ALTER TABLE:", err)
	}

	// Create business tables
	businessTablesQuery := `
	CREATE TABLE IF NOT EXISTS vehicles (
		id TEXT PRIMARY KEY,
		make TEXT NOT NULL,
		model TEXT NOT NULL,
		year INTEGER NOT NULL,
		status TEXT DEFAULT 'Active',
		mileage INTEGER DEFAULT 0,
		fuel_efficiency FLOAT DEFAULT 0,
		revenue FLOAT DEFAULT 0,
		fuel_expense FLOAT DEFAULT 0,
		maint_expense FLOAT DEFAULT 0,
		idle_days INTEGER DEFAULT 0
	);

	CREATE TABLE IF NOT EXISTS maintenance_logs (
		id SERIAL PRIMARY KEY,
		vehicle_id TEXT REFERENCES vehicles(id),
		date DATE NOT NULL,
		type TEXT NOT NULL,
		cost FLOAT DEFAULT 0,
		status TEXT DEFAULT 'Pending'
	);

	CREATE TABLE IF NOT EXISTS shipments (
		id TEXT PRIMARY KEY,
		origin TEXT NOT NULL,
		destination TEXT NOT NULL,
		status TEXT DEFAULT 'Pending',
		eta TEXT,
		driver_id TEXT REFERENCES drivers(id),
		vehicle_id TEXT REFERENCES vehicles(id),
		task_message TEXT
	);

	CREATE TABLE IF NOT EXISTS expenses (
		id TEXT PRIMARY KEY,
		category TEXT NOT NULL,
		amount FLOAT DEFAULT 0,
		date DATE NOT NULL,
		status TEXT DEFAULT 'Pending'
	);

	CREATE TABLE IF NOT EXISTS incidents (
		id TEXT PRIMARY KEY,
		type TEXT NOT NULL,
		location TEXT NOT NULL,
		date DATE NOT NULL,
		status TEXT DEFAULT 'Under Investigation'
	);

	CREATE TABLE IF NOT EXISTS drivers (
		id TEXT PRIMARY KEY,
		name TEXT NOT NULL,
		email TEXT UNIQUE NOT NULL,
		phone TEXT,
		location TEXT,
		status TEXT DEFAULT 'Active',
		rating FLOAT DEFAULT 5.0
	);`

	_, err = DB.Exec(businessTablesQuery)
	if err != nil {
		log.Fatal("Failed to create business tables:", err)
	}

	// Ensure all columns exist in shipments (for existing DBs)
	alterShipmentsQuery := `
	DO $$ 
	BEGIN 
		IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='shipments' AND column_name='driver_id') THEN
			ALTER TABLE shipments ADD COLUMN driver_id TEXT REFERENCES drivers(id);
		END IF;
		IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='shipments' AND column_name='vehicle_id') THEN
			ALTER TABLE shipments ADD COLUMN vehicle_id TEXT REFERENCES vehicles(id);
		END IF;
		IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='shipments' AND column_name='task_message') THEN
			ALTER TABLE shipments ADD COLUMN task_message TEXT;
		END IF;
	END $$;`

	_, err = DB.Exec(alterShipmentsQuery)
	if err != nil {
		log.Println("Note: Could not alter shipments table:", err)
	}

	// Seed Data
	seedDataQuery := `
	INSERT INTO vehicles (id, make, model, year, status, mileage, fuel_efficiency, revenue, fuel_expense, maint_expense, idle_days)
	VALUES 
		('V001', 'Toyota', 'Hilux', 2023, 'Active', 12450, 12.5, 12450, 3200, 850, 0),
		('V002', 'Ford', 'Ranger', 2022, 'Maintenance', 45200, 11.2, 10120, 2900, 1200, 3),
		('V003', 'Isuzu', 'D-Max', 2024, 'Active', 5100, 10.8, 6200, 4100, 1800, 0),
		('V004', 'Tesla', 'Semi', 2024, 'Active', 1200, 25.0, 15000, 500, 200, 0)
	ON CONFLICT (id) DO NOTHING;

	INSERT INTO maintenance_logs (vehicle_id, date, type, cost, status)
	VALUES 
		('V001', '2023-10-15', 'Routine Service', 250, 'Completed'),
		('V002', '2023-11-02', 'Brake Replacement', 450, 'In Progress')
	ON CONFLICT DO NOTHING;

	INSERT INTO shipments (id, origin, destination, status, eta)
	VALUES 
		('S001', 'New York', 'Boston', 'In Transit', '2 hrs'),
		('S002', 'Chicago', 'Detroit', 'Pending', 'N/A')
	ON CONFLICT (id) DO NOTHING;

	INSERT INTO expenses (id, category, amount, date, status)
	VALUES 
		('E001', 'Fuel', 5400, '2023-11-01', 'Approved'),
		('E002', 'Maintenance', 1200, '2023-11-05', 'Pending')
	ON CONFLICT (id) DO NOTHING;

	INSERT INTO incidents (id, type, location, date, status)
	VALUES 
		('I001', 'Accident', 'Hwy 401', '2023-11-02', 'Under Investigation'),
		('I002', 'Speeding Violation', 'City Center', '2023-11-04', 'Resolved')
	ON CONFLICT (id) DO NOTHING;

	INSERT INTO drivers (id, name, email, phone, location, status, rating)
	VALUES 
		('DR-001', 'John Smith', 'john.smith@fleetflow.com', '+1 555 0101', 'New York', 'Active', 4.8),
		('DR-002', 'Sarah Wilson', 'sarah.w@fleetflow.com', '+1 555 0102', 'Chicago', 'Active', 4.9),
		('DR-003', 'Robert Brown', 'robert.b@fleetflow.com', '+1 555 0103', 'Boston', 'On Leave', 4.5)
	ON CONFLICT (id) DO NOTHING;
	`
	_, err = DB.Exec(seedDataQuery)
	if err != nil {
		log.Println("Note: Could not seed data:", err)
	}
}
