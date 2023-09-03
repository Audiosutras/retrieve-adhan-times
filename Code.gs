class IslamicFinderAPI {
  constructor (latitude, longitude, timezone) {
    this.latitude = latitude || "35.994034"; // Durham, NC
    this.longitude = longitude || "-78.898621"; // Durham, NC
    this.timezone = timezone || "America/New_York";
    this.query = `?timezone=${this.timezone}&latitude=${this.latitude}&longitude=${this.longitude}`;
    this.uri = `https://www.islamicfinder.us/index.php/api`;
  }

  getPrayerTimes() {
    try {
      const url = `${this.uri}/prayer_times`;
      const request = `${url}${this.query}`;
      const response = UrlFetchApp.fetch(request);
      const json = response.getContentText();
      const data = JSON.parse(json);
      return [data.results, null];
    } catch (error) {
      return [null, error];
    }
  }
}
