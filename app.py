from flask import Flask, render_template, request, redirect, url_for, flash
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
app.secret_key = "change-this-to-any-random-secret-string"

# ==========================================================
# EMAIL CONFIG — apni details yahan bharo
# ==========================================================
EMAIL_ADDRESS = "shivank01@gmail.com"
EMAIL_APP_PASSWORD = "qiqssgiuavqjgbbk"
RECEIVING_EMAIL = "shivank01@gmail.com"


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/skills")
def skills():
    return render_template("skills.html")

@app.route("/experience")
def experience():
    return render_template("experience.html")

@app.route("/projects")
def projects():
    return render_template("projects.html")

@app.route("/education")
def education():
    return render_template("education.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route("/send-message", methods=["POST"])
def send_message():

    name = request.form.get("name")
    email = request.form.get("email")
    subject = request.form.get("subject")
    message = request.form.get("message")

    try:
        msg = MIMEMultipart()
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = RECEIVING_EMAIL
        msg["Subject"] = f"Portfolio Contact: {subject}"

        body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_APP_PASSWORD)
            server.send_message(msg)

        flash("Message sent successfully! I'll get back to you soon.", "success")

    except Exception as e:
        flash("Something went wrong. Please try again later.", "error")
        print("Email error:", e)

    return redirect(url_for("contact"))


if __name__ == "__main__":
    app.run(debug=False)