// Illustrated stand-ins for enterprise projects that can't show real
// screenshots. Pure CSS/SVG, sized with container query units so they
// scale with the card.

export const InspectionVisual = () => (
  <div className="wv wv-inspect" aria-hidden>
    <div className="wv-tablet">
      <div className="wv-cam">
        <div className="wv-scene">
          <span className="wv-machine wv-machine--a" />
          <span className="wv-machine wv-machine--b" />
          <span className="wv-machine wv-machine--c" />
        </div>
        <div className="wv-box wv-box--1">
          <em>Corrosion · 92%</em>
        </div>
        <div className="wv-box wv-box--2">
          <em>Serial plate · 97%</em>
        </div>
        <div className="wv-scan" />
        <div className="wv-rec">● REC</div>
        <div className="wv-shutter" />
      </div>
      <div className="wv-side">
        <p className="wv-side__title">AI Insights</p>
        {[
          ["Asset condition", 78],
          ["Label extracted", 97],
          ["Damage risk", 42],
          ["Photo quality", 88],
        ].map(([label, v]) => (
          <div key={label} className="wv-row">
            <span>{label}</span>
            <i style={{ ["--v" as string]: `${v}%` }} />
          </div>
        ))}
        <div className="wv-chip">✦ Summary ready</div>
      </div>
    </div>
    <span className="wv-note">Illustrative UI · Under NDA</span>
  </div>
);

export const DashboardVisual = () => (
  <div className="wv wv-dash" aria-hidden>
    <div className="wv-window">
      <div className="wv-sidebar">
        <span className="wv-logo" />
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`wv-nav ${i === 1 ? "is-on" : ""}`} />
        ))}
      </div>
      <div className="wv-main">
        <div className="wv-top">
          <span className="wv-title">Auction Monitor</span>
          <span className="wv-live">● Live</span>
        </div>
        <div className="wv-kpis">
          {["Active lots", "Bids / min", "Sell-through"].map((k, i) => (
            <div key={k} className="wv-kpi">
              <span>{k}</span>
              <b style={{ ["--w" as string]: `${[62, 48, 74][i]}%` }} />
            </div>
          ))}
        </div>
        <div className="wv-chart">
          <div className="wv-bars">
            {[40, 65, 50, 80, 58, 92, 70, 85, 60, 95, 75, 88].map((h, i) => (
              <span key={i} style={{ ["--h" as string]: `${h}%`, animationDelay: `${i * 0.12}s` }} />
            ))}
          </div>
          <svg className="wv-line" viewBox="0 0 300 100" preserveAspectRatio="none">
            <path d="M0,80 C30,70 45,40 75,45 C105,50 120,20 150,28 C180,36 195,12 225,18 C255,24 270,8 300,6" />
          </svg>
        </div>
        <div className="wv-table">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="wv-tr">
              <span />
              <span />
              <span />
              <i className={i % 2 ? "up" : "down"} />
            </div>
          ))}
        </div>
      </div>
    </div>
    <span className="wv-note">Illustrative UI · Under NDA</span>
  </div>
);
