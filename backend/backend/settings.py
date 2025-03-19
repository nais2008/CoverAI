import os
import pathlib

import dotenv
from django.utils.translation import gettext_lazy as _

dotenv.load_dotenv()


def get_true_or_false_env(par: str) -> bool:
    parametr = os.environ.get(par, "f").lower()
    return parametr in ("true", "1", "yes", "t", "y", "")


BASE_DIR = pathlib.Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "yuor_secret_key")

DEBUG = DEBUG = get_true_or_false_env("DJANGO_DEBUG")

ALLOWED_HOSTS = os.environ.get(
    "DJANGO_ALLOWED_HOSTS",
    "127.0.0.1,localhost",
).split(",")

ALLOW_REVERSE = get_true_or_false_env("DJANGO_ALLOW_REVERSE")

DEFAULT_USER_IS_ACTIVE = get_true_or_false_env("DJANGO_DEFAULT_USER_IS_ACTIVE")

MAIL = os.environ.get("DJANGO_MAIL", "your_mail@mail.com")


INSTALLED_APPS = [
    "apps.feedback.apps.FeedbackConfig",
    "apps.homepage.apps.HomepageConfig",
    "apps.user.apps.UserConfig",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

if DEBUG:
    INSTALLED_APPS += ["debug_toolbar"]
    MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware"]
    DEFAULT_USER_IS_ACTIVE = True

if ALLOW_REVERSE:
    MIDDLEWARE += ["lyceum.middleware.MiddlewareReverseRussianWorlds"]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LOGIN_URL = "/users/login/"

LOGIN_REDIRECT_URL = "/"

LOGOUT_REDIRECT_URL = "/users/login/"

PASSWORD_RESET_REDIRECT_URL = "/users/login/"

PASSWORD_CHANGE_REDIRECT_URL = "/"

AUTHENTICATION_BACKENDS = [
    "users.backends.EmailBackend",
]

LANGUAGE_CODE = "en-us"
LANGUAGES = [
    ("ru", _("Russian")),
    ("en", _("English")),
]
LOCALE_PATHS = [
    BASE_DIR / "locale",
]

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

STATIC_URL = "/static/"
STATICFILES_DIRS = [BASE_DIR / "static_dev"]
STATIC_ROOT = "static"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.yandex.ru"
EMAIL_PORT = 465
EMAIL_HOST_USER = os.environ.get("MEMOTIME_EMAIL", default="Your email")
EMAIL_HOST_PASSWORD = os.environ.get(
    "MEMOTIME_EMAIL_PASSWORD",
    default="Your app password",
)
EMAIL_USE_SSL = True
EMAIL_USE_TLS = False
DEFAULT_FROM_EMAIL = f"MemoTime <{EMAIL_HOST_USER}>"

