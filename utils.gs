class Email {

  constructor(subject, data) {
    this._email = Session.getActiveUser().getEmail();
    this.subject = subject;
    this._date = new Date();
    this.data = data;
    this.htmlBodyArray = [];
  }
  get formattedDate() {
    const formattedDate = Utilities.formatDate(this._date, 'America/New_York', 'MMMM dd, yyyy');
    return formattedDate;
  }

  get htmlBody() {
    if (this.htmlBodyArray.length > 0) {
      return this.htmlBodyArray.join(" ");
    } else {
      this.htmlBodyArray = [
        "<p>Message not implemented. Contact admin.</p>"
      ]
    }
  }

  sendEmail() {
    MailApp.sendEmail({
      to: this._email,
      subject: this.subject,
      htmlBody: this.htmlBodyArray.join(" "),
    })
  }
};

class PrayerTimesEmail extends Email {

  prayerTimeReplace(s) {
    return s.replaceAll("%", "");
  }

  formatPrayerTimes() {
    const { Fajr, Duha, Dhuhr, Asr, Maghrib, Isha } = this.data;
    const formatted = `
    <p>${this.formattedDate} Adhan Times</p>
    <ul>
      <li>Fajr: ${this.prayerTimeReplace(Fajr)}</li>
      <li>Sunrise: ${this.prayerTimeReplace(Duha)}</li>
      <li>Dhuhr: ${this.prayerTimeReplace(Dhuhr)}</li>
      <li>Asr: ${this.prayerTimeReplace(Asr)}</li>
      <li>Maghrib: ${this.prayerTimeReplace(Maghrib)}</li>
      <li>Isha: ${this.prayerTimeReplace(Isha)}</li>
    </ul>
    `
    this.htmlBodyArray = [...this.htmlBodyArray, formatted];
  }

  sendEmail() {
    this.formatPrayerTimes();
    super.sendEmail();
  }
}