---
title: Local browsing
---
# Local browsing

This page explains how to browse and edit the website locally.
In case of difficulties, see more on [Testing your GitHub Pages site locally with Jekyll].

## Requirements

- [Ruby] 2.6.5 or >= 2.7.2
    
- [Jekyll] 3.8.9 or 4.x

## Setting up

1.  Clone or download a zip of the [cbs-latex repository].

2.  Run the following commands in a terminal from the `cbs-latex` directory:
    
    ```bash
    bundle update
    bundle exec jekyll serve --config _config.yml,_config_local.yml
    ```
    
    The default port `4000` can be overridden using `jekyll serve --port ....`.

## Browsing

Open a web browser at <http://localhost:4000/cbs-latex/> (the final `/` is required).

Stop the local server with `Control-C` when no longer needed.

## Color schemes

{:.note}
> When browsing these web pages on GitHub, the color scheme matches the system/browser preference.

To make local browsing independent of the system/browser preference,
replace `auto_dark_scheme: dark` by `color_scheme: light` or `color_scheme: dark` in `_config.yml`
and restart `jekyll serve`.

The colors used for CBS highlighting in the `light` and `dark` schemes can be adjusted by editing the SCSS files in `_sass/custom`.

## Editing

Jekyll updates the web pages when you change the Markdown files (it takes a few seconds).

{% include links.md %}
