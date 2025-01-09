#!/bin/sh

# exit if any subcommand returns a non-zero status
set -e

find /app -type f -name "*.js" -o -name "*.html" | xargs sed -i \
	-e "s|NEXT_PUBLIC_SIGN_IN_URL|${NEXT_PUBLIC_SIGN_IN_URL}|g" \
	-e "s|NEXT_PUBLIC_SIGN_UP_URL|${NEXT_PUBLIC_SIGN_UP_URL}|g" \
	-e "s|MAILER_HOST|${MAILER_HOST}|g" \
	-e "s|MAILER_ADDRESS|${MAILER_ADDRESS}|g" \
	-e "s|MAILER_PASSWORD|${MAILER_PASSWORD}|g" \
	-e "s|MAILER_SUBJECT|${MAILER_SUBJECT}|g" \
	-e "s|RECIPIENT_EMAIL_ADDRESS|${RECIPIENT_EMAIL_ADDRESS}|g" \
	-e "s|NEXT_PUBLIC_CMS_PORTAL|${NEXT_PUBLIC_CMS_PORTAL}|g"
exec "$@"
