# Use the official Python image.
# Use 'python:3.10-slim' for a smaller image or 'python:3.10' for a full image.
FROM python:3.11-slim

# Set the working directory in the container.
WORKDIR /app

# Copy the current directory contents into the container at /app.
COPY . /app

# Install any needed packages specified in requirements.txt.
RUN pip install --no-cache-dir -r requirements.txt

# For migration
#RUN python manage.py migrate

# Expose the port that Django will run on.
EXPOSE 8000

# Run the application.
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]