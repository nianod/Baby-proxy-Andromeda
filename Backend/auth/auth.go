package auth

import (
	"log" //loggin
	"errros" //Error handli
	"firebase.google.com/go/v4/auth" //Firebase admin auth SDK
	"github.com/google/iudd"	//JWT
	"go.mongodb.org/mongo-driver/mongo"  
	"go.mongodb.org/mongo-driver/bson"   
	"golang.org/x/crypto/bcrypt" //password hashing
	"context" //Request errors and cancellation
)

type User struct{
	ID			string `json:"id"`
	Email		string `json:"email"`
	Password 	string `json:"password"`
}

//provide auth services
type AuthService struct{
	DB		 *mongo.Client |  *mongo.Database | *mongo.collection
	FireAuth *auth.Client
}

func (s *AuthSerAuthService) Login (email, password: string) (string, error) {
	var user User

	if err P := 
} 