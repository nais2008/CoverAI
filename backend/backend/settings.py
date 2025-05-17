import os
import pathlib

from django.utils.translation import gettext_lazy as _
import dotenv

dotenv.load_dotenv()

__all__ = ()


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

DEFAULT_USER_IS_ACTIVE = get_true_or_false_env("DJANGO_DEFAULT_USER_IS_ACTIVE")

MAIL = os.environ.get("DJANGO_MAIL", "your_mail@mail.com")


INSTALLED_APPS = [
    "apps.chat.apps.ChatConfig",
    "apps.feedback.apps.FeedbackConfig",
    "apps.news.apps.NewsConfig",
    "apps.users.apps.UsersConfig",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.postgres",
    "rest_framework",
    "rest_framework.authtoken",
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

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.BasicAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ],
}

if DEBUG:
    INSTALLED_APPS += ["debug_toolbar"]
    MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware"]
    DEFAULT_USER_IS_ACTIVE = True


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
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("POSTGRES_DB", "postgres"),
        "USER": os.environ.get("POSTGRES_USER", default="postgres"),
        "PASSWORD": os.environ.get("POSTGRES_PASSWORD", default=None),
        "HOST": os.environ.get("POSTGRES_HOST", default="postgres"),
        "PORT": os.environ.get(
            "POSTGRES_PORT",
            "5432",
        ),
    },
}

AUTH_USER_MODEL = "users.User"

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": (
            "django.contrib.auth"
            ".password_validation.UserAttributeSimilarityValidator"
        ),
    },
    {
        "NAME": (
            "django.contrib.auth.password_validation.MinimumLengthValidator"
        ),
    },
    {
        "NAME": (
            "django.contrib.auth"
            ".password_validation.CommonPasswordValidator"
        ),
    },
    {
        "NAME": (
            "django.contrib.auth"
            ".password_validation.NumericPasswordValidator"
        ),
    },
]


LOGIN_URL = "/user/login/"

LOGIN_REDIRECT_URL = "/"

LOGOUT_REDIRECT_URL = "/user/login/"

PASSWORD_RESET_REDIRECT_URL = "/user/login/"

PASSWORD_CHANGE_REDIRECT_URL = "/"

AUTHENTICATION_BACKENDS = [
    "apps.users.backends.EmailBackend",
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
EMAIL_HOST_USER = os.environ.get("DJANGO_EMAIL", default="Your email")
EMAIL_HOST_PASSWORD = os.environ.get(
    "DJANGO_EMAIL_PASSWORD",
    "Your app password",
)
EMAIL_USE_SSL = True
EMAIL_USE_TLS = False
DEFAULT_FROM_EMAIL = f"COVERAI <{EMAIL_HOST_USER}>"
