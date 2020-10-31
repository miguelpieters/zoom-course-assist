#!/bin/bash
set -e

if [ "$1" == "runserver" ]; then

  if [ "$ENVIRONMENT" == "production" ]; then
    echo "==============================="
    echo "      Copying static files"
    echo "==============================="
    echo "yes" | python manage.py collectstatic --clear
    echo '[*] Done!'
  fi

  # Apply database migrations
  echo "==============================="
  echo "       Running migrations"
  echo "==============================="
  python manage.py makemigrations
  python manage.py migrate

  if [ "$ENVIRONMENT" == "production" ]; then
    echo "==============================="
    echo "  Running in production mode"
    echo "==============================="
    exec /usr/local/bin/uwsgi \
        --module zoom_course_assist.wsgi \
        --master \
        --socket 0.0.0.0:8080 \
        --http 0.0.0.0:8000 \
        --static-map /backend-static=/root/code/static/ \
        --processes=2 \
        --harakiri=20 \
        --max-requests=5000 \
        --enable-threads \
        --vacuum
  else
    echo "==============================="
    echo " Starting in development mode!"
    echo "==============================="
    exec python manage.py "$@"
  fi
fi

if [ "$1" == "nomigrate" ]; then
    exec python manage.py runserver "${@:2}"
fi

if [ "$1" == "migrate" ]; then
    echo "Running migrations"
    # Apply database migrations
    cd backend
    python manage.py "$@"
fi

if [ "$1" == "makemigrations" ]; then
    cd backend
    exec python manage.py "$@"
fi

if [ "$1" == "makeadmin" ]; then
    exec python manage.py shell -c "import os; from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@123-bijles.nl', 'abc123')"
    echo "MAKE ADMIN GREAT AGAIN!"
fi

exec "$@"