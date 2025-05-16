# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

- [#177](https://github.com/os2display/display-templates/pull/177)
  - Set options.disableLivePreview for iframe templates

## [2.5.0] - 2025-05-09

- [#175](https://github.com/os2display/display-templates/pull/175)
  - Rebuilt assets.
  - Fixed news feed issues.
- [#174](https://github.com/os2display/display-templates/pull/174)
  - Fixed test issue with calendar dates.
- [#161](https://github.com/os2display/display-templates/pull/161) 
  - Added social news template. 

## [2.4.0] - 2025-03-31

- [#172](https://github.com/os2display/display-templates/pull/172)
  - Added PR github template.
- [#171](https://github.com/os2display/display-templates/pull/171)
  - Remove enableHIM from Travel template
- [#167](https://github.com/os2display/display-templates/pull/167)
  - Fixed issue where instagram template crashes if maxEntries is not a number.
- [#166](https://github.com/os2display/display-templates/pull/166)
  - Css for instagram template in aakb.css theme file

## [2.3.0] - 2025-03-24

- [#169](https://github.com/os2display/display-templates/pull/169)
  - Fixed duration and slide done.
- [#165](https://github.com/os2display/display-templates/pull/165)
  - Fixed transitions for poster.
  - Fixed dates for poster spanning multiple days.

## [2.2.0] - 2025-03-10

- [#160](https://github.com/os2display/display-templates/pull/160)
  - Added option to set image size contain instead of cover.

## [2.1.1] - 2024-11-20

- [#159](https://github.com/os2display/display-templates/pull/159)
  - Fixed issue where slideshow flickered first image before transitioning to next slide.

## [2.1.0] - 2024-10-23

- [#158](https://github.com/os2display/display-templates/pull/158)
  - Expanded documentation for new templates.
- [#157](https://github.com/os2display/display-templates/pull/157)
  - Add Vimeo player template.
- [#156](https://github.com/os2display/display-templates/pull/156)
  - Clarified template creation.
- [#155](https://github.com/os2display/display-templates/pull/155)
  - Added single-booking layout to calendar template.
  - Removed defaultProps.

## [2.0.1] - 2024-08-14

- [#154](https://github.com/os2display/display-templates/pull/154)
  - Fix error in rejseplan, where selecting one station would not show.
- [#153](https://github.com/os2display/display-templates/pull/153)
  - Replace the temporary rejseplans "hack" with an actual solution.

## [2.0.0] - 2024-04-09

- [#151](https://github.com/os2display/display-templates/pull/151)
  - Built slideshow.
- [#150](https://github.com/os2display/display-templates/pull/150)
  - Fixed slideshow fades and timings.
- [#148](https://github.com/os2display/display-templates/pull/148)
  - Changed theme load following API change.
  - Fixed path issue in #141.
- [#146](https://github.com/os2display/display-templates/pull/146)
  - Fixed issue where image-text image cycle is not restarting when only on slide is displayed.
  - Fixed issue with slideshow default duration being 5000 s.
- [#141](https://github.com/os2display/display-templates/pull/141)
  - Improved build for local development

## [1.3.1] - 2023-10-26

- [#145](https://github.com/os2display/display-templates/pull/145)
  - Travel: Added 0 to stations.
  - Travel: Added option to disable icons.
  - Travel: Added option to set monitorLayout to auto or darkmode.
- [#144](https://github.com/os2display/display-templates/pull/144)
  - Fixed poster template issue when no feed is loaded.
- [#142](https://github.com/os2display/display-templates/pull/142)
  - Update poster template to display url domain.

## [1.3.0] - 2023-09-14

- [#140](https://github.com/os2display/display-templates/pull/140)
  Create multiple ids from one id in the travel template
- [#139](https://github.com/os2display/display-templates/pull/139)
  Change aakb.css font source
- [#138](https://github.com/os2display/display-templates/pull/138)
  Fixed issue with poster template ending in blank screen when feed is null.
- [#137](https://github.com/os2display/display-templates/pull/137)
  Add cypress tests.
- [#136](https://github.com/os2display/display-templates/pull/136)
  Add screen template creation, update grid-generator to 1.0.9.
- [#135](https://github.com/os2display/display-templates/pull/135)
  Add new screen template, two boxes, vertical (40%/60%)
- [#134](https://github.com/os2display/display-templates/pull/134)
  Update poster template with trimming of url and default duration.

## [1.2.6] - 2023-06-01

- [#133](https://github.com/os2display/display-templates/pull/133)
  Logo on the right, background color the same as box above.
- [#132](https://github.com/os2display/display-templates/pull/132)
  Dokk1 theme: change separator color
- [#131](https://github.com/os2display/display-templates/pull/131)
  Use color variable for separator in image-text

## [1.2.5] - 2023-03-24

- [#130](https://github.com/os2display/display-templates/pull/130)
  Invert light/dark color for rss template in dokk1 and aakb themes.
- [#129](https://github.com/os2display/display-templates/pull/129)
  Added missing build files for rss template.
- [#128](https://github.com/os2display/display-templates/pull/128)
  Fixed font color in rss template.

## [1.2.4] - 2023-03-24

- [#127](https://github.com/os2display/display-templates/pull/127)
  Fixed filter for calendar single.
- [#126](https://github.com/os2display/display-templates/pull/126)
  Added admin option to change font size for rss template.
- [#125](https://github.com/os2display/display-templates/pull/125)
  Fixed font loading for blixen theme.
- [#124](https://github.com/os2display/display-templates/pull/124)
  Fixed event sorting for calendar (multiple days).
- [#123](https://github.com/os2display/display-templates/pull/123)
  Fix aakb theme poster layout
- [#122](https://github.com/os2display/display-templates/pull/122)
  Changed admin texts.

## [1.2.3] - 2023-03-07

- [#123](https://github.com/os2display/display-templates/pull/123)
  Fix aakb theme poster layout
- [#121](https://github.com/os2display/display-templates/pull/121)
  Fix aakb theme reversed layout
- [#120](https://github.com/os2display/display-templates/pull/120)
  Changed admin forms values from .font-size-l to .font-size-lg.
- [#119](https://github.com/os2display/display-admin-client/pull/119)
  Added license.
- [#118](https://github.com/os2display/display-templates/pull/118)
  Changed when events will disappear from calendar templates.
- [#117](https://github.com/os2display/display-templates/pull/117)
  Changed admin label.
  Changed global styles to include header font-sizes.
- [#116](https://github.com/os2display/display-templates/pull/116)
  Text and image themes Dokk1 and Aakb
- [#115](https://github.com/os2display/display-templates/pull/115)
  Update rss template. Add theme style for Dokk1 and Aakb

## [1.2.2] - 2023-02-08

- [#114](https://github.com/os2display/display-templates/pull/114)
  Make sure empty titles are replaced by default busy text for calendar
- [#113](https://github.com/os2display/display-templates/pull/113)
  When no animation is specified, it will not og into "random"
  Change milliseconds to seconds
- [#111](https://github.com/os2display/display-templates/pull/111)
  Allow for disabling animations for slideshow.
- [#107](https://github.com/os2display/display-templates/pull/107)
  Allow for disabling fades in image-text.
  Disable test github action until it is refactored for react 18.
- [#106](https://github.com/os2display/display-templates/pull/106)
  Added logo to image-text.
- [#105](https://github.com/os2display/display-templates/pull/105)
  Fixed separator default styling.
- [#109](https://github.com/os2display/display-templates/pull/109)
  Make "hideGrid" work on calendar
- [#108](https://github.com/os2display/display-templates/pull/110)
  It slideshow restarts now and calls the done function.
  rename transitions to transition, rename animations to animation.
  Changed "sekunder" to "millisekunder" on a label
- [#112](https://github.com/os2display/display-templates/pull/112)
  Rename titles in screen layout six areas.
- [#103](https://github.com/os2display/display-templates/pull/103)
  Add Bautavej theme

## [1.2.1] - 2023-01-13

- [#102](https://github.com/os2display/display-templates/pull/102)
  Create "four-area" screen template
  Update ids to be english
  Add title to screens previewer
- [#101](https://github.com/os2display/display-templates/pull/101)
  Change css to cssstyles on theme object, update ".any" proptype

## [1.2.0] - 2023-01-05

- [#100](https://github.com/os2display/display-templates/pull/100)
  Added changelog.
  Added github action to enforce that PRs should always include an update of the changelog.
- [#99](https://github.com/os2display/display-templates/pull/99)
  Add book-review styling to aakb theme
- [#98](https://github.com/os2display/display-templates/pull/98)
  Changed spacing around cover in vertical.
  Changed font sizes
  Changed font color
- [#96](https://github.com/os2display/display-templates/pull/96)
  Filters away events not from today in calendarSingle
  Filters away past events from multiple calendars.
- [#97](https://github.com/os2display/display-templates/pull/97)
  Removed settimeout, move initial imagesetup
- [#95](https://github.com/os2display/display-templates/pull/95)
  Fixed spacing around col titles and events.
  Fixed footer position.
  Added gradient to fade out bottom of content.
  Truncated event titles and event resource titles to one line.
  Small adjustments to portrait view, to make it look more as the old templates.
- [#94](https://github.com/os2display/display-templates/pull/94)
  Fixed background position center
- [#93](https://github.com/os2display/display-templates/pull/93)
  Add a base font-family to the theme root.
- [#92](https://github.com/os2display/display-templates/pull/92)
  Make touch and six area layout more fine grained.
- [#91](https://github.com/os2display/display-templates/pull/91)
  Changed npm to yarn.
- [#90](https://github.com/os2display/display-templates/pull/90)
  Updated react from 17 to 18.
  Changed the rendering in index.js.
  Moved some dependencies to dev-dependencies.
- [#89](https://github.com/os2display/display-templates/pull/89)
  Reset slideshow on run.
- [#88](https://github.com/os2display/display-templates/pull/88)
  Removed wrapper in image-text.
- [#87](https://github.com/os2display/display-templates/pull/87)
  Added option to add more than one image to the template.
- [#86](https://github.com/os2display/display-templates/pull/86)
  Adds a timestamp paths in "{template}-config-{env}.json" files to ensure new code is loaded when the template is
  reimported.
- [#83](https://github.com/os2display/display-templates/pull/83)
  Adds media queries to target 4K portrait and landscape, and sets a larger base font-size.
  Changes the way font sizes from admin is handled. Moved to global styles, and defined as classes.
  Fixes to individual templates to adopt base font-size.
- [#85](https://github.com/os2display/display-templates/pull/85)
  Poster dates adjusted.
- [#84](https://github.com/os2display/display-templates/pull/84)
  Addded order in table.
- [#82](https://github.com/os2display/display-templates/pull/82)
  Mute is default, possible to choose that video has sound and then it is not muted.
- [#81](https://github.com/os2display/display-templates/pull/81)
  Fixed poster: make field array, add css.
- [#80](https://github.com/os2display/display-templates/pull/80)
  Update styles for calendar to look more like it did on the old system.
  Update styles for instagram to look more like it did on the old system.
  Update styles for poster to look more like it did on the old system, and add aakb.css theme.
- [#79](https://github.com/os2display/display-templates/pull/79)
  Added logo to poster.

## [1.0.2] - 2022-06-02

- [#78](https://github.com/os2display/display-templates/pull/78)
  Fixed global styles issues.

## [1.0.1] - 2022-06-02

- [#77](https://github.com/os2display/display-templates/pull/77)
  Changed global styles from scss to css.

## [1.0.0] - 2022-06-01

- First release.
