# Website deployment

`site.yml` builds the current `main` website and deploys it to GitHub Pages.
Site/changelog pushes start it automatically; `workflow_dispatch` on `main`
provides a manual refresh. `SITE_DEPLOY_ENABLED` must be `true`, and the
`github-pages` environment permits only `main`.

`site-release.yml` handles a published application release by dispatching
`site.yml` on `main` with the repository's temporary token. It has only Actions
write permission, never checks out code and never deploys under the release
tag. Its manual trigger exercises the same dispatch step without creating a
release. After publishing, wait for the resulting **Deploy site to GitHub
Pages** run and verify the live download buttons; dispatch `site.yml` manually
only if recovery is needed.

Deployments share the `pages` concurrency group. `queue: max` preserves up to
100 waiting runs, and `cancel-in-progress: false` lets the active run finish.
The checkout explicitly follows current `main`, so an older queued event
cannot deploy an older site revision. No job should cancel another during
normal release/push overlap.

Previously, a push, release publication and manual refresh could start three
runs within seconds. `cancel-in-progress: true` canceled them during whichever
step was active, including `setup-node`; its `punycode` deprecation warning
was incidental. Release-tag runs that survived the cancellation could build
successfully but fail the main-only environment rule. The release dispatcher
and deployment queue address these separate causes without relaxing Pages
protection.

GitHub documents [workflow dispatches with GITHUB_TOKEN](https://docs.github.com/en/actions/how-tos/writing-workflows/choosing-when-your-workflow-runs/triggering-a-workflow#triggering-a-workflow-from-a-workflow),
[concurrency queues](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency),
and [deployment branch restrictions](https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments#deployment-branches-and-tags).
