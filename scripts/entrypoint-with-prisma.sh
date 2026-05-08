#!/bin/sh
set -e

echo "Waiting for database to be ready..."
until pg_isready -h postgres -U postgres; do
  echo "Database is unavailable - sleeping..."
  sleep 2
done

echo "Database is ready!"
sleep 2

echo "Running Prisma db push..."
npx prisma db push --accept-data-loss
PRISMA_RESULT=$?

if [ $PRISMA_RESULT -ne 0 ]; then
  echo "Prisma migration FAILED with exit code $PRISMA_RESULT"
  exit 1
fi

echo "Prisma migration completed successfully!"

if [ -f "prisma/seed.ts" ]; then
  echo "Running Prisma seed..."
  npx prisma db seed || echo "Seed failed or not configured, continuing..."
fi

echo "Database setup complete!"
sleep 1

exec "$@"
