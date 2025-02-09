package config

import (
	"log"
	"os"
	"time"

	"github.com/ilyakaznacheev/cleanenv"
)

// Config структура, обробатывает конфиг
type Config struct {
	Env         string `yaml:"env" env-default:"prod"`
	StoragePath string `yaml:"storage_path" env-required:"true"`
	HTTPServer         `yaml:"http_server"`
}

// HTTPServer структура, обробатывающая настройки сервака из конфига
type HTTPServer struct {
	Adress      string        `yaml:"adress" env-default:"127.0.0.1:0000"`
	TimeOut     time.Duration `yaml:"timeout" env-default:"5s"`
	IdleTimeOut time.Duration `yaml:"idle_timeouts" env-default:"60s"`
}


// MustLoad считывает конфиг и заполняет
func MustLoad() *Config{
	configPath := os.Getenv("GO_CONGIG_PATH")

	if configPath == ""{
		log.Fatal("GO_CONGIG_PATH is not set!")
	}

	if _, err := os.Stat(configPath); os.IsNotExist(err){
		log.Fatalf("config file does not exis : %s", configPath)
	}

	var cfg Config

	if err := cleanenv.ReadConfig(configPath, &cfg); err != nil{
		log.Fatalf("can not read cfg : %s", err)
	}

	return &cfg
}
