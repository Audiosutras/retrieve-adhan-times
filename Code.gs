function notification() {
  const api = new IslamicFinderAPI();
  const [data, error] = api.getPrayerTimes();
  if (!error) {
    const prayerTimesEmail = new PrayerTimesEmail("Prayer Times", data);
    prayerTimesEmail.sendEmail();
  }
}
