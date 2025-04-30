import typing

__all__ = ["EmailNormalizer"]


class BaseNormalizer:
    domains: typing.List[str] = []

    @classmethod
    def normalize(cls, local_part: str, domain: str):
        raise NotImplementedError


class GoogleNormalizer(BaseNormalizer):
    domains = ["google.com", "googlemail.com", "gmail.com"]
    normalized_domain = "gmail.com"

    @classmethod
    def normalize(cls, local_part: str, domain: str):
        local_part = local_part.replace(".", "").split("+")[0]
        return f"{local_part}@{cls.normalized_domain}"


class YandexNormalizer(BaseNormalizer):
    domains = [
        "yandex.ru",
        "ya.ru",
        "yandex.com",
        "yandex.by",
        "yandex.kz",
        "yandex.ua",
    ]
    normalized_domain = "yandex.ru"

    @classmethod
    def normalize(cls, local_part: str, domain: str):
        local_part = local_part.replace(".", "-").split("+")[0]
        return f"{local_part}@{cls.normalized_domain}"


class MailRuNormalizer(BaseNormalizer):
    domains = ["mail.ru", "bk.ru", "list.ru", "inbox.ru"]
    normalized_domain = "mail.ru"

    @classmethod
    def normalize(cls, local_part: str, domain: str):
        return f"{local_part}@{cls.normalized_domain}"


class MicrosoftNormalizer(BaseNormalizer):
    domains = ["hotmail.com", "outlook.com", "live.com"]
    normalized_domain = "outlook.com"

    @classmethod
    def normalize(cls, local_part: str, domain: str):
        local_part = local_part.split("+")[0]
        return f"{local_part}@{cls.normalized_domain}"


class YahooNormalizer(BaseNormalizer):
    domains = ["yahoo.com", "ymail.com", "yahoodns.net"]
    normalized_domain = "yahoo.com"

    @classmethod
    def normalize(cls, local_part: str, domain: str):
        local_part = local_part.split("-")[0]
        return f"{local_part}@{cls.normalized_domain}"


class RamblerNormalizer(BaseNormalizer):
    domains = [
        "rambler.ru",
        "lenta.ru",
        "autorambler.ru",
        "myrambler.ru",
        "ro.ru",
    ]
    normalized_domain = "rambler.ru"

    @classmethod
    def normalize(cls, local_part: str, domain: str):
        local_part = local_part.split("+")[0]
        return f"{local_part}@{cls.normalized_domain}"


class DefaultNormalizer(BaseNormalizer):
    @classmethod
    def normalize(cls, local_part: str, domain: str):
        return f"{local_part}@{domain}"


class EmailNormalizer:
    def __init__(self):
        self._domain_normalizers = {}
        self._load_normalizers()

    def _load_normalizers(self):
        normalizers = (
            GoogleNormalizer,
            YandexNormalizer,
            MailRuNormalizer,
            MicrosoftNormalizer,
            YahooNormalizer,
            RamblerNormalizer,
        )

        for normalizer in normalizers:
            for domain in normalizer.domains:
                if domain in self._domain_normalizers:
                    continue

                self._domain_normalizers[domain] = normalizer

    def _get_normalizer(
        self,
        domain: str,
        resolve: bool = False,
    ) -> BaseNormalizer:
        if domain in self._domain_normalizers:
            return self._domain_normalizers[domain]

        return DefaultNormalizer

    def normalize(self, email: str, resolve: bool = False):
        try:
            if not email or "@" not in email:
                return None

            local_part, domain = email.lower().strip().split("@")
            if not local_part or not domain:
                return None

            normalizer = self._get_normalizer(domain, resolve)
            return normalizer.normalize(local_part, domain)
        except Exception:
            return None
