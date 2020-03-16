module.exports = {
  plugins: [
    [
      "semantic-release-gitmoji",
      {
        releaseRules: {
          major: ["💥"],
          minor: ["✨", "🏗"],
          patch: ["🐛", "🚑", "🔒", "♻", "💚", "⬆", "⬇", "➕", "➖", "🔧"]
        }
      }
    ],
    [
      "@semantic-release/github",
      {
        assets: [
          {
            path: "./dist/",
            name: "html-antlr4-${nextRelease.version}"
          }
        ]
      }
    ],
    [
      "@semantic-release/npm",
      {
        pkgRoot: "./dist/"
      }
    ],
  ]
};
