import os
from datetime import timedelta

import environ
import sentry_sdk
from pyproject_parser import PyProject
from sentry_sdk.integrations.django import DjangoIntegration

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

pyproject = PyProject.load(filename=BASE_DIR + "/pyproject.toml").to_dict()

env = environ.Env(
    DEBUG=(bool, False),
    LOGGING_DEBUG=(bool, False),
    EMAIL_ENABLE=(bool, True),
    EMAIL_USE_TLS=(bool, True),
    EMAIL_USE_SSL=(bool, False),
)
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

SECRET_KEY = env("SECRET_KEY")

DEBUG = env("DEBUG")

DATA_UPLOAD_MAX_NUMBER_FIELDS = 100000

ONLINECOURSE_CERT = env("ONLINECOURSE_CERT")
ONLINECOURSE_KEY = env("ONLINECOURSE_KEY")

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")

DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.messages",
    "django.contrib.sessions",
    "django.contrib.staticfiles",
]

LOCAL_APPS = [
    "dataprocessing",
    "gia_practice_app",
    "onlinecourse",
    "records",
    "selection_of_keywords_for_rpd",
    "streams_app",
    "workprogramsapp",
]

THIRD_PARTY_APPS = [
    "cachalot",
    "corsheaders",
    "django_filters",
    "django_summernote",
    "django_tables2",
    "djoser",
    "drf_spectacular",
    "drf_spectacular_sidecar",
    "model_clone",
    "rest_framework",
    "rest_framework.authtoken",
    "rest_framework_simplejwt",
    "rest_framework_swagger",
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    # "social_django.middleware.SocialAuthExceptionMiddleware",
    # "django.middleware.common.BrokenLinkEmailsMiddleware",
    # "django.middleware.common.CommonMiddleware",
    # "dataprocessing.CorsMiddleware",
]

SPECTACULAR_SETTINGS = {
    "TITLE": "Analytics Backend API",
    "DESCRIPTION": "API Конструктора ОП",
    "VERSION": str(pyproject["project"]["version"]),
    "SERVE_INCLUDE_SCHEMA": False,
    "SWAGGER_UI_DIST": "SIDECAR",
    "SWAGGER_UI_FAVICON_HREF": "SIDECAR",
    "REDOC_DIST": "SIDECAR",
}

ROOT_URLCONF = "analytics_project.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                # "social_django.context_processors.backends",
                # "social_django.context_processors.login_redirect",
            ],
        },
    },
]

WSGI_APPLICATION = "analytics_project.wsgi.application"

DATABASES = {"default": env.db_url("DATABASE_URL")}

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

DEFAULT_AUTO_FIELD = "django.db.models.AutoField"

LANGUAGE_CODE = "ru-ru"

TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True

STATIC_URL = "/static-backend/"
STATIC_ROOT = os.path.join(BASE_DIR, "static-backend")

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

AUTH_USER_MODEL = "dataprocessing.User"

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAdminUser",
        "rest_framework.permissions.AllowAny",
    ),
    "PAGE_SIZE": 10,
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.BasicAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ),
    "EXCEPTION_HANDLER": "rest_framework_json_api.exceptions.exception_handler",
    "DEFAULT_PAGINATION_CLASS": "rest_framework_json_api.pagination.PageNumberPagination",
    "DEFAULT_PARSER_CLASSES": (
        "rest_framework.parsers.JSONParser",
        # "rest_framework_json_api.parsers.JSONParser",
        "rest_framework.parsers.FormParser",
        "rest_framework.parsers.MultiPartParser",
    ),
    "DEFAULT_RENDERER_CLASSES": (
        "rest_framework.renderers.JSONRenderer",
        # "rest_framework_json_api.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ),
    "DEFAULT_METADATA_CLASS": "rest_framework_json_api.metadata.JSONAPIMetadata",
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
}

SIMPLE_JWT = {
    # "AUTH_HEADER_TYPES": ("JWT",),
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=480),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
}

AUTHENTICATION_BACKENDS = [
    # "social_core.backends.github.GithubOAuth2",
    # "dataprocessing.social_auth_backend.FiwareAuth",
    # "social_core.backends.facebook.FacebookOAuth2",
    # "dataprocessing.itmo_backends.ItmoOAuth2",
    "django.contrib.auth.backends.ModelBackend"
]

# SOCIAL_AUTH_ITMOOAUTH2_KEY = ""
# SOCIAL_AUTH_ITMOOAUTH2_SECRET = ""

# CLIENT = "nexoVnlgoNJnTuZ3CNBcbHgayXmhRjJUYfOb"
# SECRET = "GV4SDAMfv5pgE3jzblcW7HUcND5pywqQL4be"

# SOCIAL_AUTH_AUTH0_DOMAIN = env("SOCIAL_AUTH_AUTH0_DOMAIN")
# SOCIAL_AUTH_AUTH0_KEY = env("SOCIAL_AUTH_AUTH0_KEY")
# SOCIAL_AUTH_AUTH0_SECRET = env("SOCIAL_AUTH_AUTH0_SECRET")

# FIWARE_APP_ID = ""
# FIWARE_API_SECRET = ""
# FIWARE_IDM_ENDPOINT = "https://login.itmo.ru/cas/oauth2.0/authorize"

# FIWARE_IDM_API_VERSION = 2
# FIWARE_KEYSTONE_ENDPOINT = "http://cloud.lab.fiware.org:4731"

# SOCIAL_AUTH_ENABLED_BACKENDS = ("fiware",)
# SOCIAL_AUTH_RAISE_EXCEPTIONS = False

CORS_ORIGIN_ALLOW_ALL = True
# #CORS_ALLOW_CREDENTIALS = True
# SESSION_COOKIE_SAMESITE = False
# CORS_ORIGIN_WHITELIST = [
#     "http://localhost:8080",
# ]
# CORS_ORIGIN_REGEX_WHITELIST = [
#     "http://localhost:8080",
# ]

DJOSER = {
    "PASSWORD_RESET_CONFIRM_URL": "#/password/reset/confirm/{uid}/{token}",
    "USERNAME_RESET_CONFIRM_URL": "#/username/reset/confirm/{uid}/{token}",
    # "ACTIVATION_URL": "#/activate/{uid}/{token}",
    # "SEND_ACTIVATION_EMAIL": True,
    # "SERIALIZERS": {},
    "SET_USERNAME_RETYPE": True,
    "SERIALIZERS": {
        "user": "dataprocessing.serializers.UserBaseSerializer",
        "current_user": "dataprocessing.serializers.UserBaseSerializer",
        # "user_create": "dataprocessing.serializers.UserSerializer",
    },
}

SWAGGER_SETTINGS = {
    "SECURITY_DEFINITIONS": {
        "api_key": {"type": "apiKey", "in": "header", "name": "Authorization"}
    },
    "DEFAULT_AUTO_SCHEMA_CLASS": "analytics_project.yasg_tag_class.CustomAutoSchema",
}

ISU = {
    "ISU_CLIENT_ID": env("ISU_CLIENT_ID"),
    "ISU_CLIENT_SECRET": env("ISU_CLIENT_SECRET"),
    "ISU_REDIRECT_URI": env("ISU_REDIRECT_URI"),
    "ISU_FINISH_URI": env("ISU_FINISH_URI_WITH_PROTOCOL"),
}

BARS = {
    "BARS_LOGIN": env("BARS_LOGIN"),
    "BARS_PASSWORD": env("BARS_PASSWORD"),
    "BARS_URL": env("BARS_URL"),
}

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST_USER = env("EMAIL_HOST_USER")
EMAIL_HOST = env("EMAIL_HOST")
EMAIL_PORT = env("EMAIL_PORT")
EMAIL_USE_TLS = env("EMAIL_USE_TLS")
EMAIL_USE_SSL = env("EMAIL_USE_SSL", default=False)
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")
SERVER_EMAIL = EMAIL_HOST_USER
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

URL_FRONT = env("URL_FRONT")
AP_FILE_ROUTE = env("AP_FILE_ROUTE")
ISU_URL_UPDATERS = env("ISU_URL_UPDATERS")
LAN_TOKEN = env("LAN_TOKEN")

sentry_sdk.init(
    dsn=env("SENTRY_URL"),
    integrations=[
        DjangoIntegration(),
    ],
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production.
    traces_sample_rate=1.0,
    # If you wish to associate users to errors (assuming you are using
    # django.contrib.auth) you may enable sending PII data.
    send_default_pii=True,
)

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.memcached.MemcachedCache",
        "LOCATION": "cache:11211",
    }
}

if DEBUG:

    INSTALLED_APPS.append("debug_toolbar")
    MIDDLEWARE.append("debug_toolbar.middleware.DebugToolbarMiddleware")

    DEBUG_TOOLBAR_PANELS = [
        "debug_toolbar.panels.history.HistoryPanel",
        "debug_toolbar.panels.versions.VersionsPanel",
        "debug_toolbar.panels.timer.TimerPanel",
        "debug_toolbar.panels.settings.SettingsPanel",
        "debug_toolbar.panels.headers.HeadersPanel",
        "debug_toolbar.panels.request.RequestPanel",
        "debug_toolbar.panels.sql.SQLPanel",
        "debug_toolbar.panels.staticfiles.StaticFilesPanel",
        "debug_toolbar.panels.templates.TemplatesPanel",
        "debug_toolbar.panels.cache.CachePanel",
        "debug_toolbar.panels.signals.SignalsPanel",
        "debug_toolbar.panels.redirects.RedirectsPanel",
        "debug_toolbar.panels.profiling.ProfilingPanel",
    ]

    DEBUG_TOOLBAR_CONFIG = {
        "SHOW_TOOLBAR_CALLBACK": lambda request: True,
    }

if env("LOGGING_DEBUG", default=False):
    LOGGING = {
        "version": 1,
        "formatters": {
            "standard": {"format": "%(asctime)s [%(levelname)s]- %(message)s"}
        },
        "handlers": {
            "django_error": {
                "level": "DEBUG",
                "class": "logging.StreamHandler",
                "formatter": "standard",
            },
            "info": {
                "level": "DEBUG",
                "class": "logging.StreamHandler",
                "formatter": "standard",
            },
            "console": {
                "level": "DEBUG",
                "class": "logging.StreamHandler",
                "formatter": "standard",
            },
        },
        "loggers": {
            "info": {
                "handlers": ["info", "console"],
                "level": "DEBUG",
                "propagate": True,
            },
            "django": {
                "handlers": ["console"],
                "level": "INFO",
                "propagate": True,
            },
            "django.request": {
                "handlers": ["django_error", "console"],
                "level": "DEBUG",
                "propagate": True,
            },
            "django.db.backends": {
                "handlers": ["console"],
                "level": "DEBUG",
            },
        },
    }
