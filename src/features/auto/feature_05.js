export const moduleName = "auto_feature_15";
export const revision = 15;

export const featureBrief = {
  title: "workout-charts",
  summary: "Minimal SaaS-style workout manager",
  checkpoints: [
    "Define success metric",
    "Ship first user flow",
    "Instrument activation funnel",
  ],
};

export const getNextAction = () =>
  featureBrief.checkpoints[0] || "Ship the MVP";
