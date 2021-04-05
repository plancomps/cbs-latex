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

    {:.note}
    > Ignore the spurious `ERROR: directory is already being watched!`,
    > or add the option `--no-watch`.

## Browsing

Open a web browser at <http://localhost:4000/cbs-latex/> (the final `/` is required).

Stop the local server with `Control-C` when no longer needed.

## Color schemes

The default color scheme for the web pages is `light`. 
To browse in dark mode, set `color_scheme: dark` in `_config.yml` and restart
`jekyll serve`.
To follow the system/browser preference, set `auto_dark_scheme: dark` instead of `color_scheme: dark`.
The colors used for the `light` and `dark` schemes can be adjusted by editing the SCSS files in `_sass/custom`.

## Editing

Jekyll updates the web pages when you change the Markdown files (it takes a few seconds).

{% include links.md %}
