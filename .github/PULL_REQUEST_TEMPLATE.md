_🚨 We'll only merge PRs which follow the folowing requirements, but you can open it anytime you want_

_Checkout the [first PR using this guideline](https://github.com/mvcds/hubi/pull/48) for clarrification._

* Have concise title e.g. `Add continous integration`
* Compare from a branch other than your master
* Have the last release as their base
* Use at least one of the labels bellow, ignore this item if source files were not touched
  * [bug](https://github.com/mvcds/hubi/labels/bug) for fixing bugs, errors and miss behaviours
  * [feature request](https://github.com/mvcds/hubi/labels/feature%20request) for issues not marked on the [roadmap](https://github.com/mvcds/hubi/projects/1?card_filter_query=label%3Aavailable+no%3Aassignee)
  * [release](https://github.com/mvcds/hubi/labels/release) for issues related to the "product release"
* Use the label [docs](https://github.com/mvcds/hubi/labels/docs) when PR contains typo-fixings, rephrasings which improve documental understanding and changes on the ubiquitous language

# Proposed changes

_If your only label is "docs", skip this "Proposed changes" all together._

_Brief about your changes. Why is it effective? Which alternatives have you considered?_

## Relates

* Closes [short description](NUMBER) _replace NUMBER by your issue number when appropriate_
*  Relates to [short description](NUMBER) _replace NUMBER by your issue number when appropriate_
*  Implements the idea described on [short description](NUMBER), but using an alternative approach
*  ...

## Checklist

_Put an `x` in the boxes that apply. You can also fill these out after creating the PR. If you're unsure about any of them, don't hesitate to ask. We're here to help! This is simply a reminder of what we are going to look for before merging your code._

_github even allow you to (un)check them on the PR_

- [ ] I have reviewed the most recent version of [CONTRIBUTING](CONTRIBUTING.md) to this repository
- [ ] I have validated that lint and tests pass locally with my changes
- [ ] I have added tests that prove the PR works (if appropriate)
- [ ] I have covered at least 50% of the code
- [ ] I have added necessary documentation (if appropriate)
- [ ] I have merged the last version into my PR (if appropriate)
- [ ] I have reviewed the PR and consider it to be small (to make reviewing it easier)
- Select one from the following about your PR, it...
  - [ ] is a non-breaking change (patch)
  - [ ] adds functionality withouth breaking changes (minor)
  - [ ] cause existing functionalities to not work as expected (major)

