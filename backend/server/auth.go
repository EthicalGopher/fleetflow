package server

import (
	"backend/db"
	"context"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/api/idtoken"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))
var googleClientID = os.Getenv("GOOGLE_CLIENT_ID")

// Register handles email/password registration
func Register(c *fiber.Ctx) error {
	type RegisterInput struct {
		Email    string `json:"email"`
		Password string `json:"password"`
		FullName string `json:"full_name"`
		Avatar   string `json:"avatar"`
	}

	var input RegisterInput
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Internal server error"})
	}

	_, err = db.DB.Exec("INSERT INTO users (email, password_hash, full_name, avatar, provider) VALUES ($1, $2, $3, $4, $5)",
		input.Email, string(hash), input.FullName, input.Avatar, "email")
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "User already exists"})
	}

	return c.JSON(fiber.Map{"message": "Registration successful"})
}

// Login handles email/password authentication
func Login(c *fiber.Ctx) error {
	type LoginInput struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var input LoginInput
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	var user db.User
	err := db.DB.QueryRow("SELECT id, email, password_hash, full_name, avatar FROM users WHERE email = $1", input.Email).
		Scan(&user.ID, &user.Email, &user.PasswordHash, &user.FullName, &user.Avatar)

	if err != nil || !user.PasswordHash.Valid {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash.String), []byte(input.Password))
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	token, _ := generateJWT(user.ID, user.Email)
	return c.JSON(fiber.Map{"token": token, "user": user})
}

// AuthRequired is the middleware to protect routes
func AuthRequired(c *fiber.Ctx) error {
	tokenString := c.Get("Authorization")
	if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
		tokenString = tokenString[7:]
	} else {
		return c.Status(401).JSON(fiber.Map{"error": "Missing token"})
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	if err != nil || !token.Valid {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid token"})
	}

	claims := token.Claims.(jwt.MapClaims)
	c.Locals("user_id", int(claims["user_id"].(float64)))
	return c.Next()
}

// Me returns current user profile
func Me(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(int)
	var user db.User
	err := db.DB.QueryRow("SELECT id, email, full_name, avatar, provider, provider_id FROM users WHERE id = $1", userID).
		Scan(&user.ID, &user.Email, &user.FullName, &user.Avatar, &user.Provider, &user.ProviderID)

	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "User not found"})
	}

	return c.JSON(user)
}

// GoogleLogin handles Google OAuth ID token verification
func GoogleLogin(c *fiber.Ctx) error {
	type Input struct {
		Token string `json:"token"`
	}

	var input Input
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	// Verify Google ID Token
	payload, err := idtoken.Validate(context.Background(), input.Token, googleClientID)
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid Google token"})
	}

	email := payload.Claims["email"].(string)
	name := payload.Claims["name"].(string)
	avatar := payload.Claims["picture"].(string)
	sub := payload.Subject // Unique Google ID

	var user db.User
	// Upsert user based on Google Subject ID
	err = db.DB.QueryRow(`
		INSERT INTO users (email, full_name, avatar, provider, provider_id)
		VALUES ($1, $2, $3, $4, $5)
		ON CONFLICT (provider, provider_id) DO UPDATE 
		SET full_name = EXCLUDED.full_name, avatar = EXCLUDED.avatar
		RETURNING id, email, full_name, avatar`,
		email, name, avatar, "google", sub).
		Scan(&user.ID, &user.Email, &user.FullName, &user.Avatar)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to handle Google login"})
	}

	token, _ := generateJWT(user.ID, user.Email)
	return c.JSON(fiber.Map{"token": token, "user": user})
}

func generateJWT(userID int, email string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
		"email":   email,
		"exp":     time.Now().Add(time.Hour * 72).Unix(),
	})

	return token.SignedString(jwtSecret)
}
