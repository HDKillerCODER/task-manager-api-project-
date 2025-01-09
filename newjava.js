import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import sys

# Function to send an email
def send_email(subject, body, recipient="nandeeshwaran.v@fisglobal.com"):
    sender_email = "your_email@example.com"  # Replace with your email
    sender_password = "your_password"       # Replace with your email password

    # Create the email
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = recipient
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))

    try:
        # Connect to the email server and send the email
        with smtplib.SMTP("smtp.gmail.com", 587) as server:  # Replace with your SMTP server
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(message)
        print(f"Email sent successfully to {recipient} with subject: '{subject}'")
    except Exception as e:
        print(f"Failed to send email. Error: {e}")

# Function for 90-day reminder
def ninety_day_reminder():
    subject = "Reminder: 90-Day Password Expiry"
    body = "90-day password expiry approaching for DB User XNGAPP, XNGADM in SIT environment."
    send_email(subject, body)

# Function for 30-day reminder
def thirty_day_reminder():
    subject = "Reminder: 30-Day Password Expiry"
    body = "30-day password expiry approaching for DB User XNGAPP, XNGADM in UAT environment."
    send_email(subject, body)

# Main logic
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script_name.py <reminder_type>")
        print("reminder_type: '90-day' or '30-day'")
        sys.exit(1)

    reminder_type = sys.argv[1]

    if reminder_type == "90-day":
        ninety_day_reminder()
    elif reminder_type == "30-day":
        thirty_day_reminder()
    else:
        print("Invalid argument. Use '90-day' or '30-day'.")
