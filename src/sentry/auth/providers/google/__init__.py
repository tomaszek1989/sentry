from __future__ import absolute_import

from django.conf import settings

from sentry import auth, options

from .provider import GoogleOAuth2Provider

auth.register('google', GoogleOAuth2Provider)

options.register(
    'auth-google.client-id',
    default=getattr(settings, 'GOOGLE_CLIENT_ID', None),
    flags=options.FLAG_ALLOW_EMPTY | options.FLAG_PRIORITIZE_DISK,
)
options.register(
    'auth-google.client-secret',
    default=getattr(settings, 'GOOGLE_CLIENT_SECRET', None),
    flags=options.FLAG_ALLOW_EMPTY | options.FLAG_PRIORITIZE_DISK,
)
