window.addEventListener("load", function () {
  const now = new Date().getTime();
  const loadingTime = now - performance.timing.navigationStart;
  const transferredBytes = performance
    .getEntries()
    .map((entry) => entry.transferSize || 0) // we omit missing sizes like in paint perf entries
    .reduce((a, b) => a + b, 0);
  /**
   * Calculate digital emissions in g CO2e
   * https://sustainablewebdesign.org/calculating-digital-emissions/
   */
  const transferredGigabytes = transferredBytes / 1000000000;
  const emissions = transferredGigabytes * 0.81 * 442;

  const perfElement = document.getElementById("emissions");
  perfElement.innerText = `Loaded ${(transferredBytes / 1000).toFixed(
    2
  )}kB in ${(loadingTime / 1000).toFixed(2)}s. Emitted ${emissions.toFixed(
    2
  )}g CO2e.`;
});
