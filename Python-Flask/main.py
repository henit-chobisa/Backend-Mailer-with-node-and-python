import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask import Flask, request
app = Flask(__name__)
gmailaddress = ""
gmailpassword = ""
mailServer = smtplib.SMTP('smtp.gmail.com', 587)
mailServer.starttls()
mailServer.login(gmailaddress, gmailpassword)


@app.route('/api/sendMails', methods=['GET', 'POST'])
def hello_world():
    for mail in request.json : 
        msg = MIMEMultipart('alternative')
        msg['Subject'] = "Subject"
        msg['From'] = gmailaddress
        msg['To'] = mail['email']
        html = "Formated HTML PAGE (Not anything like <h1>hello</h1>)"
        part2 = MIMEText(html, 'html')
        msg.attach(part2)
        mailServer.sendmail(gmailaddress, mail['email'], msg.as_string())
        print(f"Mail sent to {mail['email']}")
    return "We are done!"

if __name__ == '__main__':
    app.run(debug=True)
